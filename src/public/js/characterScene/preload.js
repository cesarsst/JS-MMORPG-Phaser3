var preload = class preload extends Phaser.Scene {
    // Carrega os assets do game
    
    constructor ()
    {
        super('preload');
    }
    
    preload(){
        this.load.image('bar', 'assets/characterSelect/bar1.png');
        this.load.image('bg', 'assets/characterSelect/fundo_char.png');
        this.load.image('botao', 'assets/characterSelect/botao.png');
    }

    create(){
        this.accountId = localStorage.getItem('accountId')
        this.form = document.getElementById('formLogin');
    }

    update(){
        
        // Remoção do formulario da tela e startando seleção de personagem
        if(this.accountId){
            this.scene.start('gameStart');
        }else{
            this.scene.start('preload');
            this.add.text(20, 20, "Faça login!");
        }  


    }


}