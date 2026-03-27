const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")

    const sock = makeWASocket({
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]

        if (!msg.message) return

        const texto = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (texto === "hola") {
            await sock.sendMessage(msg.key.remoteJid, { text: "Hola crack 😎" })
        }
    })
}

startBot()