var mysql=require('mysql');
//建立连接信息
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	port:'3306',
	database:'YiheLiveUser',
})

module.exports=connection;