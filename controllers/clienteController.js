var  mysql =require('mysql');
module.exports = {
    elcliente: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('cliente',{data});
    },
    save: function(req,res, next){
    	var data = {
                id: '0',
                dni:req.body.dni,
                apellidos:req.body.apellidos,
                nombres:req.body.nombres,
                fechanac:req.body.fechanac,
                email:req.body.email,
                sexo:req.body.sexo
            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('INSERT INTO cliente SET ?' ,data, function(err, rows, fields){
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
        db.query("SELECT id,dni,apellidos,nombres,DATE_FORMAT(fechanac,'%Y-%m-%d') as fechanac,email,sexo FROM cliente WHERE dni LIKE ? OR nombres LIKE ?",[valor,valor],function(err,rows){
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },


            buscarDNI: function(req, res)
{ var input = JSON.parse(JSON.stringify(req.body));
   valor="%"+input.valor+"%";
   var  config = require('.././database/config');
   var db = mysql.createConnection(config);
     db.connect();
   db.query("SELECT * FROM cliente WHERE dni = ?",valor,function(err,rows)
       {if(err)throw err;
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
            db.query('DELETE FROM cliente WHERE id = ?',[id],function(err,rows){
                      if(req.xhr)
                       db.end();
                    res.json({'n':1});
                    });
                },

                update: function(req,res, next)
                { var input = JSON.parse(JSON.stringify(req.body));
                id=input.id;
                var data = {
            dni: input.dni,
          apellidos:input.apellidos,
          nombres:input.nombres,
          fechanac:input.fechanac,
          email:input.email,
          sexo:input.sexo,
                     };
                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('UPDATE cliente set ? WHERE id = ? ',[data,id],function(err,rows){
                          if(err) throw err;

                          console.log("Error Updating : %s ",err );
                db.end();
                        });
                    },



};
