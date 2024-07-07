const bcrypt    = require('bcryptjs')
const mysql     = require('mysql2')
const db        = require('../config/database').db


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
        if (req.session.user) {
            res.redirect('/dashboard')
        }else{
            let dataview = {
                req: req
            }
            res.render('auth/form-login', dataview)
        }
        
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

    
    form_logout: function(req, res) {
        if (req.session.user) {
          req.session.destroy();
          res.send('<p>Anda telah logout. Silakan login kembali.</p><a href="/login">Login</a>');
        } else {
          res.redirect('/login'); // Redirect to login if already logged out
        }
      },
     
      cek_logout: function(req,res,next) {
        if (req.session.user) {
            next()
        } else {
            res.redirect(`/logout?msg=Anda telah logout, silakan login ulang!`)
        }
    },
    
    
}