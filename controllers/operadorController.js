var  mysql =require('mysql');
module.exports = {
    opera: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('operador',{data});
    },
    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      operadore:req.body.operadore,
      preventista:req.body.preventista,
      celular:req.body.celular,
      photo:req.body.photo,
         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE operadores set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },

    guardar: function(req,res, next){
      var data = {
                id: '0',
                operadore:req.body.operadore,
                preventista:req.body.preventista,
                celular:req.body.celular,
                photo:req.body.photo,
            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("INSERT INTO operadores SET ?" ,data, function(err, rows, fields){
              if(err) throw err;
              db.end();
            });
          req.flash('info', 'Se ha registrado correctamente, ya puedes  iniciar sesion')
          return res.redirect('/');
        },

            buscar: function(req,res, next)
            { var input = JSON.parse(JSON.stringify(req.body));
            valor="%"+input.valor+"%";
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("SELECT * FROM operadores WHERE operadore LIKE ? OR preventista LIKE ?",[valor,valor],function(err,rows){
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
                db.query('DELETE FROM operadores WHERE id = ?',[id],function(err,rows){
                          if(req.xhr)
                          db.end();
                          res.json({'n':1});
                        });
                    },
    }
