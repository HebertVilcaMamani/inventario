var  mysql =require('mysql');
module.exports = {
    grafico3: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('grafico3',{data});
    },
                ganancia: function(req,res, next){
                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query("SELECT precioad*stock as resultado1 ,stock,precioad, descripcion FROM producto WHERE descripcion = 'Don Vittorio'", function(err, rows, fields){
                          if(err) throw err;
                          //db.end();
                          res.json(rows)
                        });
                        //console.log("hola")
                    },

                    buscar: function(req,res, next)
                    { var input = JSON.parse(JSON.stringify(req.body));
                    valor="%"+input.valor+"%";
                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query("SELECT a.id,DATE_FORMAT(CURDATE(),'%Y-%m-%d') as fechaac ,DATE_FORMAT(fechVenc,'%Y-%m-%d') as fechVenc ,DATEDIFF (fechVenc,CURDATE()) AS vence ,b.descripcion , a.stock,ubicacion FROM lotes a INNER JOIN producto b ON b.id=a.idproducto WHERE fechVenc  LIKE ? OR descripcion LIKE ?",[valor,valor],function(err,rows){
                              if(err) throw err;
                              db.end();
                              res.json(rows);
                            });
                        },
                        buscar2: function(req,res, next)
                        { var input = JSON.parse(JSON.stringify(req.body));
                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query("SELECT a.id,DATE_FORMAT(CURDATE(),'%Y-%m-%d') as fechaac ,DATE_FORMAT(fechVenc,'%Y-%m-%d') as fechVenc ,DATEDIFF (fechVenc,CURDATE()) AS vence ,b.descripcion , a.stock,ubicacion FROM lotes a INNER JOIN producto b ON b.id=a.idproducto WHERE YEAR(fechVenc) = 2019 or YEAR(fechVenc) = 2021 or YEAR(fechVenc) = 2020 or YEAR(fechVenc) = 2022 ",function(err,rows){
                                  if(err) throw err;
                                  db.end();
                                  res.json(rows);
                                });
                            },
                            buscar3: function(req,res, next)
                            { var input = JSON.parse(JSON.stringify(req.body));
                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query("SELECT a.id,DATE_FORMAT(CURDATE(),'%Y-%m-%d') as fechaac ,DATE_FORMAT(fechVenc,'%Y-%m-%d') as fechVenc ,DATEDIFF (fechVenc,CURDATE()) AS vence ,b.descripcion , a.stock,ubicacion FROM lotes a INNER JOIN producto b ON b.id=a.idproducto WHERE YEAR(fechVenc) = 2018",function(err,rows){
                                      if(err) throw err;
                                      db.end();
                                      res.json(rows);
                                    });
                                },
                                buscar4: function(req,res, next)
                                { var input = JSON.parse(JSON.stringify(req.body));
                                var  config = require('.././database/config');
                                var db = mysql.createConnection(config);
                                db.connect();
                                db.query("SELECT a.id,DATE_FORMAT(CURDATE(),'%Y-%m-%d') as fechaac ,DATE_FORMAT(fechVenc,'%Y-%m-%d') as fechVenc ,DATEDIFF (fechVenc,CURDATE()) AS vence ,b.descripcion , a.stock,ubicacion FROM lotes a INNER JOIN producto b ON b.id=a.idproducto WHERE YEAR(fechVenc) = 2017",function(err,rows){
                                          if(err) throw err;
                                          db.end();
                                          res.json(rows);
                                        });
                                    },
                    ganancia1: function(req,res, next){
                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query("SELECT precioOf*stock as resultado1 , descripcion as descrip1 FROM producto WHERE descripcion = 'Don Vittorio'", function(err, rows, fields){
                              if(err) throw err;
                              //db.end();
                              res.json(rows)
                            });
                            //console.log("hola")
                        },






};
