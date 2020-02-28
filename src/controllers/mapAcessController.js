const Character = require('../models/Character');


// Find character info user
module.exports.mapAcess = async function(application, req, res){
   
    const accountId = req.body.accountId;
    const charId = req.body.charId;
    const map = req.body.map;
    
   
    // falta verificação aqui
    
   
    // Send info characters
    res.render('solaris');
}



  
