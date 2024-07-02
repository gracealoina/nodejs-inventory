const m_produk=require('../model/m_produk')
module.exports={
    index:async function(req,res){
        let dataview = {
            req : req,
            konten: 'master-produk/index',
            uri_segment: req.path.split('/'),
            produk: await m_produk.get_semua_produk()
        }
        res.render('template/struktur',dataview)
    },
}