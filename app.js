//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');

const registration      = require('./controllers/registration');
const login				= require('./controllers/login');
const logout			= require('./controllers/logout');
const home				= require('./controllers/home');
const scout		   	    = require('./controllers/scout'); 
const general		   	= require('./controllers/general');
const admin  		    = require('./controllers/admin');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/registration', registration);
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/scout', scout);
app.use('/general', general);
app.use('/admin', admin);

//router
app.get('/', (req, res)=>{
	res.render('homepage.ejs'); 
	//res.send('<h1>welcome</h2><script>alert("Signing up succcessful!"); window.location="/login";</script>');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});