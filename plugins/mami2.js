let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')

let handler  = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) return conn.sendFile(m.chat, 'media/botsexy.opus', '', 'xd', m)
	let text = args.join` `
	let  res  =  await  fetch ( global . API ( 'https://api.simsimi.net' ,  '/ v2 /' ,  {  text : encodeURIComponent ( text ) ,  lc : "id"  } ,  '' ) )
  .then(res => res.json())
  .then(batch => {
    conn.updatePresence(m.chat, Presence.composing)
  conn.reply(m.chat, `${batch.success}`, m)
  }) .catch(() => { conn.reply(m.chat, `_¡La función mami está desabilitada!_`, m) })
}
handler.help = ['mami'].map(v => v + ' *texto*')
handler.tags = ['fun']
handler.command = /^(mami)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = false
handler.exp = 750
module.exports = handler