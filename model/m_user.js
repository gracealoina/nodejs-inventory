const bcrypt    = require('bcryptjs')
const mysql     = require('mysql2')
const db        = require('../config/database').db

module.exports={
    get_semua_user:function()
    {
        let sql = mysql.format(
            `SELECT* FROM user;`
        )

        

        return new Promise ((resolve,reject) =>{
            db.query(sql, function(errorSql, hasil){
                if(errorSql){
                    reject(errorSql)
                }else{
                 resolve(hasil)
                }
            })
        })
    },

    get_satu_user: function(){
        let satu_sql = mysql.format(
            `SELECT* FROM user;`,
            [id_user]
        )
        return new Promise ((resolve,reject) =>{
            db.query(satu_sql, function(errorSql, hasil){
                if(errorSql){
                    reject(errorSql)
                }else{
                 resolve(hasil)
                }
            })
        })
    },
   

    

    tambah: function(req) {
        let data = {
            // nama kolom di sql: req.body.name
            username    : req.body.form_username,
            password    : bcrypt.hashSync( req.body.form_password ),
            nama_lengkap: req.body.nama_lengkap,
        }
        let sql = mysql.format(
            `INSERT INTO user SET ?`,
            [data]
        )

        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },


    hapus: async function(id_user){
    let hasil = await mysql.format(
            `DELETE FROM user WHERE id = ? ;`,
            [id_user]
        )
        return new Promise( (resolve,reject)=>{
            db.query(hasil, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })

    },

    
   


}