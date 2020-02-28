require('dotenv').config();

const express = require('express');
const http = require('http');
const consign = require('consign'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const expressSession = require('express-session');

const app = express();

// setup mongo connection
mongoose.connect('mongodb+srv://admin:admin@cluster0-jl0x6.mongodb.net/MmoArcade?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('Conectado a base da dados com sucesso!');
});
mongoose.set('useFindAndModify', false);

// Config EJS enginer
app.set('view engine', 'ejs');
app.set('views', ['./src/views', './src/views/maps']);


// Configurando arquivos estaticos
app.use(express.static('./src/public'));

// Body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(jsonParser); 

// configura o middleware expression Sesion
app.use(expressSession({
  secret: 'hsohdoasdoansodasdlçk',
  resave: false,
  saveUninitialized: false
}))

consign()
    .include('./src/routes')
    .into(app);



module.exports = app;