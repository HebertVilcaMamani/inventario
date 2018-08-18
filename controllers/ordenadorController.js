var  mysql =require('mysql');
     //user = require('')
module.exports = {
    elordenador: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('ordenador',{data});
    },
    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      redasis:input.redasis,
     casisten:input.casisten,
     departam:input.departam,
     servicio:input.servicio,
     area:input.area,
     fecha:input.fecha,
     cpu_id:input.cpu_id,
     teclado_id:input.teclado_id,
     monitor_id:input.monitor_id,
     sisop:input.sisop,
     ofimatica:input.ofimatica,
     sophos:input.sophos,
     observ:input.observ,
     persona_id:input.persona_id,


         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE ordenador set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },
    guardar: function(req,res, next){
      var input = JSON.parse(JSON.stringify(req.body));
    	var data = {
                id: '0',
       redasis:input.redasis,
      casisten:input.casisten,
      departam:input.departam,
      servicio:input.servicio,
      area:input.area,
      fecha:input.fecha,
      cpu_id:input.cpu_id,
      teclado_id:input.teclado_id,
      monitor_id:input.monitor_id,
      sisop:input.sisop,
      ofimatica:input.ofimatica,
      sophos:input.sophos,
      observ:input.observ,
      persona_id:input.persona_id,


            };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query('INSERT INTO ordenador SET ?' ,data, function(err, rows, fields){
              if(err) throw err;
              db.end(function(err){
               if(err) {
                 console.log(err.message);
                 }
              } );

            });
        },

        getmarcas: function(req,res, next){

                var  config = require('.././database/config');
                var db = mysql.createConnection(config);
                db.connect();
                db.query('SELECT a.id,b.CODPATRIM,b.descripcion FROM cpu a join patrimonio b on b.id=a.Patrimonio_id', function(err, rows, fields){
                  if(err) throw err;
                  db.end(function(err){
                   if(err) {
                     console.log(err.message);
                     }
                  } );
                    res.json(rows)
                });

                //console.log("hola")
            },

            categoria: function(req,res, next){

                    var  config = require('.././database/config');
                    var db = mysql.createConnection(config);
                    db.connect();
                    db.query('SELECT a.id,b.CODPATRIM,b.descripcion FROM teclado a join patrimonio b on b.id=a.Patrimonio_id', function(err, rows, fields){
                      if(err) throw err;
                      db.end();
                      //console.log(rows)
                      res.json(rows)
                    });

                    //console.log("hola")
                },
                monitor: function(req,res, next){

                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query('SELECT a.id,b.CODPATRIM,b.descripcion FROM monitor a join patrimonio b on b.id=a.Patrimonio_id', function(err, rows, fields){
                          if(err) throw err;
                          db.end();
                          //console.log(rows)
                          res.json(rows)
                        });

                        //console.log("hola")
                    },
                    usuario: function(req,res, next){

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

        buscar: function(req,res, next)
        { var input = JSON.parse(JSON.stringify(req.body));
        valor="%"+input.valor+"%";
        campo=""+input.campo+"";
        operador=""+input.operador+"";
        var  config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT a.id,e.PR_NOMBRE as usuario,e.PR_CODPLA as planilla,a.cpu_id,a.teclado_id,a.monitor_id,a.persona_id,a.fecha ,a.redasis,a.casisten,a.departam,a.area,a.sisop,a.ofimatica,a.sophos,a.observ,a.servicio,elcpu.CODPATRIM as cpupatrim , elcpu.modelo as modelo, elcpu.serie as serie ,elcpu.marca as marca,b.num_ip,b.procesador,b.nummac,b.memram,b.capalmac,c.pulgadas,elmonitor.CODPATRIM as patrimmonitor ,elmonitor.modelo as modelomonitor, elmonitor.serie seriemonitor,elmonitor.marca as monitormarca,elteclado.CODPATRIM as patrimteclado,elteclado.modelo as modelteclado,elteclado.serie as serieteclado,elteclado.marca as marcateclado FROM ordenador a JOIN cpu b on b.id=a.cpu_id JOIN patrimonio elcpu on elcpu.id=b.Patrimonio_id JOIN monitor c on c.id=a.monitor_id join patrimonio elmonitor on elmonitor.id=c.Patrimonio_id join teclado d on d.id=a.teclado_id JOIN patrimonio elteclado on elteclado.id=d.Patrimonio_id  join persona e on e.id=a.persona_id   WHERE '+campo+' '+operador+'  ? ' ,[valor,valor],function(err,rows){
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                console.log(rows);

                });
              //  console.log(db);
            },
            getbuscar: function(req,res, next)
            { var input = JSON.parse(JSON.stringify(req.body));
            valor="%"+input.valor+"%";
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();
            db.query("SELECT* FROM ordenador WHERE area LIKE ? OR cpu_id LIKE ?",[valor,valor],function(err,rows){
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
      db.query('DELETE FROM ordenador WHERE id = ?',[id],function(err,rows){
                    if(req.xhr)
                      db.end();
                      res.json({'n':1});
                    });
                },

};
