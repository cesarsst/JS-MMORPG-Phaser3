var preload = class preload extends Phaser.Scene {
    // Carrega os assets do game
    
    constructor ()
    {
        super('preload');
    }
    
    preload(){
        this.load.image('bg', 'assets/lobby/bg.png');
        this.load.image('lobbylogo', 'assets/lobby/lobbylogo.png');
        this.load.image('room_open', 'assets/lobby/room_open.png');
        this.load.image('room_locked', 'assets/lobby/room_locked.png');

        //Maps Assets 
        this.load.image('solaris', 'assets/lobby/solaris_map.png');
    }

    create(){
        
        this.scene.start('gameStart');
    }
}