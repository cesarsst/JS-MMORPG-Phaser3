const controller = require('../controllers/characterController')


module.exports = function(application){

    // Go to find character info 
    application.post('/characterInfo', async function(req, res){
        controller.characaterInfo(application, req, res);
    });
    
    
    
}