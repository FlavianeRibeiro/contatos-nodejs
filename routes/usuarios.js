module.exports = function(app){
    var usuarios = app.controllers.usuarios;
    
    app.get('/usuarios', usuarios.index);
    app.get('/usuarios/create', usuarios.create);
    app.get('/usuarios/create', usuarios.insert);
    app.get('/usuarios/editar/:id', usuarios.update);
};