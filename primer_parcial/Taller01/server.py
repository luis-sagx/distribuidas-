import select
import socket 

MAIN_HOST = 'localhost'
MAIN_PORT = 12345
MULTI_HOST = 'localhost'
MULTI_PORT = 12346

def calculator(op, num1, num2):
    if op == '+':
        return num1 + num2
    elif op == '-':
        return num1 - num2
    elif op == '*':
        return num1 * num2
    elif op == '/':
        if num2 != 0:
            return num1 / num2
        else:
            return "Error: Division by zero"
    else:
        return "Invalid operator"


def process_operation(operation_text):
    parts = operation_text.strip().split()
    if len(parts) != 3:
        return "Error: Invalid input format"

    op, num1_str, num2_str = parts
    try:
        num1 = float(num1_str)
        num2 = float(num2_str)
        return str(calculator(op, num1, num2))
    except ValueError:
        return "Error: Invalid number format"


def process_with_multi_server(operation_text):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as multi_socket:
            multi_socket.connect((MULTI_HOST, MULTI_PORT))
            multi_socket.send(operation_text.encode('utf-8'))
            response = multi_socket.recv(1024).decode('utf-8')
            if response:
                return response
            return "Error: Empty response from multi server"
    except OSError:
        return None
    
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Socket de tipo TCP/IP
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((MAIN_HOST, MAIN_PORT)) # Enlaza el socket a una dirección y puerto
server_socket.listen(10)
server_socket.setblocking(False)
print(f"Servidor principal escuchando en el puerto: {MAIN_PORT}")

offload_next_client = False
client_queue = []
client_addresses = {}

try:
    while True:
        sockets_to_read = [server_socket]
        if client_queue:
            sockets_to_read.append(client_queue[0])

        readable, _, exceptional = select.select(sockets_to_read, [], sockets_to_read, 0.5)

        if server_socket in readable:
            while True:
                try:
                    client_socket, addr = server_socket.accept() # Acepta conexión entrante
                    client_socket.setblocking(False)
                    client_queue.append(client_socket)
                    client_addresses[client_socket] = addr
                    print(f"Conexión aceptada de {addr}")
                except BlockingIOError:
                    break

        if client_queue:
            current_client = client_queue[0]
            if current_client in readable:
                addr = client_addresses.get(current_client, ("desconocido", 0))
                try:
                    data = current_client.recv(1024).decode('utf-8') # Recibe datos del cliente
                except OSError:
                    data = ""

                if data:
                    if offload_next_client:
                        offload_result = process_with_multi_server(data)
                        if offload_result is not None:
                            result = offload_result
                            print(f"Cliente {addr} atendido por server-multi ({MULTI_HOST}:{MULTI_PORT}).")
                        else:
                            result = process_operation(data)
                            print(f"server-multi no disponible; cliente {addr} atendido localmente.")
                        offload_next_client = False
                    else:
                        result = process_operation(data)

                    try:
                        current_client.send(result.encode('utf-8')) # Envía el resultado de vuelta al cliente
                    except OSError:
                        pass
                else:
                    print(f"No se recibieron datos del cliente {addr}.")
                    try:
                        current_client.send("Error: Invalid input format".encode('utf-8'))
                    except OSError:
                        pass

                current_client.close() # Cierra la conexión con el cliente
                client_queue.pop(0)
                client_addresses.pop(current_client, None)

        for sock in exceptional:
            if sock is server_socket:
                continue
            sock.close()
            if sock in client_queue:
                client_queue.remove(sock)
            client_addresses.pop(sock, None)

        if len(client_queue) > 1 and not offload_next_client:
            offload_next_client = True
            print("Carga detectada: el siguiente cliente se delegará al servidor multihilo.")

except KeyboardInterrupt:
    print("Servidor detenido por el usuario.")

finally:
    for sock in client_queue:
        sock.close()
    server_socket.close()