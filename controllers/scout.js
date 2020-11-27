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


router.get('/post_list', (req, res)=>{
	var id = req.cookies['id'];

	userModel.getThreadlistByScoutid(id, function(results){
		res.render('scout/post_list', {list: results});
	});

});

router.get('/view_thread/:id', (req, res)=>{
	var threadid = req.params.id; 

	userModel.getThreadInfo(threadid, function(results){
		res.render('scout/view_thread', {obj: results});
	});
});

router.get('/request_edit/:id', (req, res)=>{
	var threadid = req.params.id; 
	var scoutid = req.cookies['id'];

	userModel.createUpdateRequest(scoutid, threadid, function(status){
		if(status == true){
			console.log("Post edit requested to admin"); 
			res.send('<p>Post edit requested to admin</p>');
		}else{
			console.log("req error");
			res.send('<p>req error</p>');
        }
	});
});

router.get('/update_postlist', (req, res)=>{
	var scoutid = req.cookies['id'];

	userModel.getApprovedUpdateRequests(scoutid, function(results){
		userModel.getAllThreads(function(threads){
			res.render('scout/update_postlist', {list: results, thread: threads});
		});	
	});
});




module.exports = router;

