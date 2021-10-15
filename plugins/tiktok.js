let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...dondé está el link?'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  if (res.status !== 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
  let url = json.server_1 || json.info[0].videoUrl || ''
  if (!url) throw 'No se pudo recuperar la URL de descarga.'
  let txt = json.info[0].text
  for (let hashtag of json.info[0].hashtags) txt = txt.replace(hashtag, '*$&*')
  await conn.sendFile(m.chat, url, 'tiktok.mp4', `
▶ ${json.info[0].playCount} Vistas
❤ ${json.info[0].diggCount} Likes
🔁 ${json.info[0].shareCount} Enviados
💬 ${json.info[0].commentCount} Comentarios
🎵 ${json.info[0].musicMeta.musicName} by ${json.info[0].musicMeta.musicAuthor}
- *By:* ${json.info[0].authorMeta.nickName} (${json.info[0].authorMeta.name})
- *Desc:*
${txt}
  `.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(dl)?)$/i
handler.register = true
handler.group = true
handler.limit = true

module.exports = handler
