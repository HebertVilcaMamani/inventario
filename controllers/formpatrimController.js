var  mysql =require('mysql');

module.exports = {


    elformp: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('formpatrim',{data});
    },

    update: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    id=input.id;
    var data = {
      codigoformato:input.codigoformato,
      fecha:input.fecha,
      formato:input.formato,
      estado:input.estado,
      Patrimonio_id:input.Patrimonio_id,
      persona_id:input.persona_id,
      destino_id:input.destino_id,
         };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE formu_patrim set ? WHERE id = ? ',[data,id],function(err,rows){
              if(err) throw err;

              console.log("Error Updating : %s ",err );
    db.end();
            });
        },

    guardar: function(req,res, next){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
             id: '0',
             codigoformato:input.codigoformato,
             fecha:input.fecha,
             formato:input.formato,
             estado:input.estado,
             Patrimonio_id:input.Patrimonio_id,
             persona_id:input.persona_id,
             destino_id:input.destino_id,
                };
            var  config = require('.././database/config');
            var db = mysql.createConnection(config);
            db.connect();

            db.query('INSERT INTO formu_patrim SET ?' ,data, function(err, rows, fields){
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
        db.query('SELECT a.codigoformato,a.fecha,a.formato,b.CODPATRIM,b.descripcion,b.modelo,b.serie,b.marca,a.estado,c.PR_NOMBRE,c.PR_DEPENDENCIA,c.PR_AMBIENTE,c.PR_CODPLA,d.nombres,d.codigo,d.dependencia,d.ambiente FROM formu_patrim a join patrimonio b on b.id=a.Patrimonio_id join persona c ON c.id=a.persona_id JOIN destino d ON d.id=a.destino_id WHERE '+campo+' '+operador+'  ?',[valor,valor],function(err,rows){
                  if(err) throw err;
                  db.end();
                  res.json(rows);
                 console.log(rows);

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

                patrimonio: function(req,res, next){

                        var  config = require('.././database/config');
                        var db = mysql.createConnection(config);
                        db.connect();
                        db.query('SELECT * FROM patrimonio', function(err, rows, fields){
                          if(err) throw err;
                          db.end();
                          //console.log(rows)
                          res.json(rows)
                        });

                        //console.log("hola")
                    },


                    destino: function(req,res, next){

                            var  config = require('.././database/config');
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query('SELECT * FROM destino', function(err, rows, fields){
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
            db.query('DELETE FROM formu_patrim WHERE id = ?',[id],function(err,rows){
                      if(req.xhr)
                      db.end();
                      res.json({'n':1});
                    });
                },


};
