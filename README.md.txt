Interação do Node.js mais o mongoDB dentro do cloud9
Códigos que iremos usar no mini curso

<h1>ESTRUTURA DA APLICAÇÃO</h1>

package.json – Todas as informações do projeto e suas dependências são contempladas neste arquivo, tal como o nome do projeto, versão, autor, licença, e dentre várias outras informações. (Links);
/node_modules/ – Diretório onde todas as dependências ficam alocadas;
/public/ – Local padrão para armazenar imagens, scripts, folhas de estilo e etc.;
/routes/ - Todos os scripts de rotas são guardados neste diretório;
/views/ - Onde devemos armazenar todos os arquivos da camada de view do projeto, scripts que geram o layout. (são as páginas)
app.js – Arquivo principal do projeto, onde o servidor será instanciado e inicializado;
* O Jade é um template engine exclusivo para Node.js, inspirado no Haml do Ruby, sua sintaxe é totalmente diferente do HTML convencional.

<h1>Instalando o Mongoose</h1>
É um objeto modelo para nodejs para trabalhar com mongoDB.

Instalando a dependências mongooose, dentro do “package.json”:
"mongoose":"*"

Em seguida no terminal digite:
npm install

para ver se o mongoose foi instalado, é só ir em node_modules.

<h1>INSTALANDO MONGODB</h1>
Instalando o MongoDB em um espaço de trabalho Cloud9
Para instalar o MongoDB na sua área de trabalho, você pode abrir um terminal e executar o seguinte comando:
$ sudo apt-get install -y mongodb-org

Executando o MongoDB em um espaço de trabalho Cloud9
O MongoDB está pré-instalado no seu espaço de trabalho. Para executar o MongoDB, execute o seguinte abaixo (passando os parâmetros corretos para ele). Os dados Mongodb serão armazenados na pasta data.

$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod

Você pode iniciar mongodb executando o mongodscript em sua raiz do projeto:
$ ./mongod

Acesso ao shell
Para acessar um prompt de shell para o MongoDB acima execute o seguinte.

$ mongo

Agora vamos adicionar o mongo no nosso projeto, vá em app.js e escreva :

COMANDOS QUE IREMOS UTILIZAR:
VER BANCO ATUAL
db

VER TODOS OS BANCOS 
show dbs

USAR O BANCO
use banco

LISTAR AS COLLECTIONS
show collections

LISTAR VALORES INSERIDOS NAS COLLCTIONS
 db.users.find().pretty()

 
//MongoDB

var mongoose = require('mongoose'); //a variavel mongoose vai fazer a requisição do mongoose
var db = mongoose.connect;          //conecta no banco.
mongoose.connect('mongodb://localhost/curso',function(err){ //CRIANDO O BANCO
  if(err){
    console.log('Erro ao conectar no mongodb '+err);
  }else{
    console.log('Conectado ao Banco ... ');
  }
});

<h1>TESTANDO A CONEXÃO COM O MONGODB</h1>
Proximo passo é abrir a pasta "models", dentro da pasta haverá um arquivo chamado "usuarios.js".

//O modele exports já exporta automaticamente
module.exports = function(app){
    //REQUISIÇÃO DO MONGOOSE
    var mongoose = require('mongoose');
    //São coleções de objetos dentro de um determinado banco de dados
    var Schema   = mongoose.Schema;
    //Os campos da minha collections e seus tipos
    var usuario = new Schema({
        login: String,
        senha: String
    });
    return mongoose.model('usuarios',usuario);//usuarios é o nome da minha collection
};

em seguida vamos em "controllers" (que será responsável pela comunicação entre Model e Views, e vice-versa), abrir o arquivo "usuarios":
    
//usario vai receber model usuarios
var Usuario = app.models.usuarios;

No mesmo arquivo iremos modificar o código:

//IRÁ LISTAR OS DADOS DO BANCO
  index: function(req,res){
      //data é os nossos dados que vão vim do banco
      // find vai trazer todos os registros
      Usuario.find(function(err, data) {
          if (err){
              console.log("erro : "+err)
          }//lista recebe o dados que vai do banco
          res.render("usuarios/index",{lista: data});
      });
  }

// FORMULARIO
    create: function(req,res){
        //Redirecinar para a pagina do formulario
        res.render("usuarios/create");
    }

//INSERINDO DADOS
insert: function(req,res){
  //model vai receber os campos do formulario
  var model = new Usuario({
          login: req.body.login,
          senha: req.body.senha
      });  
  model.save(function(err){
     if(err){
         console.log("erro: "+err);
      }else{
          res.redirect('/usuarios');
          console.log("Usuario cadastrado com sucesso ...");
      }        
  });
}

ROTAS:
Agora iremos criar as rotas:
//rota de cadastro, add o valor de usuario no banco
app.get('/usuarios/create',usuarios.create);
//Quando dê um POST, ele vai pegar a action insert
app.post('/usuarios', usuarios.insert);
  
