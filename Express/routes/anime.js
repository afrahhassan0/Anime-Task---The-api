const expressServer = require('express');
const router = expressServer.Router();
const sql = require('mysql');

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '-------',
    database: 'anime-db'
});


connection.connect((err)=>{
    if (err) throw err;
    else console.log("Connected to mysql...")
})


const sqlQueries = {
    getAllAnime : 'SELECT * FROM animes',
    getAnimeById: 'SELECT * FROM animes WHERE anime_id = ?',
    getLength: 'SELECT anime_id AS max FROM animes ORDER BY anime_id DESC LIMIT 1'
}


router.get('/' , (request, response)=>{
    if(request.query.get == 'length'){
        connection.query(sqlQueries.getLength , (err , res , field)=>{
            if(err) throw err;
            response.send(res[0]);
        })
        return;
    }

    connection.query( sqlQueries.getAllAnime , ( err , res )=>{
        response.send(res);
    })
}); 


// router.get('/' , ( request , response )=>{
    
// });



router.get('/:id' , (req , response)=>{
    connection.query(sqlQueries.getAnimeById , req.params.id , ( err , res , field ) => {
        if(err) throw err;
    
        console.log('sol is '+  res[0]);
        console.log(res[0]);
        response.send(res[0]);
    })    
});


router.post('/' , (req, res)=>{
    // if(error) return res.status(400).send("invalid");

    anime.push( { id: anime.length +1  , name: req.body.name } )   
    res.send(anime[anime.length-1]); 
});


module.exports = router;


const anime=[
    { id:1 , name:"one piece" },
    { id: 2, name:"kimi no nawa" }
];