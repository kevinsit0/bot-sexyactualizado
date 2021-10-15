const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, text }) => {
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Etiqueta sticker!'
    let img = await m.quoted.download()
    stiker = await sticker(img, false, packname || global.packname, author || global.author)
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Etiqueta un sticker'
  }
}
handler.help = ['wm *nombre|autor*']
handler.tags = ['sticker']
handler.command = /^wm$/i
module.register = true
module.group = true

module.exports = handler