const { check, validationResult } = require('express-validator');
const Account = require('../models/Account');
const Character = require('../models/Character');



module.exports.login = async function(application, req, res){

    const account = await Account.findOne({email: req.body.email, password: req.body.password});
     
    // Se existir uma conta vai para tela de login do game
    if(account){

        res.render('character');
    
    }else{
        res.send('Não autorizado');
    }
        
   
}


module.exports.sair = async function(application, req, res){

    req.session.destroy();

    res.render('index', {listError:[], data:{}, account:{}, autorizado:false});
}


// Login Preload Scene 
module.exports.loginGame = async function(application, req, res){

    console.log('Connect preload scene:', req.body)
    const account = await Account.findOne({email: req.body.email, password: req.body.password});
    
    // Se existir uma conta envia os dados 
    if(account){
        res.send({dadosAccount: account});
    }else{
        res.send('Não autorizado');
    }
        
   
}