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
        var sql = `SELECT slika.naziv as NazivSlike, podatki as ImgData, kordinate.naziv as NazivKordinat, Latitude, Longitude FROM slika
        JOIN kordinate ON kordinate.IdKordinate = slika.kordinate_fk`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result[0]));
            res.json(rows)
        });
    }   catch  (err) {
        res.status(500).json(error);
    } 
});


router.post("/", function(req, res) {
    try{
        const nazivslike = req.body.nazivslike;
        const slikadata = req.body.slikadata;
        const nazivlokacije = req.body.nazivlokacije;
        const latitude = req.body.latitude;
        const long = req.body.longitude;
        console.log("dela");
        var sql = `INSERT INTO kordinate (naziv, Latitude, Longitude) VALUES ("${nazivlokacije}","${latitude}","${long}")`;
        //console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            else {

                console.log("dela1")
                var sql = `SELECT LAST_INSERT_ID()`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    else {      
                        console.log("dela2")             
                        var idKordinate = JSON.parse(JSON.stringify(result[0]));
                        console.log(idKordinate['LAST_INSERT_ID']);
                        var sql = `INSERT INTO slika (naziv, podatki, kordinate_fk) VALUES ("${nazivslike}","${slikadata}", "${idKordinate['LAST_INSERT_ID()']}")`;
                        con.query(sql, function (err, result) {
                        if (err) throw err;
                        else {
                            res.json({code: 200, status: true, message: 'Uspesno vnesen'});
                        }});
                    }});
                }});
    }   catch  (err) {
        console.log(err);
        res.status(500).json(error);
    } 
});

module.exports = router;