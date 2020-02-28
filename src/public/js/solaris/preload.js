var preload = class preload extends Phaser.Scene {
    // Carrega os assets do game
    
    constructor ()
    {
        super('preload');
    }
    
    preload(){
        this.load.multiatlas('solaris', 'assets/solaris/solaris.json', 'assets/solaris');
        this.load.image('sword', 'assets/solaris/attack-icon.png');
        this.load.spritesheet('player', 'assets/solaris/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.text(20, 20, "Loading Game...")
        this.scene.start('gameStart');
    }
}