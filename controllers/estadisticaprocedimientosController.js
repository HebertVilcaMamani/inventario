var  mysql =require('mysql');
module.exports = {
    estadistica1: function(req, res, next){
      var data = {
        usuario : req.user

      }
      res.render('reporteproce',{data});
    },


        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
        campo=input.campo;
       operador=input.operador;
         serv=""+input.serv+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT procedimiento , COUNT(*) as total FROM procedimientos WHERE servicio= ? AND estado_registro !='ELIMINADO' AND fecha BETWEEN  ?  AND ?   GROUP BY procedimiento",[serv,campo,operador],function(err,rows) 
        {  if(err) throw err;
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
};
