module.exports={
    index: function(req,res){
        let dataview = {
            konten: 'master-produk/index'
        }
        res.render('template/struktur',dataview)
    }
}