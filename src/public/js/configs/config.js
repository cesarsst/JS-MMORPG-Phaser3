var config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffff',
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1000,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug: true,
            enableBody: true,
        }
    },
    scene: [preload, gameStart]

};

var game = new Phaser.Game(config);
