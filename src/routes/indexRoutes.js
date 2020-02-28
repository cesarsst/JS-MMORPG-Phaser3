const controllerIndex = require('../controllers/indexController');


module.exports = function(application){

    application.get('/', function(req, res){
        res.render('index');
    });

    application.get('/enterGame', function(req, res){
        controllerIndex.enterGame(application, req, res);
    });

}