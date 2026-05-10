import socket

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Socket de tipo TCP/IP
client_socket.connect(('localhost', 12345)) # Conecta al servidor en la dirección y puerto especificados
operation = input("Ingrese la operación (por ejemplo: + 5 3): ") # Solicita al usuario que ingrese la operación
client_socket.send(operation.encode('utf-8')) # Envía la operación al servidor

result = client_socket.recv(1024).decode('utf-8') # Recibe el resultado del servidor
print(f"Resultado: {result}") # Imprime el resultado recibido del servidor
client_socket.close() # Cierra la conexión con el servidor
