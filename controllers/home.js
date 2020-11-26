const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['email'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	var email = req.cookies['email'];
	var type = req.cookies['type'];

	var user = {
		email: email,
		type: type
	};

	userModel.getSingleUserData(user, function(results){
		//res.json(results);  for parsing ajax object ?

		/* var username = results[0].username;
		var id = results[0].id;
		var type = results[0].type; */

		if(type=="general"){
			res.render('home/general_index', {user: results});
		}else if(type=="admin"){
			//console.log(results);
			res.render('home/admin_index', {user: results});
		}else if(type=="scout"){
			res.render('home/scout_index', {user: results});
		}else{
			console.log("Couldn't specify what type of User.");
		}
	});
});


router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/userlist', {users: results});
	});

})

module.exports = router;