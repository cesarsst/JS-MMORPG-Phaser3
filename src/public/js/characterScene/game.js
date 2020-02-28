 // Recive accountId
const accountId = localStorage.getItem('accountId');



class gameStart extends Phaser.Scene{

    constructor(){
        super('gameStart');
    }

    create(){
        
        // Deletando formulario
        document.getElementById('formLogin').style.display = "none";

        // Background image
        this.bg = this.add.image(0,0, 'bg').setOrigin(0,0);

        // Bar image 
        this.char1 = this.add.image(70,100, 'bar',).setOrigin(0,0);
        this.char2 = this.add.image(375,100, 'bar').setOrigin(0,0);
        this.char3 = this.add.image(680,100, 'bar').setOrigin(0,0);
    
        // Events buttons
        this.createEvents();

    }


    createEvents(){

            // Get character info
            axios.post('/characterInfo', {
            accountId: accountId
            })
            .then(response => {
                // Cria botoões dos characters
                this.characters = response.data.characters;
                this.createButtonSelect(this.characters);
            })
            .catch(error =>{
                console.log(error);
            })

        
    }

    createButtonSelect(characterInfo){
        // Create button and select evets
        switch(characterInfo.length){
        // Select character 1 
        case 3:
            
            // Create Button select for character 3
            this.button3 = this.add.sprite(733, 375, 'botao').setInteractive().setOrigin(0,0);
            this.button3.on('pointerdown', function (pointer) {
                // Event select player
                localStorage.setItem('charId', JSON.stringify(characterInfo[2]));
                goLobby(2);
            });
            this.button3.on('pointerout', function (pointer) {
                this.clearTint();
            });
            this.button3.on('pointerover', function (pointer) {
                this.setTint(0xff0000);
            });
            
            // Add info for character 3
            this.add.text(765, 385, characterInfo[2].name,{
                font: "16px Arial",
                fill:"black"
            });

        // Select character 2
        case 2:

            // Create Button select for character 2
            this.button2 = this.add.sprite(500, 400, 'botao').setInteractive();
            this.button2.on('pointerdown', function (pointer) {
                // Evento select personagem
                localStorage.setItem('charId', JSON.stringify(characterInfo[1]));
                goLobby(1);
            });
            this.button2.on('pointerout', function (pointer) {
                this.setScale();
                this.clearTint();
            });
            this.button2.on('pointerover', function (pointer) {
                this.setTint(0xff0000);
                this.setScale(1.1, 1.1);
                
            });

            // Add infos for character 2
            this.add.text(460, 385, characterInfo[1].name, {
                font: "16px Arial",
                fill:"black"
            });

        // Select character 1
        case 1:
            
            // Create Button select for character 1
            this.button1 = this.add.sprite(123, 375, 'botao').setInteractive().setOrigin(0,0);
            this.button1.on('pointerdown', function (pointer) {
                // Evento select personagem
                localStorage.setItem('charId', JSON.stringify(characterInfo[0]));
                goLobby(0);
            });
            this.button1.on('pointerout', function (pointer) {
                this.clearTint();
            });
            this.button1.on('pointerover', function (pointer) {
                this.setTint(0xff0000);
            });

            // Add infos for character 1
            this.add.text(155, 385,characterInfo[0].name, {
                font: "16px Arial",
                fill:"black"
            });
        } 

        function goLobby(charSelect){ 

            //Redirect to Lobby
            var data = { 
            accountId: accountId,
            charId: characterInfo[charSelect]._id
            }
           

            // Enviando dados por POST e redirecionando para o Lobby
            
            var redirect = function(url, method) {
                var form = document.createElement('form');
                form.method = method;
                form.action = url;
                for (var name in data) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    input.value = data[name];
                    form.appendChild(input);
                }
                document.body.appendChild(form);
                form.submit();
            };
            
            redirect('/lobby', 'post');
            
        }
       

    }

 

    update(){
    
    }


}