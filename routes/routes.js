var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/autentificador')
var tempfile = require('tempfile');
var officegen = require('officegen');
var docx = officegen('docx');


router.get('/', controllers.HomeController.index);


router.get('/backend',AuthMiddleware.isLogged ,controllers.principalcontroller.backend);
//router.post('/cliente/back',controllers.principalcontroller.cliente);
//router.post('/proveedor/back',controllers.principalcontroller.proveedor);
//router.post('/ordenador/back',controllers.principalcontroller.ordenador);
router.post('/usuarios/back',controllers.principalcontroller.usuarios);
//router.post('/credito/back',controllers.principalcontroller.credito);
//router.post('/operadores/back',controllers.principalcontroller.operadores);
//router.post('/recargas/back',controllers.principalcontroller.recargas);
//router.post('/marcas/back',controllers.principalcontroller.marcas);
//router.post('/categoria/back',controllers.principalcontroller.categorias);
router.get('/registro' , controllers.usercontroller.getSingUp);

//CPU
router.get('/cpu',AuthMiddleware.isLogged , controllers.cpuController.elcpu);
router.post('/guardado/cpu' , controllers.cpuController.guardar);
router.post('/buscar/cpu' , controllers.cpuController.buscar);
router.post('/eliminar/cpu' , controllers.cpuController.eliminar);
router.post('/update/cpu', controllers.cpuController.update);
router.get('/docx', function(req, res){
    var tempFilePath = tempfile('.docx');
    docx.setDocSubject ( 'testDoc Subject' );
    docx.setDocKeywords ( 'keywords' );
    docx.setDescription ( 'test description' );

    var pObj = docx.createP({align: 'center'});
    pObj.addText('Hola Hum', {bold: true, underline: true});
    docx.on('finalize', function(written) {
        console.log('Finish to create Word file.\nTotal bytes created: ' + written + '\n');
    });
    docx.on('error', function(err) {
        console.log(err);
    });

   res.writeHead ( 200, {
    "Content-Type": "application/vnd.openxmlformats-officedocument.documentml.document",
    'Content-disposition': 'attachment; filename=testdoc.docx'
    });
    docx.generate(res);
});

//  FORANEA CPU
router.post('/patrimonio/cpu' , controllers.cpuController.patrimonio);

//MONITOR
router.get('/monitor',AuthMiddleware.isLogged , controllers.monitorController.elmonitor);
router.post('/guardado/monitor' , controllers.monitorController.save);
router.post('/buscar/monitor' , controllers.monitorController.buscar);
router.post('/eliminar/monitor' , controllers.monitorController.eliminar);
router.post('/update/monitor', controllers.monitorController.update);


//  FORANEA MONITOR
router.post('/patrimonio/monitor' , controllers.monitorController.patrimonio);

//CRUD PEDIDOS
router.get('/pedidos',AuthMiddleware.isLogged,controllers.pedidosController.pedidos);
router.post('/guardado/pedidos' , controllers.pedidosController.guardar);
router.post('/buscar/pedidos' , controllers.pedidosController.buscar);
router.post('/eliminar/pedidos' , controllers.pedidosController.eliminar);
router.post('/usuarios/pedidos' , controllers.pedidosController.usuarios);

//teclado
router.get('/teclado',AuthMiddleware.isLogged , controllers.tecladoController.elteclado);
router.post('/guardado/teclado' , controllers.tecladoController.save);
router.post('/buscar/teclado' , controllers.tecladoController.buscar);
router.post('/eliminar/teclado' , controllers.tecladoController.eliminar);
router.post('/update/teclado', controllers.tecladoController.update);


//  FORANEA MONITOR
router.post('/patrimonio/teclado' , controllers.tecladoController.patrimonio);


//CRUD DEL  CLIENTE
router.get('/cliente',AuthMiddleware.isLogged ,controllers.clienteController.elcliente);
router.post('/guardado/cliente' , controllers.clienteController.save);
router.post('/buscar/cliente' , controllers.clienteController.buscar);
router.post('/eliminar/cliente' , controllers.clienteController.eliminar);
router.post('/buscarDNI/cliente' , controllers.clienteController.buscarDNI);
router.post('/update/cliente' , controllers.clienteController.update);
//CRUD DEL  PATRIMONIO
router.get('/patrimonio',AuthMiddleware.isLogged,controllers.patrimonioController.elpatrimonio);
router.post('/guardado/patrimonio' , controllers.patrimonioController.guardar);
router.post('/buscar/patrimonio' , controllers.patrimonioController.buscar)
router.post('/eliminar/patrimonio' , controllers.patrimonioController.eliminar);
router.post('/update/patrimonio' , controllers.patrimonioController.update);
router.post('/persona/patrimonio' , controllers.patrimonioController.persona)


