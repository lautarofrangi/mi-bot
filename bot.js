import baileys from '@whiskeysockets/baileys'
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    })

    // 👇 guardar sesión
    sock.ev.on('creds.update', saveCreds)

    // 👇 ACA VA LO QUE ME PREGUNTASTE
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut

            console.log('❌ conexión cerrada, reconectando...', shouldReconnect)
        }

        if (connection === 'open') {
            console.log("✅ Conectado a WhatsApp")

            if (!sock.authState.creds.registered) {
                const numero = "5491135139485" // 👈 TU NUMERO

                const code = await sock.requestPairingCode(numero)
                console.log("🔑 CODIGO:", code)
            }
        }
    })
}

startBot()