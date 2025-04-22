//set up database 
const { Pool } = require("pg");

const pool=new Pool({
    user:"postgres",
    password:"kraken",
    host:"localhost",
    port:5432,
    database:"Lan prime"
})


//check connection with database
pool.connect((err,res)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }
})


module.exports=pool;
