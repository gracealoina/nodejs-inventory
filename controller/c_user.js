module.exports={
    index: function(req,res){
        let dataview = {
            konten: 'user-management/index'
        }
        res.render('template/struktur',dataview)
    }
}