//CRUD DEL  FORMULARIO PATRIMONIO DETALLADO
router.get('/formpatrim',AuthMiddleware.isLogged,controllers.formpatrimController.elformp);
router.post('/guardado/formpatrim' , controllers.formpatrimController.guardar);
router.post('/buscar/formpatrim' , controllers.formpatrimController.buscar)
router.post('/eliminar/formpatrim' , controllers.formpatrimController.eliminar);
router.post('/update/formpatrim' , controllers.formpatrimController.update);


//FORANEO FORMULARIO FORMATO PATRIMONIO
router.post('/persona/formpatrim' , controllers.formpatrimController.persona);
router.post('/patrimonio/formpatrim' , controllers.formpatrimController.patrimonio);
router.post('/destino/formpatrim' , controllers.formpatrimController.destino);


//CRUD  DEL ORDENADOR
router.get('/ordenador',AuthMiddleware.isLogged,controllers.ordenadorController.elordenador);
router.post('/guardado/ordenador' , controllers.ordenadorController.guardar);
router.post('/buscar/ordenador' , controllers.ordenadorController.buscar);
router.post('/eliminar/ordenador' , controllers.ordenadorController.eliminar);
router.post('/getbuscar/ordenador' , controllers.ordenadorController.getbuscar);
router.post('/update/ordenador', controllers.ordenadorController.update);
//  FORANEA ORDENADOR
router.post('/getmarca/ordenador' , controllers.ordenadorController.getmarcas);
router.post('/categoria/ordenador' , controllers.ordenadorController.categoria);
router.post('/monitor/ordenador' , controllers.ordenadorController.monitor);
router.post('/usuario/ordenador' , controllers.ordenadorController.usuario);


//CRUD credito
router.get('/credito',AuthMiddleware.isLogged,controllers.creditoController.credito);
router.post('/guardado/credito' , controllers.creditoController.guardar);
router.post('/buscar/credito' , controllers.creditoController.buscar);
router.post('/eliminar/credito' , controllers.creditoController.eliminar);
router.post('/update/credito' , controllers.creditoController.update);
//  FORANEA credito
router.post('/getcliente/credito' , controllers.creditoController.cliente);

//CRUD Operadores
router.get('/operador',AuthMiddleware.isLogged,controllers.operadorController.opera);
router.post('/guardado/operador' , controllers.operadorController.guardar);
router.post('/buscar/operador' , controllers.operadorController.buscar);
router.post('/eliminar/operador' , controllers.operadorController.eliminar);
router.post('/update/operador' , controllers.operadorController.update);




//graficos
router.get('/graficos' , controllers.graficosController.grafico);
router.post('/graficos/descrip' , controllers.graficosController.descrip);

//graficos2
router.get('/graficos2' , controllers.grafico2Controller.grafico2);
router.post('/graficos2/ganancia' , controllers.grafico2Controller.ganancia);
router.post('/graficos2/buscar' , controllers.grafico2Controller.buscar);
//graficos3
router.get('/graficos3' , controllers.grafico3Controller.grafico3);
router.post('/graficos3/ganancia' , controllers.grafico3Controller.ganancia);
router.post('/graficos3/buscar' , controllers.grafico3Controller.buscar);
router.post('/graficos3/buscar2' , controllers.grafico3Controller.buscar2);
router.post('/graficos3/buscar3' , controllers.grafico3Controller.buscar3);
router.post('/graficos3/buscar4' , controllers.grafico3Controller.buscar4);

router.post('/registro' , controllers.usercontroller.postSingUp);
router.get('/' , controllers.usercontroller.getSingIn);
router.post('/' , passport.authenticate('local',{
  successRedirect :'/backend',
  failureRedirect :'/',
  failureFlash : true
})); // estrategia de autentificacion

router.get('/logout', controllers.usercontroller.logout);

/*router.route('/imagenes')
 .get(function(req,res){
   Imagen.find({creator: res.lo})
 })*/

module.exports = router;
