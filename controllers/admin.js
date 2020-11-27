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

router.get('/update_info', (req, res)=>{
	var id = req.cookies['id'];

	userModel.getUserDataByid(id, function(results){
		res.render('admin/update_info', {user: results});
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
			console.log("Data update error", status);
			res.send('<p>Data update error</p>');
        }
	});
});


router.get('/manage_request', (req, res)=>{
	userModel.getRequests(function(results){
		res.render('admin/manage_request', {list: results});
	});
});


router.get('/view_thread/:id', (req, res)=>{
	var threadid = req.params.id; 

	userModel.getThreadInfo(threadid, function(results){
		res.render('admin/view_thread', {obj: results});
	});
});

router.get('/approve_thread/:id', (req, res)=>{
	var threadid = req.params.id; 
	var reqid, reqtype;
	
	userModel.getRequests(function(results){
		results.forEach(element => {
			if(element.threadid == threadid){
				reqtype = element.reqtype;
				reqid = element.reqid;
			}
		});

		console.log("var: "+reqtype);
	
		if(reqtype == "create"){
			userModel.publishThreadByid(threadid, function(status){
				console.log("thread published"+status);
			});
			userModel.createRequestApproved(reqid, threadid, function(status){
				console.log("req table change"+status);
			});
	
			res.send('<p>approved</p>');

		}else if(reqtype == "update"){
			userModel.updateRequestApproved(reqid, threadid, function(status){
				console.log("update req table change "+status);
			});

			res.send('<p>approved</p>');
	
		}else{
			console.log("Unspecified request type");
		}
	});

});


router.get('/thread_edit/:id', (req, res)=>{
	var threadid = req.params.id; 

	userModel.getThreadInfo(threadid, function(results){
		res.render('admin/thread_edit', {obj: results});
	});
});

router.get('/allpost_list', (req, res)=>{
	userModel.getAllThreads(function(results){
		res.render('admin/allpost_list', {list: results});
	});
});







module.exports = router;

