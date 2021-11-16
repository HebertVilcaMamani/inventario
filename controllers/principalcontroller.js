var  mysql =require('mysql');
module.exports = {
    backend: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('principal',{data});
      //console.log(req.user)
    },
    cliente: function(req,res, next){

            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('SELECT COUNT(id) as total FROM cliente', function(err, rows, fields){
                if(req.xhr)
              //db.end();

              res.json(rows)
            });

            //console.log("hola")
        },
        proveedor: function(req,res, next){

                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('SELECT COUNT(id) as total FROM proveedor', function(err, rows, fields){
                    if(req.xhr)
                  //db.end();

                  res.json(rows)
                });
                //console.log("hola")
            },
            ordenador: function(req,res, next){

                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query('SELECT COUNT(id) as total FROM producto', function(err, rows, fields){
                        if(req.xhr)
                      //db.end();

                      res.json(rows)
                    });

                    //console.log("hola")
                },

                usuarios: function(req,res, next){

                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query('SELECT COUNT(id) as total FROM cpu UNION ALL SELECT COUNT(id) as total FROM monitor UNION ALL SELECT COUNT(id) as total FROM teclado UNION ALL SELECT count(id) as total  FROM patrimonio UNION ALL SELECT COUNT(id)  as total FROM persona', function(err, rows, fields){

                          db.end();

                          res.json(rows)
                        });
                    },
                    credito: function(req,res, next){

                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query('SELECT COUNT(id) as total FROM credito', function(err, rows, fields){
                                if(req.xhr)
                              //db.end();

                              res.json(rows)
                            });
                           //console.log("hola")
                        },
                        operadores: function(req,res, next){

                                var  config = require('.././database/config');
                                var db = mysql.createConnection(config);
                                db.connect();
                                db.query('SELECT COUNT(id) as total FROM operadores', function(err, rows, fields){
                                  if(req.xhr)
                                  //db.end();

                                  res.json(rows)
                                });
                                //console.log("hola")
                            },
                            recargas: function(req,res, next){

                                    var  config = require('.././database/config');
                                    var db = mysql.createConnection(config);
                                    db.connect();
                                    db.query('SELECT COUNT(id) as total FROM recargavirtual', function(err, rows, fields){
                                      if(req.xhr)

                                      db.end();

                                      res.json(rows)
                                    });
                                    //console.log("hola")
                                },
                                marcas: function(req,res, next){

                                        var  config = require('.././database/config');
                                        var db = mysql.createConnection(config);
                                        db.connect();
                                        db.query('SELECT COUNT(id) as total FROM marca', function(err, rows, fields){
                                            if(req.xhr)
                                          //db.end();

                                          res.json(rows)
                                        });
                                        //console.log("hola")
                                    },
                                    categorias: function(req,res, next){

                                            var  config = require('.././database/config');
                                            var db = mysql.createConnection(config);
                                            db.connect();
                                            db.query('SELECT COUNT(id) as total FROM cateogoriaproducto', function(err, rows, fields){
                                              if(req.xhr)
                                              //db.end();

                                              res.json(rows)
                                            });
                                            //console.log("hola")
                                        },
}
