const Account = require('../models/Account')
const Character = require('../models/Character')

module.exports.lobby = async function(aplication, req, res){

    const accountId = req.body.accountId;
    const charId = req.body.charId;

    // Verific if account and char exist and is linked 
    const accountVerific = await Account.findOne({_id: accountId});
    if(accountVerific){
        const charVerific = await Character.findOne({_id: charId, accountId: accountId})
        if(charVerific){
            res.render('lobby');
        } else{
            res.send('Error: Character not foud!');
        } 
    } else {
        console.log('entrei2');
        res.send('Error: Account not foud!');
    }

    
}