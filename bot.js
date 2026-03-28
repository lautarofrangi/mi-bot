import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    // 👇 ACA GENERAMOS EL CODIGO AUTOMATICO
    if (!sock.authState.creds.registered) {
        const numero = "5491135139485" // 👈 TU NUMERO REAL

        const code = await sock.requestPairingCode(numero)
        console.log("🔑 CODIGO:", code)
    }
}

startBot()