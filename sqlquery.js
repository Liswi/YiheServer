var connection=require('./mysqlConnect.js')
//查所有
exports.sqlALL=function(){
	var sqlAll='SELECT * FROM Users'
	connection.query(sqlAll,function(err,result){
	if(err){
		console.log('SELECT ERROR -',err.message);
		return;
	}
	console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');
})
}
exports.addsql=function(obj){
	//增
	var keyStr="";
	var valueArr=[];
	for(var key in obj){
		keyStr+=key+",";
		valueArr.push(obj[key]);
	}
	keyStr=keyStr.substring(0,keyStr.length-1);
	var  addSql = 'INSERT INTO Users('+keyStr+') VALUES(?,?)';
	connection.query(addSql,valueArr,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
   
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
}
exports.delete=function(id){
	var delSql = 'DELETE FROM Users where id='+id;
//删
	connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
   
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
	});
 
}
