const m_kategori=require('../model/m_kategori')
module.exports={
    index:async function(req,res){
        let dataview = {
            req : req,
            konten: 'master-kategori/index',
            uri_segment: req.path.split('/'),
            produk: await m_kategori. get_semua_kategori()
        }
        res.render('template/struktur',dataview)
    },

    form_tambah: async function(req,res) {
        let dataview = {
            konten      : 'master-kategori/form-tambah',
            uri_segment : req.path.split('/'),
            info_error  : null,
            kategori: await m_kategori. get_semua_kategori()
        }
        res.render('template/struktur', dataview)
    },

    proses_simpan: async function(req,res) {
        try {
            let insert      = await m_kategori.tambah(req)
            let isi_notif   = `berhasil menambah kategori baru`
            if (insert.affectedRows > 0) {
                res.redirect(`/master-kategori?note=sukses&pesan=${isi_notif}`)
            }
        } catch (error) {
            let dataview = {
                konten      : 'master-kategori/form-tambah',
                req         : req,
                uri_segment : req.path.split('/'),
                info_error  : error,
            }
            res.render('template/struktur', dataview)
        }
    },
}