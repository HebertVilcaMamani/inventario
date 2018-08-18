var app = angular.module("app", []);
app.controller("frmcliente",   function($scope,$http)
{
	$scope.formData = {};
	$scope.currentPage = 0;
  $scope.pageSize = 10; //  tamño de la Pagina
  $scope.pages = [];

	$scope.reload = function()
{
   location.reload();
}


$scope.configPages = function() {
			$scope.pages.length = 0;
			var ini = $scope.currentPage - 4;
			var fin = $scope.currentPage + 5;
			if (ini < 1) {
				ini = 1;
				if (Math.ceil($scope.encs.length / $scope.pageSize) > 10)
					fin = 10;
				else
					fin = Math.ceil($scope.encs.length / $scope.pageSize);
			} else {
				if (ini >= Math.ceil($scope.encs.length / $scope.pageSize) - 10) {
					ini = Math.ceil($scope.encs.length / $scope.pageSize) - 10;
					fin = Math.ceil($scope.encs.length / $scope.pageSize);
				}
			}
			if (ini < 1) ini = 1;
			for (var i = ini; i <= fin; i++) {
				$scope.pages.push({
					no: i
				});
			}

			if ($scope.currentPage >= $scope.pages.length)
				$scope.currentPage = $scope.pages.length - 1;
		};

		$scope.setPage = function(index) {
			$scope.currentPage = index - 1;
		};

//alertas
function AlertsCtrl($scope, alertsManager) {
    $scope.alerts = alertsManager.alerts;
}

//fin alertas
$scope.submitForm = function (formData) {
	alert('Form submitted with' + JSON.stringify(formData));
};
 var alerta="Datos Guardados Correctamente";
	$scope.guardar=function()
	{	$http.post('.././controllers/clienteController/save',
		{
			'id':$scope.id,
			'dni':$scope.dni,
			'apellidos':$scope.apellidos,
			'nombres':$scope.nombres,
			'fechanac':$scope.fechanac,
			'email':$scope.email,
			'sexo':$scope.sexo,
			'accion':'guardar',
		}).then(function(response)
			{
				alert(alerta);
			});
		}
	$scope.buscar=function()
	{
		$http.post('../controllers/ccliente.php',
		{	'campo':$scope.campo,
			'operador':$scope.operador,
			'valor':$scope.valor,
			'accion':'buscar',
		}).then(function(response)
			{
				$scope.encs=response.data;
			});
	}
$scope.encs=function(id,dni,apellidos,nombres,fechanac,email,sexo)
{
}
	$scope.buscarDNI=function(datos)
	{	$http.post('../controllers/ccliente.php',
		{	'dni':$scope.dni,
			'accion':'buscarDNI',
		}).then(function(response)
		{
		 $scope.id=response.data[0][0];
		 $scope.dni=response.data[0][1];
		 $scope.apellidos=response.data[0][2];
		 $scope.nombres=response.data[0][3];
		 $scope.fechanac=new split(response.data[0][4]);
		 $scope.email=response.data[0][5];
		 $scope.sexo=response.data[0][6];


	 });

	}
	///eliminamos  $scope.removeRow(id);
	$scope.eliminar=function(id)
	{
		$http.post('../controllers/ccliente.php',
		{	'id':id,
			'accion':'eliminar',
		}).then(function(response)
			{
				 $scope.removeRow(id);
				alert(response.data);
			});
		}
	$scope.removeRow = function(id)
{  	var index = -1;
		var comArr = eval($scope.encs);
		for( var i = 0; i < comArr.length; i++ )
	{   if(comArr[i].id === id)
		{    index = i;
						 break;
				}
		}
	if( index === -1 )
			alert("Tienes  Erros de codigo");
	else
			$scope.encs.splice(index, 1);
};
//  fin de la eliminacion
$scope.mostrarDatos1=function(data)
	{	d=data.split(",");
		$scope.id=d[0];
		$scope.dni=d[1];
		$scope.apellidos=d[2];
		$scope.nombres=d[3];
		$scope.fechanac=new Date(d[4]);
		$scope.email=d[5];
		$scope.sexo=d[6];

	};
})
.filter('startFromGrid', function() {
  return function(input,start)
	{
    start = +start;
		if(angular.isArray(input) && input.length > 0) {
             return input.slice(start);
        }
				return input;
  }
});
