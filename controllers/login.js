const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		email: req.body.email,
		password: req.body.password
	};

	userModel.validate(user, function(results){

		if(typeof results!="undefined"){
			res.cookie('email', req.body.email); 
			res.cookie('type', results[0].type); 
			
			//console.log(typeof results);
			//console.log(results);

			req.session.email=results[0].email;
			req.session.type=results[0].type;
			
			res.redirect('/home');

		}else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;