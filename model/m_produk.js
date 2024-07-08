
const mysql     = require('mysql2')
const db        = require('../config/database').db
const moment    = require('moment')
moment.locale('id')


module.exports={
    get_semua_produk:function()
    {
        let sql = mysql.format(
            `SELECT* FROM master_produk;`
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

    get_semua_kategori: function() {
        let sql = mysql.format(
            `SELECT * FROM master_kategori;`
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

    get_satu_produk: function(id){ //ditangkap idnya masuk ke function
        let sql = mysql.format(
            'SELECT k.* FROM `master_produk` AS k WHERE k.id=?;',
            [id]
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



    tambah: function(req) {
        let data = {
            // nama kolom di sql: req.body.name
            kode        : req.body.form_kode,
            nama        : req.body.form_nama,
            deskripsi   : req.body.form_deskripsi,
            id_kategori : req.body.form_kategori,
            dibuat_oleh : req. session.user.id,
            dibuat_kapan: moment().format('YYYY-MM-DD HH:mm:ss')

        }
        let sql = mysql.format(
            `INSERT INTO master_produk SET ?`,
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
    }
    
}