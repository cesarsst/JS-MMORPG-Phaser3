const { body, param } = require('express-validator/check')

exports.validate = (method) => {
  
    switch (method) {
        case 'all': {
            return [ 
                // Validação email
                body('email', 'Email inválida!').exists().isEmail().not().isEmpty(),
                // Validação password
                body('password', 'Senha inválida').exists().isLength({ min: 6}).isAlphanumeric().not().isEmpty(),
               ]   
        }

        case 'params': {
            return [
                //validando parametro delete
                param('user_id').exists().isNumeric().not().isEmpty()
            ]
        }

        
    }

}



