import * as net from 'net'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Ingrese la operación (por ejemplo: + 5 3): ', (operation) => {
  const client = net.createConnection(
    { host: 'localhost', port: 12345 },
    () => {
      client.write(operation)
    },
  )

  client.on('data', (data) => {
    console.log(`Resultado: ${data.toString('utf-8')}`)
    client.end()
    rl.close()
  })

  client.on('error', (error) => {
    console.error(`Error de conexión: ${error.message}`)
    rl.close()
  })

  client.on('close', () => {
    process.exit(0)
  })
})
