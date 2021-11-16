var  mysql =require('mysql');
var  bcrypt =require('bcryptjs');
module.exports = {
  getSingUp :function(req,res, next){
    return res.render('users/signin');
  },

  postSingUp :function(req,res, next){
    var salt =bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password, salt);

    var user = {
        nombre : req.body.nombre,
        username : req.body.username,
        password :password,
        TipoUsuario : req.body.TipoUsuario,
        telefono : req.body.telefono
    };
    var  config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('INSERT INTO usuarios SET ?' ,user, function(err, rows, fields){
      if(err) throw err;
      db.end();
    });
    req.flash('info', 'Se ha registrado correctamente, ya puedes  iniciar sesion')
    return res.redirect('/') ;
  },

  getSingIn: function(req,res,next) {
  	return res.render('/', {message: req.flash('info'), authmessage : req.flash('authmessage')});
  },
  logout: function(req, res, next){
    req.logout();
    res.redirect('/');
  }
};
