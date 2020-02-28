const Character = require('../models/Character');


// Find character info user
module.exports.characaterInfo = async function(application, req, res){
    // Recive accountId for preload login
    const accountId = req.body.accountId;
    //console.log('Recebi a id:', accountId);
    
    // Find all character 
    const characters = await Character.find({accountId: accountId});
    
   
    // Send info characters
    res.send({characters})
}



  
