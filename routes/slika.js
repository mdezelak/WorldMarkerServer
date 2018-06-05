var express = require('express');
var router = express.Router();
var mysql = require('mysql');

 
var con = mysql.createConnection({
    host: "86.61.65.175",
    user: "kolo",
    password: "loko123",
    database: "TVA"
});

con.connect(function(err) {
	if (err) throw err
});


router.get("/", function(req, res) {
    try{
        con.query(`SELECT * FROM slika`, function (err, result, fields) {
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result));
            res.json(rows)
        });
    }   catch  (err) {
        res.status(500).json(error);
    } 
});


router.post("/", function(req, res) {
    try{
        const naziv = req.body.naziv
        const podatki = req.body.podatki
        const idLastnika = 1;
        if (idLastnika == null ) {
            idLastnika = 1; 
        } 
        console.log(idLastnika);
        var sql = `INSERT INTO slika (naziv, podatki, IdUporabnik_FK) VALUES ("${naziv}", "${podatki}", "${idLastnika}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
                res.json({code: 200, status: true, message: 'Uspesno vnesen'});
        });
    }   catch  (err) {
        res.status(500).json(error);
    } 
});

module.exports = router;