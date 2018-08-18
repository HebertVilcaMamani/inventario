var  mysql =require('mysql');
module.exports = {
    venta: function(req, res, next){
      var data = {
        usuario : req.user
      }
      res.render('ventas',{data});
    },

    buscar: function(req,res, next)
    { var input = JSON.parse(JSON.stringify(req.body));
    valor="%"+input.valor+"%";
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query("SELECT a.id,descripcion,codigobarra,FORMAT(precioad,2) as precioad,FORMAT(precio,2) as precio,FORMAT(precioOf,2) as precioOf,stock,photo,estado,presentacion,descripCont,cantCont,marca_id,CatProducto_id,b.nombre as marca FROM producto a INNER JOIN marca b ON b.id=a.marca_id WHERE codigobarra LIKE ? OR descripcion LIKE ?",[valor,valor],function(err,rows){
              if(err) throw err;
              db.end();
              res.json(rows);
            });
        },
}
