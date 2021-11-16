var  mysql =require('mysql');
module.exports = {
    elfarmaco: function(req, res, next){
      var data = {
        usuario : req.user

      }
      res.render('farmaco',{data});
    },

    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
                 FECHA:input.FECHA,
                 HORA:input.HORA,
                 DNI:input.DNI,
                 NOMBRES:input.NOMBRES,
                MEDICACION:input.MEDICACION,
                 MEDICO:input.MEDICO,
                 RESPONSABLE:input.RESPONSABLE,

         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE farmacos set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },
    guardar: function(req,res, next){
      var input = JSON.parse(JSON.stringify(req.body));
      var data = {
                  id: '0',
                 FECHA:input.FECHA,
                 HORA:input.HORA,
                 DNI:input.DNI,
                 NOMBRES:input.NOMBRES,
                MEDICACION:input.MEDICACION,
                 MEDICO:input.MEDICO,
                 RESPONSABLE:input.RESPONSABLE,


            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('INSERT INTO farmacos SET ?' ,data, function(err, rows, fields){
              if(err) throw err;
              console.log("Error Updating : %s ",err );
              db.end();
            });
        },

        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          campo=""+input.campo+"";
        operador=""+input.operador+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM medicos ",[campo],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },



        buscar2: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          campo=""+input.campo+"";
        operador=""+input.operador+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM farmacia ",[campo],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },

             buscar3: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          campo=""+input.campo+"";
         valor="%"+input.valor+"%";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM farmacos WHERE  FECHA = ? AND RESPONSABLE LIKE ? ",[campo,valor],function(err,rows) 
        {
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
            db.query('DELETE FROM formu_patrim WHERE id = ?',[id],function(err,rows){
                      if(req.xhr)
                      db.end();
                      res.json({'n':1});
                    });
                },
 

};
