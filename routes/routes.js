var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/autentificador')
var tempfile = require('tempfile');
var flash = require('connect-flash');



router.get('/', controllers.HomeController.index);
//CRUD  de asistencia
router.get('/asistencia',AuthMiddleware.isLogged,controllers.asistenciaController.laasistencia);
router.post('/buscar/asistencia' , controllers.asistenciaController.buscar);
router.post('/buscar2/asistencia' , controllers.asistenciaController.buscar2);
router.post('/buscar3/asistencia' , controllers.asistenciaController.buscar3);
router.post('/buscar4/asistencia' , controllers.asistenciaController.buscar4);
router.post('/usuarios/back',controllers.principalcontroller.usuarios);

router.get('/registro' , controllers.usercontroller.getSingUp);


router.post('/registro' , controllers.usercontroller.postSingUp);
router.get('/' , controllers.usercontroller.getSingIn);
router.post('/' , passport.authenticate('local',{
  successRedirect :'/asistencia',
  failureRedirect :'/',
  failureFlash : true
})); // estrategia de autentificacion

router.get('/logout', controllers.usercontroller.logout);

/*router.route('/imagenes')
 .get(function(req,res){
   Imagen.find({creator: res.lo})
 })*/

module.exports = router;
