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

    form_tambah: async function(req,res) {
        let dataview = {
            konten      : 'master-produk/form-tambah',
            uri_segment : req.path.split('/'),
            info_error  : null,
            kategori: await m_produk.get_semua_kategori()
        }
        res.render('template/struktur', dataview)
    },

    proses_simpan: async function(req,res) {
        try {
            let insert      = await m_produk.tambah(req)
            let isi_notif   = `berhasil menambah produk baru`
            if (insert.affectedRows > 0) {
                res.redirect(`/master-produk?note=sukses&pesan=${isi_notif}`)
            }
        } catch (error) {
            let dataview = {
                konten      : 'master-produk/form-tambah',
                req         : req,
                uri_segment : req.path.split('/'),
                info_error  : error,
            }
            res.render('template/struktur', dataview)
        }
    },

}
