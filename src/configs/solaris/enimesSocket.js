module.exports = (socket, dataEnimes) => {

  

    // Talvez essa função deva ser global para todos os mobs e não só para o mapa
    socket.on('playerReqFrist', () =>{
        console.log('Solicitação da posição dos mobs ao logar.');
        socket.emit('enimesPos', dataEnimes);
    })

   
    
  
        
        // Manda o comando dos enimigos a cada 2 segundos 
    setInterval(async function(){
        
        
        var x = dataEnimes.mobs.mob1.posx
       
        var active = 0;

        while(x > 400 && active == 0){
        
            x = dataEnimes.mobs.mob1.posx = x - 5;
         
        }
        active = 1
        x = dataEnimes.mobs.mob1.posx = x + 5;


         
        console.log(x);
        socket.broadcast.emit('enimesMov', dataEnimes, x);

        

    }, 1000)


}