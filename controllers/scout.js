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


router.get('/update_info', (req, res)=>{
	var id = req.cookies['id'];

	userModel.getUserDataByid(id, function(results){
		res.render('scout/update_info', {user: results});
	});

});

router.post('/update_info', (req, res)=>{
	var id = req.cookies['id'];

	var obj = {
		email: req.body.email,
        password: req.body.password, 
        fullname: req.body.fullname, 
		contactno: req.body.contactno,
		country: req.body.country
	}

	userModel.updateUserInfo(id, obj, function(status){
		if(status == true){
			console.log("Updated successfully"); 
			res.send('<p>Updated successfully</p>');
		}else{
			console.log("Data update error");
			res.send('<p>Data update error</p>');
        }
	});
});


router.get('/create_post', (req, res)=>{
	res.render('scout/create_post');
});

router.post('/create_post', (req, res)=>{
	var id = req.cookies['id'];

	var obj = {
		name: req.body.name,
        genre: req.body.genre, 
        country: req.body.country, 
		cost: req.body.cost,
		details: req.body.details
	}

	userModel.createNewThread(id, obj, function(status){
		if(status == true){

			userModel.getThreadid(id, obj.name, function(set){
				console.log("req table threadid "+set[0].threadid);
				var postid = set[0].threadid;

				userModel.createPostRequest(id, postid, function(result){
					console.log("insert into req table "+result);
				});
			});

			console.log("Created successfully and requested for admin approval."); 
			res.send('<p>Created successfully</p>');
		}else{
			console.log("Post create error");
			res.send('<p>Post create error</p>');
        }
	});
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

