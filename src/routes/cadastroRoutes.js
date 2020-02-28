const controllerCadastro = require('../controllers/cadastroController')
const cadastroValidation = require('../validations/cadastroValidation')

module.exports = function(application){
    
    application.get('/cadastro', function(req, res){
        controllerCadastro.home(application, req, res);
    })

    application.post('/register',
    cadastroValidation.validate('all'), 
    (req, res) => {
        controllerCadastro.register(application, req, res);
    })
    
}