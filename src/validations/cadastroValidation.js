const { body, param } = require('express-validator/check')

exports.validate = (method) => {
  
    switch (method) {
        case 'all': {
            return [ 
                
                body('nome', 'campo inválido').exists().isString().not().isEmpty(),
                // Validação email
                body('email', 'campo inválido').exists().isEmail().not().isEmpty(),
                // Validação password
                body('password', 'campo inválido').exists().isLength({ min: 6}).isAlphanumeric().not().isEmpty(),
                
                body('address', 'campo inválido').exists().not().isEmpty(),
                
                body('city', 'campo inválido').exists().isString().not().isEmpty(),
                
                body('state', 'campo inválido').exists().isString().not().isEmpty(),
                
                body('zip', 'campo inválido').exists().isString().not().isEmpty()
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



