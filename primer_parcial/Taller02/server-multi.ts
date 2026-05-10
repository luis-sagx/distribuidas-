import * as net from 'node:net'
import { Worker } from 'node:worker_threads'

const MULTI_HOST = 'localhost'
const MULTI_PORT = 12346

function runCalculatorInWorker(operation: string): Promise<string> {
  const workerCode = `
    const { parentPort, workerData } = require('node:worker_threads');

    function calculator(op, num1, num2) {
      if (op === '+') return num1 + num2;
      if (op === '-') return num1 - num2;
      if (op === '*') return num1 * num2;
      if (op === '/') {
        if (num2 !== 0) return num1 / num2;
        return 'Error: Division by zero';
      }
      return 'Invalid operator';
    }

    const parts = String(workerData).trim().split(/\\s+/);

    if (parts.length !== 3) {
      parentPort.postMessage('Error: Invalid input format');
    } else {
      const [op, num1Str, num2Str] = parts;
      const num1 = Number(num1Str);
      const num2 = Number(num2Str);

      if (Number.isNaN(num1) || Number.isNaN(num2)) {
        parentPort.postMessage('Error: Invalid number format');
      } else {
        parentPort.postMessage(String(calculator(op, num1, num2)));
      }
    }
  `

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerCode, {
      eval: true,
      workerData: operation,
    })

    worker.once('message', (message) => resolve(String(message)))
    worker.once('error', (error) => reject(error))
    worker.once('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

const server = net.createServer((socket) => {
  let handled = false
  const clientAddress = `${socket.remoteAddress ?? 'unknown'}:${socket.remotePort ?? 'unknown'}`
  console.log(`[MULTI] Conexión aceptada de ${clientAddress}`)

  socket.on('data', async (chunk) => {
    if (handled) {
      return
    }
    handled = true

    const operation = chunk.toString('utf-8').trim()
    console.log(
      `[MULTI] Operación recibida de ${clientAddress}: ${operation || '<vacía>'}`,
    )

    if (!operation) {
      socket.write('Error: Invalid input format')
      socket.end()
      return
    }

    try {
      const result = await runCalculatorInWorker(operation)
      console.log(`[MULTI] Resultado para ${clientAddress}: ${result}`)
      socket.write(result)
      socket.end()
    } catch (error) {
      console.error(
        `[MULTI] Error procesando ${clientAddress}: ${(error as Error).message}`,
      )
      socket.write(`Error interno: ${(error as Error).message}`)
      socket.end()
    }
  })

  socket.on('error', () => {
    console.error(`[MULTI] Error de socket con ${clientAddress}`)
    socket.destroy()
  })

  socket.on('close', () => {
    console.log(`[MULTI] Conexión cerrada con ${clientAddress}`)
  })
})

server.listen(MULTI_PORT, MULTI_HOST, () => {
  console.log(`Servidor multihilo escuchando en ${MULTI_HOST}:${MULTI_PORT}`)
})
