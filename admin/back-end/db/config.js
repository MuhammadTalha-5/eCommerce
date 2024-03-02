const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pakshopnow',
    typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          return field.string() === '1'; // 1 for true, 0 for false
        }
        return next();
      },
});

con.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected");
    }

});

module.exports = con;