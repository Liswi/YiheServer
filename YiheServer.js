//易和生活网后台页面 2017/7/20 by Liswi
var express =require('express');
var fs=require('fs')
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.

var connection=require('./mysqlConnect.js')
var query=require('./sqlquery.js')
//连接数据库
connection.connect();

//查
//query.sqlALL();
//增加
//query.addsql({userNumber:18037972381,password:"123456789"})
//删除
//query.delete(5)
//修改数据
//var modSql = 'UPDATE Users SET name = ?,url = ? WHERE Id = ?';
//var modSqlParams = ["","",""];
////改
//connection.query(modSql,modSqlParams,function (err, result) {
// if(err){
//       console.log('[UPDATE ERROR] - ',err.message);
//       return;
// }        
//console.log('--------------------------UPDATE----------------------------');
//console.log('UPDATE affectedRows',result.affectedRows);
//console.log('-----------------------------------------------------------------\n\n');
//});
//登录
app.post("/login",function(req,res){	
	console.log("body",req.body)
//	var sql="SELECT * FROM Users WHERE userNumber=?"
	var value=req.body.userNumber;
	var sql='SELECT * FROM Users WHERE userNumber='+value
	console.log(sql)
//var sql='SELECT * FROM Users '
	connection.query(sql,function(err,result){
	if(err){
		console.log('SELECT ERROR -',err.message);
		return;
	}else{
	      console.log(result);
	}
})

})





app.get('/',function(req,res){
	res.sendfile("index.html" )
})


	





app.listen(8081,function(){
	console.log("服务器开启成功,欢迎访问易和生活网!请访问:",this.address(),":",this.address().port)
})
