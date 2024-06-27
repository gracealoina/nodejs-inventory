const bcrypt    = require('bcryptjs')
const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xdb_belajar_database'
})
db.connect()


let cari_username = function(username) {
    return new Promise((resolve, reject)=>{
        try {
            db.query('SELECT * FROM user WHERE username = ?', [username], (errorSql,hasil)=>{
                if (errorSql) {
                    reject(errorSql)
                } else {
                    let user = hasil[0]
                    resolve(user)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}



module.exports =
{

    form_login: function(req,res) {
        let dataview = {
            req: req
        }
        res.render('auth/form-login', dataview)
    },



    proses_login: async function(req,res) {
        let username = req.body.form_username
        let password = req.body.form_password

        let user = await cari_username(username)
        if (user) {
            let passwordCocok = bcrypt.compareSync(password, user.password)
            if (passwordCocok) {
                req.session.user = user
                return res.redirect('/dashboard')
            } else {
                res.redirect(`/login?msg=password salah!`)
            }
        } else {
            res.redirect(`/login?msg=username tidak terdaftar, silakan hubungi administrator sistem.`)
        }
    },



    cek_login: function(req,res,next) {
        if (req.session.user) {
            next()
        } else {
            res.redirect(`/login?msg=sesi anda sudah habis, silakan login ulang!`)
        }
    },



}