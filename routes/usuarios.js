module.exports = function(app){
    var usuarios = app.controllers.usuarios;
    
    app.get('/usuarios/index', usuarios.index);
    app.get('/usuarios/create', usuarios.create);
    app.post('/usuarios', usuarios.insert);
};