module.exports = function(app){
    
    var Usuario = app.models.usuarios;
    
    var UsuariosController = {
        index: function(req,res){
            Usuario.find(function(err, data){
               if(err){console.log('erro'+err)};
               res.render('usuarios/index', {lista: data});
            });
        },
        
        create: function(req,res){
            res.render("usuairos/create");
        },
        insert: function(req, res){
            var model = new Usuario({
                login: req.body.login, senha: req.body.senha
            });
            model.save(function(err){
               if(err){
                   console.log("erro"+err);
               }else{
                   res.redirect('/usuarios');
                   console.log("usarios cadastro com sucesso....");
               }
            });
        }
    }
    return UsuariosController;
};