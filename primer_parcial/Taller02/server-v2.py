import socket
import threading

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
    
def client_manager(client_socket, add):
    print("Client connected from {add} en el hilo {threading.current_thread().name}")
    try: 
        data = client_socket.recv(1024).decode('utf-8') # Recibe datos del cliente
        if data:
            parts = data.strip().split()
            if len(parts) == 3:
                op, num1_str, num2_str = parts
                try:
                    num1 = float(num1_str) # Convierte el primer número a float
                    num2 = float(num2_str) # Convierte el segundo número a float
                    result = calculator(op, num1, num2) # Llama a la función calculadora con los datos recibidos
                    client_socket.send(str(result).encode('utf-8')) # Envía el resultado de vuelta al cliente
                except ValueError:
                    client_socket.send("Error: Invalid number format".encode('utf-8')) # Envía un mensaje de error si los números no son válidos
            else: 
                client_socket.send("Error: Invalid input format".encode('utf-8')) # Envía un mensaje de error si el formato es incorrecto
        else:
            print("No se recibieron datos del cliente.")
    except Exception as e:
        print(f"Error receiving data from client {add}: {e}")
    finally:
        client_socket.close() # Cierra la conexión con el cliente
        print(f"Client {add} disconnected from the server.")


server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Socket de tipo TCP/IP
server_socket.bind(("localhost", 12345))
server_socket.listen(5) # Escucha hasta 5 conexiones entrantes
print("Servidor escuchando en el puerto: 12345")

try:
    while True:
        client_socket, addr = server_socket.accept()
        my_thread = threading.Thread(target=client_manager, args=(client_socket, addr))
        my_thread.start()
except KeyboardInterrupt:
    print("Server stopped")
finally: 
    server_socket.close()