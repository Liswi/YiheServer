//易和生活网后台页面 2017/7/20 by Liswi
var express =require('express');
var fs=require('fs')
var app=express();
var bodyParser = require('body-parser');
var list=require('./data.js')
app.use(bodyParser.urlencoded({ extended: true }));
// 创建 application/x-www-form-urlencoded 编码解析


var connection=require('./mysqlConnect.js')
var query=require('./sqlquery.js')
//连接数据库
connection.connect();
for(var i=0;i<3;i++){
//	query.addsql(list.address[i])
}

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
//	console.log("body",req.body)
	var sql='SELECT * FROM Users WHERE userNumber='+req.body.userNumber;
	connection.query(sql,function(err,result){
	if(err){
		console.log('SELECT ERROR -',err.message);
		return;
	}else{
		console.log(result)
	     	if(result&&req.body.passWord==result[0].password){
	     			res.send(result[0].id+"");
	     	}else{
	     		res.send("error");
	     	}
	}
})
})

//注册
app.post("/reg",function(req,res){
//	var result=query.addsql(req.body);
console.log(req.body.userNumber,req.body.passWord)
var sql='SELECT * FROM Users WHERE userNumber='+req.body.userNumber;
	connection.query(sql,function(err,result){
	if(err){
		console.log('SELECT ERROR -',err.message);
		return;
	}else{
		//判断此手机号是否已经处于数据库中
		console.log(result.length);
		if(result.length==0){
	var  addSql = 'INSERT INTO Users(userNumber,password) VALUES('+req.body.userNumber+','+req.body.passWord+')';
	connection.query(addSql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         return;
        }        
		res.send("1")
});
		}else{
			res.send("2")
		}
	}
})
	
})

//请求用户名信息
app.post("/user",function(req,res){
	var sql='SELECT * FROM Users WHERE id='+req.body.userid;
	var userObj={err:0,data:{username:""}}
	connection.query(sql,function(err,result){
		if(!err){
			if(result[0].userName==""){
				userObj.data.username=result[0].userNumber;
				res.send(userObj)
			}else{
					userObj.data.username=result[0].userName
					res.send(userObj)
			}
		}else{
			res.send("error")
		}
	})
})

//请求用户账户信息
app.get("/myaccount",function(req,res){
//	console.log(req.query)
	var data={err:0,data:{}} 
	var sql="SELECT cash,userNumber,rank,sex,birthday,yihequan,vip,img FROM Users where id="+req.query.userid;
	connection.query(sql,function(err,result){
		console.log(result)
		if(!err){
			data.data=result[0]
			res.json(data)
		}else{
			data.err=1
			res.send(data)
		}
	})
})

//
app.get("/home",function(req,res){
	var arr=[];
	var sql1="SELECT shop,location,name,phone,img FROM shopsFoods where kind='pot'"
	var sql2="SELECT shop,location,name,phone,img FROM shopsFoods where kind='buffet'"
	var sql3="SELECT shop,location,name,phone,img FROM shopsFoods where kind='snack'"
			connection.query(sql1,function(err,result1){
			if(!err){
				arr.push(result1);
				connection.query(sql2,function(err,result2){
			if(!err){
				arr.push(result2);
				connection.query(sql3,function(err,result3){
				if(!err){
				arr.push(result3);
//				console.log(2,arr)
				res.send(arr)
				}})}})}})
})

app.get("/store",function(req,res){
//	console.log(req.query)
	var id=req.query.id
	var sql="SELECT * FROM shopsClothing where id="+id
	connection.query(sql,function(err,result){
		if(!err){
//			console.log(result)
			res.send(result[0])
		}else{
			console.log(err)
		}
	})
})
	
app.get("/goods",function(req,res){
	var id=req.query.id
	var status=req.query.status
//	console.log(req.query)
	var sql="SELECT id,goodsName,abstract,price,img,lastPrice FROM clothinGoods where shopid="+id+" AND kind="+status
//	console.log(sql)
	connection.query(sql,function(err,result){
		if(!err){
			res.send(result)
		}else{
			res.send("error")
		}
	})
})

app.get("/detail",function(req,res){
	var shopid=req.query.shopid;
	var goodsid=req.query.goodsid;
	var sql="SELECT * FROM clothinGoods where id="+goodsid+" AND shopid="+shopid
	connection.query(sql,function(err,result){
		if(!err){
			res.send(result[0])
		}else{
			res.send("error")
		}
	})
})

