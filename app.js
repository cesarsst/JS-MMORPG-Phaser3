require('dotenv').config();

// Modulos Socket 
const playerSocket = require('./src/configs/playersSocket');
const enimesSolarisSocket = require('./src/configs/solaris/enimesSocket');


var app = require('./server');
var port = process.env.PORT || 3000;

const server = app.listen(port, function(){
    console.log('Servidor online!');
})


// Configurando o socket para escutar a mesma porta do servidor
var io = require('socket.io')(server);

// Criando a variavel global io para ser usado no app
app.set('io', io);



// Usuarios Conectados no jogo
var currentPlayers = [];

// Informações dos inimigos 
var dataEnimes = {
    mobs: {
        mob1:{
            id: 1,
            hp: 100,
            posx: 600,
            posy: 300,
            size: 40,
            respaw: 10000,
            timestemp: 0, 
            attack: false,
            sprite: 'cogumelo',
            skills: {
                mov: 'attack/cogumelo',
            },
            velocityX: 5,
            velocityY: -300,
        },

    }
}

// Iniciando conexão socket de usuario 
io.on('connection', async function(socket){
    console.log('a user connected: ', socket.id);

    // Funcionabilidades dos personagens 
    playerSocket(socket, currentPlayers);
   
    
    // Funcionabilidades dos inimigos
    enimesSolarisSocket(socket, dataEnimes); 
  
    
      
  
})

