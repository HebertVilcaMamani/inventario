




var  mysql =require('mysql');
module.exports = {
    elpatrimonio: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('patrimonio',{data});
    },

    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      descripcion:input.descripcion,
      CODPATRIM:input.CODPATRIM,
      modelo:input.modelo,
      serie:input.serie,
      marca:input.marca,
      persona_id:input.persona_id,
         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE patrimonio set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },

    guardar: function(req,res, next){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
             id: '0',
             descripcion:input.descripcion,
             CODPATRIM:input.CODPATRIM,
             modelo:input.modelo,
             serie:input.serie,
             marca:input.marca,
             persona_id:input.persona_id,

                };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();

            db.query('INSERT INTO patrimonio SET ?' ,data, function(err, rows, fields){
             if(err) throw err;
              db.end();
              res.json(rows);

            });

        },

        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
        valor="%"+input.valor+"%";
        campo=""+input.campo+"";
        operador=""+input.operador+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT a.id,a.persona_id,a.descripcion,a.CODPATRIM,a.modelo,a.serie,a.marca,c.PR_NOMBRE FROM patrimonio a  join persona c on c.id=a.persona_id WHERE '+campo+' '+operador+'  ?',[valor,valor],function(err,rows){
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },

            persona: function(req,res, next){

                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query('SELECT * FROM persona ORDER BY PR_NOMBRE', function(err, rows, fields){
                      if(err) throw err;
                      db.end();
                      //console.log(rows)
                      res.json(rows)
                    });

                    //console.log("hola")
                },

            eliminar: function(req,res, next)
            { var input = JSON.parse(JSON.stringify(req.body));
              id=input.id;
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('DELETE FROM patrimonio WHERE id = ?',[id],function(err,rows){
                      if(req.xhr)
                      db.end();
                      res.json({'n':1});
                    });
                },


};
