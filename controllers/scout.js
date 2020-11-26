const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/create', (req, res)=>{

	var empId = req.session.userid;
	//console.log(empId);
	res.render('employer/create', {id: empId});

});

router.post('/create', (req, res)=>{

/* 	res.send('New user info:'+
				"<br> Username: "+req.body.username+
				"<br> Password: "+req.body.password+
				"<br> Email: "+req.body.email
			); */
});


router.get('/jobList', (req, res)=>{
	var employerId = req.session.userid;

	userModel.getAllJoblistById(employerId, function(results){
		res.render('employer/jobList', {jobs: results});
	});

});


router.get('/edit/:id', (req, res)=>{
/* 	var user = {
		username: 'test',
		password: 'test',
		email: 'alamin@aiub.edu'
	}; */

	var empId = req.params.id;
	userModel.getEmployerDataById(empId, function(results){
		
		var empObj = {
			id: results[0].id,
			username: results[0].username,
			password: results[0].password,
			emp_name: results[0].emp_name,
			comp_name: results[0].comp_name,
			contact_no: results[0].contact_no
		}
		res.render('employer/editJob', {employer: empObj});
	});
});

router.post('/edit/:id', (req, res)=>{
	res.redirect('/home/userlist');
});



router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('user/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

module.exports = router;

