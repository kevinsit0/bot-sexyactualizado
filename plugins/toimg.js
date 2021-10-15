const { spawn } = require('child_process')
const util = require('util')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn }) => {
  let RendyGanteng = conn
  await RendyGanteng.fakeReply(m.chat, '*ESPERA⌛*', '0@s.whatsapp.net', '✨𝐛𝐨𝐭-𝒔𝒆𝒙𝒚✨')
  if (!m.quoted) return conn.reply(m.chat, 'Etiqueta un stiker!', m)
  let q = { message: { [m.quoted.mtype]: m.quoted }}
  if (/sticker/.test(m.quoted.mtype)) {
    let sticker = await conn.downloadM(q)
    if (!sticker) throw sticker
    let bufs = []
    let im = spawn('magick', ['convert', 'webp:-', 'png:-'])
    im.on('error', e => conn.reply(m.chat, util.format(e), m))
    im.stdout.on('data', chunk => bufs.push(chunk))
    im.stdin.write(sticker)
    im.stdin.end()
    im.on('exit', () => {
      conn.sendMessage(m.chat, Buffer.concat(bufs), MessageType.image, {
        quoted: m
      })
    })
  }
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = /^toimg$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

