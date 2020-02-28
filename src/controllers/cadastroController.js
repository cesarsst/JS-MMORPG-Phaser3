const Account = require('../models/Account');
const { check, validationResult } = require('express-validator');

module.exports.home = async function(application, req, res){
    
    const listError = [];
    const data = {};

    res.render('cadastro', {listError, data})
}

module.exports.register = function(application, req, res){

    try {
        
        // Começo da validação
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        const listError = [];
        const data = req.body


        if (!errors.isEmpty()) {
            errors.array({onlyFirstError: true}).forEach(function (item, indice, array) {
                listError.push([item.param, item.msg]);
            })       
            
            res.render('cadastro', {listError, data}); 
            return;
        }
    
        newAccount(req, res, data, listError);

    } catch(err) {
        return next(err);
    }

    
}

async function newAccount(req, res, data, listError){
   
    // Verificando se já na existe cadastro pelo email fornecido
    const accountExists = await Account.find({email: data.email});

    if(accountExists.length != 0){
        listError.push(['email', 'já utilizado']);
        return res.render('cadastro', {listError, data});
    }
    

    const account = await Account.create({
        name: data.nome,
        email: data.email,
        password: data.password,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip
   });

   res.send('Cadastrado com sucesso.');
}