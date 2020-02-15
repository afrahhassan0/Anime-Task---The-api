const config = require('config')
const _ = require('lodash');
const expressServer = require('express');
const router = expressServer.Router();
const sql = require('mysql');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Impal@67',
    database: 'anime-db'
});

connection.connect();

const sqlQueries ={
    getUserByEmail: "SELECT * FROM users WHERE email=?",
    registerUser: "INSERT INTO users SET ?"
}
 

router.post('/register' , (req , res)=>{
    let cred =  _.pick( req.body , [ 'password' , 'email' , 'gender' ] )
    let userInformation = new User( cred.password , cred.email , cred.gender );
    console.log(userInformation);
    
    connection.query( sqlQueries.registerUser , userInformation , (error , postResult )=>{ 
        if (error) throw error;

        userInformation.user_id = postResult.insertId;

        const token = jwt.sign( { id: postResult.insertId }, 'otaku!' )

        res.send( { auth: token , ...userInformation} );
    })
});


router.post('/login' , (req , res)=>{

    connection.query( sqlQueries.getUserByEmail , req.body.email , (err , result)=>{
        if(err) throw err;
        console.log(result[0])
        if( (result[0] && result[0].password != req.body.password ) || !result[0]) return res.status(400).send({ error: "Incorrect Credentials" });

        //should be in an environemt variable
        const token = jwt.sign({ id: result[0].user_id } , 'otaku!' )

        return res.header( 'x-auth-token' , token).send({ auth : token });
    });
})


module.exports = router;