//请求购物车信息
app.get("/car",function(req,res){
	 var id=req.query.userid
	 connection.query("SELECT userNumber FROM Users where id="+id,function(err,result){
	 	if(!err){
	 		var userNumber=result[0].userNumber
	 		var sql="SELECT * FROM shopCar where userNumber="+userNumber;
	 		connection.query(sql,function(err1,result1){
	 			if(!err1){
	 				var arr=[];
	 				for(var i=0;i<result1.length;i++){
	 					if(arr.indexOf(result1[i].shopid)==-1){
	 						arr.push(result1[i].shopid)
	 					}
	 				}
//	 				console.log(1,arr)
	 				for(let q=0;q<arr.length;q++){
	 					 let obj={}
	 					  connection.query("SELECT shop FROM shopsClothing where id="+arr[q],function(err,result2){
	 					  	if(!err){
	 					  		obj.shopName=result2[0].shop
	 					  		obj.shopid=arr[q]
	 					  		arr[q]=obj
//	 					  		console.log(arr)
								if(q==arr.length-1){
								for(let i=0;i<arr.length;i++){
									arr[i].goods=[];
									connection.query("SELECT * FROM shopCar where shopid="+arr[i].shopid+" AND userNumber="+userNumber,function(err,result3){
										if(!err){
											for(let j=0;j<result3.length;j++){
												let goodsobj={}
												goodsobj.num=result3[j].num
												goodsobj.color=result3[j].color
												goodsobj.size=result3[j].size
												goodsobj.goodid=result3[j].goodsid
												goodsobj.id=result3[j].id
//												console.log(goodsobj)
												arr[i].goods.push(goodsobj)
												connection.query("SELECT price,img,abstract FROM clothinGoods where id="+result3[j].goodsid+" AND shopid="+arr[i].shopid,function(err,result4){
													if(!err){
//														console.log(result4[0])
														arr[i].goods[j].price=result4[0].price
														arr[i].goods[j].img=result4[0].img
														arr[i].goods[j].abstract=result4[0].abstract
													}
													//判断外层循环结束并且内层循环也已经结束
													if(i==arr.length-1&&j==result3.length-1){
														res.send(arr)
													}
												})
											}
										}
									})
								}
								}
	 					  	}
	 					 })
	 				}
	 			}
	 		})
	 	}
	 })
})
app.get("/reduce",function(req,res){
		var shopid=req.query.shopid
		var goodsid=req.query.goodsid

	var sql="SELECT num FROM shopCar where shopid="+shopid+" AND goodsid="+goodsid
	connection.query(sql,function(err,result){
		var num=result[0].num-1
			if(!err){
				var sql1="UPDATE shopCar SET num="+num+" where shopid="+shopid+" AND goodsid="+goodsid
			connection.query(sql1,function(err,result2){
				if(!err){
					res.send("1");
				}
				if(err){
					res.send("error")
				}
			})
			}
			
	})
})
app.get("/add",function(req,res){
		var shopid=req.query.shopid
		var goodsid=req.query.goodsid

	var sql="SELECT num FROM shopCar where shopid="+shopid+" AND goodsid="+goodsid
	connection.query(sql,function(err,result){
		var num=result[0].num+1
			if(!err){
				var sql1="UPDATE shopCar SET num="+num+" where shopid="+shopid+" AND goodsid="+goodsid
			connection.query(sql1,function(err,result2){
				if(!err){
					res.send("1");
				}
				if(err){
					res.send("error")
				}
			})
			}
			
	})
})
app.post("/addCart",function(req,res){
//	console.log(req.body)
	var sql="SELECT userNumber FROM Users where id="+req.body.userid
	connection.query(sql,function(err,result){
		if(!err){
			var sql1="INSERT INTO shopCar(userNumber,shopid,goodsid,num,color,size) VALUES(?,?,?,?,?,?)";
			var value=[result[0].userNumber,req.body.shopid,req.body.goodsid,req.body.num,req.body.color,req.body.size];
			connection.query(sql1,value,function(err,result1){
				if(!err){
					res.send("1")
				}
				if(err){
					console.log(err)
				}
			})
		}
	})
	
})
app.get("/delete",function(req,res){
	var sql="DELETE FROM shopCar WHERE id="+req.query.id
	connection.query(sql,function(err,result){
		if(!err){
			console.log(result)
			res.send("1");
		}else{
			console.log(err)
		}
	})
})
app.get("/address",function(req,res){
	connection.query("SELECT userNumber FROM Users where id="+req.query.userid,function(err,result){
		if(!err){
			var userNumber=result[0].userNumber
			var sql="SELECT * FROM userAddress where userNumber="+userNumber
			connection.query(sql,function(err,result1){
				if(!err){
					res.send(result1);
				}
			})
		}
	})
})
app.post("/addaddr",function(req,res){
//	console.log(req.body.newaddr)
	var obj=req.body.newaddr
connection.query("SELECT userNumber FROM Users where id="+req.body.userid,function(err,result1){
		
		if(!err){
	obj.userNumber=result1[0].userNumber;
	var keyStr="";
	var valueArr=[];
	for(var key in obj){
		keyStr+=key+",";
		valueArr.push(obj[key]);
	}
	keyStr=keyStr.substring(0,keyStr.length-1);
	var  addSql = 'INSERT INTO userAddress('+keyStr+') VALUES(?,?,?,?,?,?,?)';
	connection.query(addSql,valueArr,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }
      res.send(result.insertId+"")

});
}})
})
app.listen(8081,function(){
	console.log("服务器开启成功,欢迎访问易和生活网!请访问:",this.address(),":",this.address().port)
})
