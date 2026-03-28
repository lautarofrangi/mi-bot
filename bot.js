import baileys from '@whiskeysockets/baileys'
const { default: makeWASocket, useMultiFileAuthState } = baileys

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update

        if (connection === 'open') {
            console.log("✅ Conectado a WhatsApp")

            if (!sock.authState.creds.registered) {
                const numero = "5491135139485" // 👈 TU NUMERO REAL

                const code = await sock.requestPairingCode(numero)
                console.log("🔑 CODIGO:", code)
            }
        }
    })
}

startBot()