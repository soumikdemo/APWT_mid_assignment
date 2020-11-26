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


router.get('/create_user', (req, res)=>{
	res.render('admin/create');
});

router.post('/create_user', (req, res)=>{
    
    var userReg = {
		email: req.body.email,
		password: req.body.password, 
		type: req.body.type,
		fullname: req.body.fullname,
		country: req.body.country,
		contactno: req.body.contactno
	}

	userModel.addNewUser(userReg, function(status){
		if(status == true){
			console.log("Data inserted successfully"); 
			res.send('<p>User created successfully</p>');
		}else{
			console.log("Data insertion error", status);
			res.send('<p>ERROR creating user.</p>');
        }
	});
});


router.get('/remove_user', (req, res)=>{
	userModel.getAllGeneralScout(function(results){
		res.render('admin/remove_user', {users: results});
	});

});


router.get('/remove_user/:id', (req, res)=>{
	var id = req.params.id;
	
	userModel.removeUser(id, function(status){
		if(status == true){
			console.log("User removed successfully"); 
			res.send('<p>User removed successfully</p>');
		}else{
			console.log("User remove error", status);
			res.send('<p>ERROR removing user.</p>');
        }
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

