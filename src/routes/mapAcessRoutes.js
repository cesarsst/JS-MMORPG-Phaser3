const controller = require('../controllers/mapAcessController')


module.exports = function(application){

    // Go to find character info 
    application.post('/mapAcess', async function(req, res){
        controller.mapAcess(application, req, res);
    });
    
    
    
}