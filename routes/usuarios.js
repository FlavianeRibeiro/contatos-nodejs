module.exports = function(app){
    var usuarios = app.controllers.usuarios;
    
    app.get('/usuarios', usuarios.index);
    app.get('/usuarios/create', usuarios.create);
    app.post('/usuarios/create', usuarios.insert);
    app.put('/usuarios/editar/:id', usuarios.update);
    app.get('/usuarios/show/:id', usuarios.show);
    app.delete('/usuarios/delete¹:id',usuarios.remove);
};