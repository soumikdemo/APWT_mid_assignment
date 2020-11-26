const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			callback(results);

			/* if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			} */
		});
	},
	
	getSingleUserData: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' and type='"+user.type+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	addNewUser: function(user, callback){
		var sql = "INSERT INTO user VALUES('"+null+"','"+user.email+"','"+user.password+"','"+user.fullname+"','"+user.type+"','"+user.contactno+"','"+user.country+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getAllGeneralScout: function(callback){
		var sql = "select * from user where not type='admin'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	removeUser: function(id, callback){
		var sql = "DELETE FROM user WHERE id='"+id+"'";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getUserDataByid: function(id, callback){
		var sql = "select * from user where id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	updateUserInfo: function(id, obj, callback){
		var sql = "UPDATE user SET email='"+obj.email+"',password='"+obj.password+"',fullname='"+obj.fullname+"',contactno='"+obj.contactno+"',country='"+obj.country+"' WHERE id='"+id+"'";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	createNewThread: function(id, obj, callback){
		var sql = "INSERT INTO thread VALUES('"+null+"','"+obj.name+"','"+obj.genre+"','"+obj.country+"','"+obj.cost+"','"+obj.details+"','"+false+"','"+id+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},








	getEmployerList: function(callback){
		var sql = "select * from user where type='employer'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getEmployerDataById: function(empId, callback){
		var sql = "select * from user where id='"+empId+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},



	getAllJoblistById: function(employerId, callback){
		var sql = "select * from job where id='"+employerId+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

}