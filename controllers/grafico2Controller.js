var  mysql =require('mysql');
module.exports = {
    grafico2: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('grafico2',{data});
    },
                ganancia: function(req,res, next){
                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query("SELECT precioOf*stock as resultado1 ,precioad*stock as resultado2, descripcion as descrip1 ,(precioOf-precioad)*stock as total FROM producto WHERE descripcion = 'Don Vittorio'", function(err, rows, fields){
                          if(err) throw err;
                          //db.end();
                          res.json(rows)
                        });
                        //console.log("hola")
                    },

                    buscar: function(req,res, next){
                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query("SELECT precioad*stock as resultado1,precioOf*stock as resultado2,stock,precioad, descripcion FROM producto ", function(err, rows, fields){
                              if(err) throw err;
                              //db.end();
                              res.json(rows)
                            });
                            //console.log("hola")
                        },
                    ganancia1: function(req,res, next){
                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query("SELECT precioOf*stock as resultado1 ,precioad*stock as resultado2, descripcion as descrip1 ,(precioOf-precioad)*stock as total FROM producto WHERE descripcion = 'Don Vittorio'", function(err, rows, fields){
                              if(err) throw err;
                              //db.end();
                              res.json(rows)
                            });
                            //console.log("hola")
                        },






};
