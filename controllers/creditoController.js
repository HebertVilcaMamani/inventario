var  mysql =require('mysql');
module.exports = {
    credito: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('credito',{data});
    },
    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      fecha:input.fecha,
      hora:input.hora,
      producto:input.producto,
      cantidad:input.cantidad,
      monto:input.monto,
      cliente_id:input.cliente_id,
         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE credito set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },

    guardar: function(req,res, next){
      var data = {
                id: '0',
                fecha:req.body.fecha,
                hora:req.body.hora,
                producto:req.body.producto,
                cantidad:req.body.cantidad,
                monto:req.body.monto,
                cliente_id:req.body.cliente_id,
            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("INSERT INTO credito SET ?" ,data, function(err, rows, fields){
              if(err) throw err;
              db.end();
            });
        },
        cliente: function(req,res, next){

                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('SELECT * FROM cliente', function(err, rows, fields){
                  if(err) throw err;


                  db.end(function(err){
                   if(err) {
                     console.log(err.message);
                     }
                  } );
                });
               res.json(rows)
                //console.log("hola")
            },

            buscar: function(req,res, next)
            { var input = JSON.parse(JSON.stringify(req.body));
            valor="%"+input.valor+"%";
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("SELECT a.id,DATE_FORMAT(fecha,'%Y-%m-%d') as fecha,a.hora,a.producto,a.cantidad,a.monto,a.cliente_id ,b.nombres FROM credito a INNER JOIN cliente b ON a.cliente_id=b.id WHERE nombres LIKE ? OR fecha LIKE ?",[valor,valor],function(err,rows){
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
                db.query('DELETE FROM credito WHERE id = ?',[id],function(err,rows){
                          if(err) throw err;
                          db.end();
                          res.json({'n':1});
                        });
                    },
    }
