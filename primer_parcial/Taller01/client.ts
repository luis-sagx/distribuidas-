import * as net from 'node:net'
import * as readline from 'node:readline'

const client = net.createConnection({ host: 'localhost', port: 12345 }, () => {
  console.log('Conectado al servidor')
})

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

readlineInterface.question(
  'Ingrese la operación (por ejemplo: + 5 3): ',
  (operation) => {
    client.write(operation)
  },
)

client.on('data', (data) => {
  console.log(`Resultado: ${data.toString('utf-8')}`)
  client.end()
  readlineInterface.close()
})

client.on('error', (error) => {
  console.error(`Error de conexión: ${error.message}`)
  readlineInterface.close()
})

client.on('close', () => {
  process.exit(0)
})
