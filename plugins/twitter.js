let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...y el link?'
  global.API('xteam', '/dl/twitter', {
    url: args[0]
  }, 'APIKEY')
  conn.sendFile(m.chat, undefined, '', '', m)
}
handler.help = [].map(v => v + ' *url*')
handler.tags = ['downloader']

handler.command = /^twit$/i
handler.disabled = true
handler.register = true
handler.group = true
handler.limit = true

module.exports = handler
