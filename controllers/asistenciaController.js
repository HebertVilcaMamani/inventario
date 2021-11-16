var  mysql =require('mysql');
module.exports = {
    laasistencia: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('asistencia',{data});
    },

   

        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          dni=""+input.dni+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT  STR_TO_DATE(FECHA, '%d/%m/%Y') as FECHAS , group_concat(distinct HORA_MARCAS SEPARATOR '   ━  ') as Horas FROM reporte WHERE  DNI = ?   GROUP BY 1 ",[dni],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },

             buscar2: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          dni=""+input.dni+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT CODIGO,APELLIDOS_NOMBRES,DNI, TARJETA, STR_TO_DATE(FECHA, '%d/%m/%Y') as FECHAS , HORA_MARCAS, TERMINAL_MARCA, LECTORA, FLAG, SEDE, OFICINA, CARGO   FROM reporte WHERE  DNI = ?  AND  FLAG ='SALIDA' ORDER BY FECHA ASC  ",[dni],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },



             buscar3: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          username=""+input.username+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM usuarios  WHERE username= ? ",[username],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },

   buscar4: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
         dni=""+input.dni+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM reporte  WHERE DNI= ? LIMIT 1",[dni],function(err,rows) 
        {
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                });
            },


 

};
