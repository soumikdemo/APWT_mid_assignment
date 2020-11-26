const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = "";
	//res.cookie('uname', '');
	
	res.clearCookie('email'); 
	res.clearCookie('type');
	res.clearCookie('id');

	res.redirect('/login');
});


module.exports = router;



