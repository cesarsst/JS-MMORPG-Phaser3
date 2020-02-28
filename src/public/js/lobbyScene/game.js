 // Recive accountId
 const accountId = localStorage.getItem('accountId');
 const charId = localStorage.getItem('charId');

console.log(accountId, charId);
class gameStart extends Phaser.Scene{

    constructor(){
        super('gameStart');
    }

    create(){
        this.add.image(0, 0, 'bg').setOrigin(0,0);
        this.add.image(225, 0, 'lobbylogo').setOrigin(0,0);

        // Create rooms
        this.createRooms();
        
    }

    createRooms(){

        // Room Solaris
        this.solarisRoom = this.add.sprite(80, 140, 'solaris').setInteractive().setOrigin(0,0);
        this.solarisRoom.on('pointerdown', function (pointer) {
            // Evento select personagem
            goRoom('solaris');
            
        });
        this.solarisRoom.on('pointerout', function (pointer) {
            this.clearTint();
        });
        this.solarisRoom.on('pointerover', function (pointer) {
            this.setTint(0xff0000);  
        });


        this.add.sprite(370,140, 'room_locked').setOrigin(0,0)
        this.add.sprite(660,140, 'room_locked').setOrigin(0,0)


        // Go to room clicked
        function goRoom(nomeMap){ 

            //Redirect to Lobby
            var data = { 
            accountId: accountId,
            charId: charId,
            map: nomeMap
            }
           
            console.log(data);
            // Send data via POST and redirect to select room
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
            
            redirect('/mapAcess', 'post');
           
            
        }
    
    }

    
    update(){

    }


}
