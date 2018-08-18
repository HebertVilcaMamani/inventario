var  mysql =require('mysql');
module.exports = {
    elmonitor: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('monitor',{data});
    },

    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      pulgadas:input.pulgadas,
      Patrimonio_id:input.Patrimonio_id,

         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE monitor set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },

    save: function(req,res, next){
        var input = JSON.parse(JSON.stringify(req.body));
    	var data = {
                id: '0',
                pulgadas:input.pulgadas,
                Patrimonio_id:input.Patrimonio_id,


            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('INSERT INTO monitor SET ?' ,data, function(err, rows, fields){
              if(err) throw err;
              db.end();
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
        db.query("SELECT a.id,a.Patrimonio_id,a.pulgadas,b.CODPATRIM,b.modelo,b.serie,b.marca,c.PR_NOMBRE FROM monitor a join patrimonio b on b.id=a.Patrimonio_id join persona c on c.id=b.persona_id  WHERE "+campo+" "+operador+ "  ?",[valor,valor],function(err,rows){
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },


            patrimonio: function(req,res, next){

                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query('SELECT a.id,a.descripcion,a.CODPATRIM,b.PR_NOMBRE as persona FROM patrimonio a JOIN persona b on b.id=a.persona_id WHERE descripcion LIKE "%MONITOR%"', function(err, rows, fields){
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
            db.query('DELETE FROM monitor WHERE id = ?',[id],function(err,rows){
                      if(req.xhr)
                      db.end();
                      res.json({'n':1});
                    });
                },

};
