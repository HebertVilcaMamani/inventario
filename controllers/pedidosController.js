var  mysql =require('mysql');
module.exports = {
    pedidos: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('pedidos',{data});
    },

    guardar: function(req,res, next){
      var data = {
                id: '0',
                fecha:req.body.fecha,
                hora:req.body.hora,
                usuarios_id:req.body.usuarios_id,
                proveedor_id:req.body.proveedor_id,
            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("INSERT INTO pedidos SET ?" ,data, function(err, rows, fields){
              if(err) throw err;
              db.end();
            });
        },
        usuarios: function(req,res, next){

                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('SELECT * FROM usuarios', function(err, rows, fields){
                  if(err) throw err;
                  //db.end();
                  //console.log(rows)
                  res.json(rows)
                });

                //console.log("hola")
            },
            proveedor: function(req,res, next){

                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query('SELECT * FROM proveedor', function(err, rows, fields){
                      if(err) throw err;
                      //db.end();
                      //console.log(rows)
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
            db.query("SELECT id,DATE_FORMAT(fecha,'%Y-%m-%d') as fecha,hora,usuarios_id,proveedor_id  FROM pedidos WHERE fecha LIKE ? OR hora LIKE ?",[valor,valor],function(err,rows){
                      if(err) throw err;
                      db.end();
                      res.json(rows);
                    });
                },

                eliminar: function(req,res, next)
                { var input = JSON.parse(JSON.stringify(req.body));
                  id=input.id;
                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('DELETE FROM pedidos WHERE id = ?',[id],function(err,rows){
                          if(err) throw err;
                          db.end();
                          res.json({'n':1});
                        });
                    },
    }
