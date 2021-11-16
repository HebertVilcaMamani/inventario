var  mysql =require('mysql');
module.exports = {
    elprocedimiento2: function(req, res, next){
      var data = {
        usuario : req.user

      }
      res.render('procedimiento',{data});
    },

    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
  
      nombres:input.nombres,
      dni:input.dni,
      procedimiento:input.procedimiento,
      servicio:input.servicio,
      enfermera:input.enfermera,
        cantidad:input.cantidad,
        estado_registro:input.estado_registro,
         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE procedimientosneo set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },
    guardar: function(req,res, next){
      var input = JSON.parse(JSON.stringify(req.body));
      var data = {
                  id: '0',
                 fecha:input.fecha,
                 nombres:input.nombres,
                 dni:input.dni,
                 procedimiento:input.procedimiento,
                    cantidad:input.cantidad,
                 servicio:input.servicio,
                 enfermera:input.enfermera,
                 estado_registro:input.estado_registro,
            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('INSERT INTO procedimientosneo SET ?' ,data, function(err, rows, fields){
              if(err) throw err;
              console.log("Error Updating : %s ",err );
              db.end();
            });
        },

        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
          campo=""+input.campo+"";
        operador=""+input.operador+"";
         valor="%"+input.valor+"%";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query("SELECT * FROM procedimientosneo WHERE   fecha = ? AND dni LIKE ?  AND  estado_registro !='ELIMINADO' ",[campo,valor],function(err,rows) 
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



        

};
