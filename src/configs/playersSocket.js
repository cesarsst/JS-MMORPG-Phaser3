module.exports =(socket, currentPlayers) => {

    

    // Metodos dos players para controle do servidor
    playerData = {

        // Métodos do jogo
    
        // Adiciona um novo player a lista de player online 
        addPlayer: player =>{
             currentPlayers.push(player);
             console.log(currentPlayers);
        },
    
        
    
        // Remove um determinado player da lista de conectados
        removePlayer: socketId =>{
            currentPlayers.forEach(player => {
                if(player.socketId === socketId){
                    // Remove o elemento 
                    currentPlayers.splice(currentPlayers.indexOf(player), 1); 
                } else{
                    console.log('Player não conectado.');
                }
            });
        }
    }


    // Adiciona o player que acabou de se conectar na lista de currentPlayers
    socket.on('addPlayer', infoPlayer => {
        infoPlayer = JSON.parse(infoPlayer)
        infoPlayer = {
            socketId: socket.id,
            name: infoPlayer.name,
            posx: infoPlayer.posx,
            posy: infoPlayer.posy
        };
        
        // chama função addPlayer passando o objeto do player ativo
        playerData.addPlayer(infoPlayer); 

        // Emite uma rendereização para o proprio navegador e depois envia para os demais
        socket.emit('currentPlayers', currentPlayers);
        socket.broadcast.emit('newPlayer', infoPlayer);
    });

    // Recebe movimentação do playerActive
    socket.on('playerMovement', function (movementData) {
        
        currentPlayers.forEach(player => {
            if(player.socketId === socket.id){
                player.posx = movementData.x;
                player.posy = movementData.y;
                player.animation = movementData.animation;
            }
            // Envia as novas posições do playerActive
            socket.broadcast.emit('playerMoved', player);
        })

    });



    // Verificando desconexão do jogador ativo
    socket.on('disconnect', function(){
        console.log();
        // Removendo jogador da lista de online
        playerData.removePlayer(socket.id)
        // Enviando dados sobre a retirado do players na lista de online
        socket.broadcast.emit('removePlayer', socket.id);
        
        console.log('Usuário desconectado:' + socket.id);
    })

}