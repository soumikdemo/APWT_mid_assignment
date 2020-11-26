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
	//var adminId = req.session.userid;
	var submitted = false;

	res.render('admin/create', {submitted: submitted});

});

router.post('/create', (req, res)=>{
    
    var empReg = {
		username: req.body.username,
		password: req.body.password, 
		type: 'employer',
		emp_name: req.body.fullname,
		comp_name: req.body.compName,
		contact_no: req.body.contactNo
	}

	userModel.addNewEmployer(empReg, function(status){
		if(status == true){
			console.log("Data inserted successfully"); 
			var submitted = true;

			res.render('admin/create', {submitted: submitted});
		}else{
			console.log("Data insertion error", status);
        }
	});

/* 	res.send('New user info:'+
				"<br> Username: "+req.body.username+
				"<br> Password: "+req.body.password+
				"<br> Email: "+req.body.email
			); */
});


router.get('/alterEmployer', (req, res)=>{
	userModel.getEmployerList(function(results){
		res.render('admin/alterEmployer', {empList: results});
	});

});


router.get('/employerEdit/:id', (req, res)=>{
	var empId = req.params.id;
	userModel.getEmployerDataById(empId, function(results){
		
		//var submitted = false;
		var alert = "<script></script>";

		var empObj = {
			id: results[0].id,
			username: results[0].username,
			password: results[0].password,
			emp_name: results[0].emp_name,
			comp_name: results[0].comp_name,
			contact_no: results[0].contact_no
		}

		res.render('admin/employerEdit', {employer: empObj, alert: alert});
	});
});

router.post('/employerEdit/:id', (req, res)=>{
	var empObj = {
		id: req.body.id,
		username: req.body.username,
		password: req.body.password, 
		type: 'employer',
		emp_name: req.body.fullname,
		comp_name: req.body.compName,
		contact_no: req.body.contactNo
	}

	userModel.updateEmployer(empObj, function(status){
		if(status == true){
			console.log("Updated successfully"); 
			//var submitted = true;
			var alert = "<script>alert('Updated successfully!');</script>";

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
		
				res.render('admin/employerEdit', {employer: empObj, alert: alert});
			});

			//res.redirect('admin/employerEdit');
		}else{
			console.log("Data update error", status);
        }
	});
});

router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('user/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

module.exports = router;

