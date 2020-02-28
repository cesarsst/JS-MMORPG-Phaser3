const controllerLogin = require('../controllers/loginController');
const loginValidation = require('../validations/loginValidation');

module.exports = function(application){

    application.post('/login',
        loginValidation.validate('all'),
        (req, res, next) => {
        controllerLogin.login(application, req, res);
    })

    application.get('/sair',
        (req, res, next) => {
        controllerLogin.sair(application, req, res);
    })

    // Route Login Game 
    application.post('/loginGame',
        loginValidation.validate('all'),
        (req, res, next) => {
        controllerLogin.loginGame(application, req, res);
    })

}