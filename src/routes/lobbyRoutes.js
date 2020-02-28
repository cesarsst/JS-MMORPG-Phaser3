const controllerLobby = require('../controllers/lobbyController');

module.exports = function(application){


    // Envia para o lobby do game 
    application.post('/lobby', function(req, res){
        controllerLobby.lobby(application, req, res);
    })



}