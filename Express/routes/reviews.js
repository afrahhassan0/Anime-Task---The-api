const expressServer = require('express');
const router = expressServer.Router();
const sql = require('mysql');

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '------',
    database: 'anime-db'
});

connection.connect();

const sqlQueries ={
    getReviewForAnime: 'SELECT review_date, review_body, email FROM reviews r JOIN animes o ON r.anime_id = o.anime_id JOIN users u ON u.user_id = r.user_id WHERE r.anime_id = ?',
}
 

router.get('/:animeid' , (req , res)=>{
    console.log("ok")
    const id = req.params.animeid;
    connection.query( sqlQueries.getReviewForAnime , id , (err , result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});


module.exports = router;