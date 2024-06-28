const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xdb_belajar_database'
})
db.connect()

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
}