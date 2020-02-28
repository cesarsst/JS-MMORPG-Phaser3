/*
ADD PLAYER:
- Adiciona sprite do jogador ativo
*/
function addPlayer(player, self){
    
    // Players info view
    self.playerActiveSprite = self.add.sprite(0, 0, 'player');
    const name = self.add.text(-50, -40, player.name, {
        fontSize: '14px',
        fill: 'black',
        fontStyle: 'bold'
    });

    // Container Props
    const container = self.add.container(player.posx, player.posy);
    container.setSize(40, 40);
    container.add(self.playerActiveSprite);
    container.add(name);
    
    // Colliders sets
    self.physics.world.enable(container);
    container.body.setCollideWorldBounds(true);
    self.physics.add.collider(container, self.piso);

    // Adicionando container para variavel do usuario ativo
    self.playerActive = container;
}

/*
ADD OTHER PLAYER:
- Responsavel pela criação dos sprites dos demais jogadores
*/
function addOtherPlayer(player, self){
    // Players info view
    const otherPlayer = self.add.sprite(0, 0, 'player');
    const name = self.add.text(-50, -40, player.name, {
        fontSize: '14px',
        fill: 'black',
        fontStyle: 'bold'
    });

    // Container Props
    const container = self.add.container(player.posx, player.posy);
    container.setSize(40, 40);
    container.add(otherPlayer);
    container.add(name);

    // Seta socketId para controle
    container.socketId = player.socketId;

    // Colliders sets
    self.physics.world.enable(container);
    container.body.setCollideWorldBounds(true);
    self.physics.add.collider(container, self.piso);

    // Setando group
    self.otherPlayers.add(container);
}

/*
MOV PLAYER:
- Responsavel pela movimentação do jogador ativo
*/
function movPlayer(self){

    // Player movs
    if (self.playerActive) {
        
        var animation = 2;
        self.playerActive.body.setVelocityX(0);
        // Horizontal movement
        if (self.cursors.left.isDown) {
            self.playerActive.body.setVelocityX(-160);
            self.playerActiveSprite.anims.play('left', true);
            self.playerActive.flipX = true;
            animation = 0;
        } else if (self.cursors.right.isDown) {
            self.playerActive.body.setVelocityX(160);
            self.playerActiveSprite.anims.play('right', true);
            self.playerActive.flipX = false;
            animation = 1;
        } else {
            self.playerActiveSprite.anims.play('turn');
            animation = 2;
        }
        // Vertical movement
        if (self.cursors.up.isDown && self.playerActive.body.touching.down) {
            self.playerActive.body.setVelocityY(-330);
            self.playerActiveSprite.anims.play('turn', true);
            animation = 3;

        } else if (self.cursors.up.isDown && (self.playerActive.body.touching.left ||self.playerActive.body.touching.right)){
            self.playerActive.body.setVelocityY(-150);
            self.playerActiveSprite.anims.play('turn', true);
            animation = 3;

        } 
    
        
        var x = self.playerActive.x;
        var y = self.playerActive.y;
     
        if (self.playerActive.oldPosition && (x !== self.playerActive.oldPosition.x || y !== self.playerActive.oldPosition.y)) {
            self.socket.emit('playerMovement', { x, y, animation});
        }
        // save old position data
        self.playerActive.oldPosition = {
            x: self.playerActive.x,
            y: self.playerActive.y,
        };


    }


}

/*
SOCKET PLAYER:
- Configurações de todas as comunicações socket com o servidor
Cuida da recepção dos dados e movimentos dos players online no jogo.
*/
function socketPlayer(self){
    
        // Pegando dados do player ativo 
        const player = localStorage.getItem('charId');
        
        // Criando grupo para controlar outros players
        self.otherPlayers = self.physics.add.group();

        // Emitindo dados do player ativo para servidor.
        self.socket.emit('addPlayer', player);
        
        // Recebendo todos jogadores online-> Só é realizado um currentPlayers por navegador
        self.socket.on('currentPlayers', currentPlayers => {
            console.log('Lista players',currentPlayers);
            currentPlayers.forEach(player => {
                if(player.socketId === self.socket.id){
                    addPlayer(player, self);
                } else {
                    console.log("recebi lista de players!")
                    addOtherPlayer(player, self);
                }
            });
        });

        // Adicionando novos membros a listas de currentPlayers
        self.socket.on('newPlayer', newPlayer => {
            console.log('Recebi novo login')
            addOtherPlayer(newPlayer, self, self.otherPlayers);
        });

        // Atualizando coordenas dos othersPlayers
        self.socket.on('playerMoved', playerInfo =>{
            self.otherPlayers.getChildren().forEach(function (player) {
              if (playerInfo.socketId === player.socketId) {
                
                // Setando posição nova dos othersplayers
                player.setPosition(playerInfo.posx, playerInfo.posy);
                
                // Animação do movimento othersPlayers
                var playerSprite = player.first;
                if(playerInfo.animation == 0){
                    playerSprite.anims.play('left', true);
                } else if(playerInfo.animation == 1){
                    playerSprite.anims.play('right', true);
                } else if(playerInfo.animation == 2){
                    playerSprite.anims.play('turn', true);
                }
                
                 
              }
        })});

        // Deletando o player quando desconecta
        self.socket.on('removePlayer', socketId =>{
            self.otherPlayers.getChildren().forEach(function (player) { 
                if(player.socketId === socketId){
                    player.destroy();
                }
            });
        });


}