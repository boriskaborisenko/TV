
const requestify = require('requestify')
const execSh = require("exec-sh")
const vlc = '/Applications/VLC.app/Contents/MacOS/VLC'


const appRouter = (app, next) => {
    app.get('/ch/:id/token/:token', (req,res)=>{
        execSh(['kill -9 $(pgrep VLC)', "echo VLC STARTED >&2"], true)
        const ch = req.params.id
        const token = req.params.token
        requestify.get('http://android.bilink.tv/server/url.php?number=' + ch, {
                cookies: {
                    'rd_login': '0367442',
                    'rd_pass': '31031989',
                    'PHPSESSID': token
                }
            })
            .then((response) => {
                const url = response.body.split("'")[1]
                console.log(url)
                //--fullscreen
                execSh([vlc + ' ' + url + ' ', "echo VLC STARTED >&2"], true)
                res.json({
                    answer: 'answer',
                    url: url
                })
            })
    })

    app.get('/quit',(req,res)=>{
       execSh(['kill -9 $(pgrep VLC)', "echo VLC STARTED >&2"], true)
       res.json({
           answer: 'answer',
           //url: url
       })
    })
}





module.exports = appRouter;

