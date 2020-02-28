/*
SOCKET Enimes:
- Configurações de todas as comunicações socket com o servidor
Cuida da recepção dos dados e movimentos dos inimigos no jogo.
*/

var timedEvent;

function socketEnimes(self){

    // Criando group dos inimigos
    self.enimesGroup = self.physics.add.group();

    // Requisitando dados dos mobs do mapa
    self.socket.emit('playerReqFrist');

    // Criação dos sprites dos inimigos
    self.socket.on('enimesPos', (dataEnimes) =>{
    
        //console.log('Criei os sprites dos mobs pela primeira vez!', Object.keys(dataEnimes.mobs));
        
        Object.keys(dataEnimes.mobs).forEach(enimes => {
            addNewEnime(dataEnimes.mobs[enimes], self);
            //console.log(dataEnimes.mobs[enimes]);
        })
       
        
    });

    // Atualizando coordenadas do inimigo
    self.socket.on('enimesMov', (dataEnimes, x) => {
        
        console.log('Recebi as posicação dos mobs')
        
        // Percore a lista de enimigos já criado e encontra seu Data correspondente 
        Object.keys(dataEnimes.mobs).forEach(enimes => {
            self.enimesGroup.getChildren().forEach(function (enime) {
                
                // Busca dados do inimigo ja criado anteriormente
                const enimeData = dataEnimes.mobs[enimes];
                if(enimeData.id === enime.idEnime){
                    
                    var spriteEnime = enime.first;
                    
                    spriteEnime.anims.play(enimeData.skills.mov);
                    enime.body.setCollideWorldBounds(true);

                    self.time.addEvent({ delay: 0, callback: cogumeloMov(enime, x), callbackScope: this, loop: false})
                    
                    
                }
            });
        });


    });

}


function addNewEnime(enime, self){
    // Players info view
    console.log('Criação do inimigo: ',enime);
    const newEnime = self.add.sprite(0, 0, 'solaris', enime.sprite + '/mov1.png');
    const name = self.add.text(-35, -40, enime.sprite, {
        fontSize: '14px',
        fill: 'yellow',
        fontStyle: 'bold'
    });

    // Propriedades do container do inimigo 
    const container = self.add.container(enime.posx, enime.posy);
    container.idEnime = enime.id;
    container.setSize(enime.size, enime.size);
    container.add(newEnime);
    container.add(name);

    // Colliders sets
    self.physics.world.enable(container);
    container.body.setCollideWorldBounds(true);
    self.physics.add.collider(container, self.piso);
    self.physics.add.collider(container, self.enimesGroup);
    self.physics.add.collider(container, self.playerActive);
    
    self.enimesGroup.add(container);
}