Agora vamos criar o layout da listagem dos usuarios, é só ir views/usuarios/index.jade 
O código a seguir é onde será listado todos os usuarios cadastrados no banco:

extends ../layout

block content
  h1  Usuarios
  br
  br
  table(class="table")
    thead
      tr
        th ID:
        th Login
        th Senha
        th ação
    tbody
    each valor, i in lista 
      tr
        td #{valor._id}
        td #{valor.login}
        td #{valor.senha}
        td
          a(href="/usuarios/editar/#{valor._id}", title="Editar",class="btn btn-info")
            span(class="glyphicon glyphicon-pencil")
          &nbsp
          a(href="/usuarios/show/#{valor._id}", title="Ver",class="btn btn-primary") 
            span(class="glyphicon glyphicon-search  ")
    br
    a(href="/" title="inical") Voltar
    br 
    br
    a(href="/usuarios/create" title="Cadastrar") Cadastrar
    
a seguir, em "views/usuarios", vamos abrir o arquivo chamado "create.jade", é onde estará o formulario de cadastro.

extends ../layout

block content
  h1  Cadastro de usuario
  br
  form(method="POST", action="/usuarios", role="form" )
    div(class="form-group")
      label Login: 
      input(type="text", name="login", class="form-control")
    div(class="form-group")
      label Senha: 
      input(type = "password", name = "senha", class="form-control")
    input(type = "submit", value = "Cadastrar", class = "btn btn-success")
 
OBS: Quando dê um POST, ele vai pedir a rota que esteje no metodo POST, que está na routes.
 
METODO DE ATUALIZAR
Agora vamos agora fazer a update dos dados do mongoDB.
proximo passo, abrir o "views/usuarios/editar.jade", adicionar os seguintes comando:

extends ../layout

block content
  h1  Editar de usuario
  br
  form(method="POST", action="/usuarios/editar/#{value._id}", role="form") 
    input(type="hidden" name="_method" value="put")
    div(class="form-group")
      label Nome: 
      input(type="text", name="login", class="form-control",value='#{value.login}')
    div(class="form-group")
      label Login: 
      input(type="text", name="senha", class="form-control",value='#{value.senha}')
    input(type = "submit", value = "Atualizar", class = "btn btn-primary")
    
   
O formulario vai para editar no meu arquivo que está em controllers, procurando a action editar, que será o proximo passo:
Essa action é responsavel por levar meus dados para o formulario.

editar: function(req,res){
  //Pesquisando por um registro
  Usuario.findById(req.params.id, function(err, data){
      if(err){
          console.log(err);
      }else{
          //refireciona para a pagina do formulario de editar
          res.render('usuarios/editar', {value: data});
      }
  });
}

porém ainda não realizará atualizações, para isso teremos que criar uma action em "controlers/usuarios.js", e a rota no route/usuarios.js:

update: function(req,res){
  //findById está pesquisando o id. 
  Usuario.findById(req.params.id, function(err, data) {
    if(err){
        console.log('erro: '+err);
    }else{
      //Editando valores 
      var model = data;
      model.login = req.body.login;
      model.senha = req.body.senha;
      model.save(function(err){
         if(err){
              console.log('erro: '+err);
          }else{
              res.redirect('/usuarios');
              console.log("Usuario editado com sucesso ...");
          } 
      });
    } 
  });
}

Agora iremos fazer as rotas:

//Vai para pagina de edição
app.get('/usuarios/editar/:id',usuarios.editar);
//vai para action update
app.put('/usuarios/editar/:id', usuarios.update);
      
METODO DE VISUALIZAR
Primeiro iremos criar a rotas, "routes/usuarios.js", digite o seguinte codigo:
 
//Visualizar
app.get('/usuarios/show/:id',usuarios.show);
  
Agora iremos criar a action, em "controllers/usuarios.js":

show: function(req,res){
Usuario.findById(req.params.id, function(err, data){
  if(err){
      console.log(err);
  }else{
      res.render('usuarios/show', {value: data});
      console.log("Visualizado ...");
  }
});
        
 
Agora vamos criar uma pagina que irá visualizar os dados dos usuarios:
extends ../layout

block content
  h1= value.login
  br
  p= value._id
  br
  p= value.senha
  br
  form(method="POST", action="/usuarios/delete/#{value._id}", role="form")
     input(type="hidden" name="_method" value="delete")
     input(type = "submit", value = "Excluir", class = "btn btn-primary")
    
  br
  a(href="/usuarios" title="inical") Voltar
  
pronto já podemos testar!
  
METODO DE EXCLUIR
  
Primeiro iremos criar a rotas, routes/usuarios.js, digite o seguinte codigo:
  
  //Deletar
  app.delete('/usuarios/delete/:id', usuarios.remove);
 
Agora iremos criar nossa action remove na nossa "collections/usuarios.js":

remove: function(req,res){
    Usuario.remove({_id: req.params.id}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Excluido com sucesso ...');
            res.redirect('/usuarios');
        }
    });
}
