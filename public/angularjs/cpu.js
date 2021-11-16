
var app = angular.module("app", []);
app.controller("frmcpu",   function($scope,$http)
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
  $scope.guardar=function(){
      id=$scope.id,
      url='/guardado/cpu';
        if (id>0) {
      url='/update/cpu';
         };
      $http.post(url,
    {
      'id':id,
      'num_ip':$scope.num_ip,
      'procesador':$scope.procesador,
      'nummac':$scope.nummac,
      'memram':$scope.memram,
      'capalmac':$scope.capalmac,
      'Patrimonio_id':$scope.Patrimonio_id,
       'accion':'guardar',
    }).then(function(response)
      {

      });
  alert("DATOS GUARDADOS CORRECTAMENTE");
    }
  $scope.buscar=function(myText)
  {
    $http.post('/buscar/cpu',
    {	'campo':$scope.campo,
      'operador':$scope.operador,
      'valor':$scope.valor,
      'accion':'buscar',
    }).then(function(response)
      {
        $scope.encs=response.data;
         $scope.myText = '';
      });
  }


$scope.encs=function(id)
{
}

$scope.patrimonio=function()
{
  $http.post('/patrimonio/cpu',
  {
    'accion':'persona',
  }).then(function(response)
    {
      $scope.init3=response.data;
       console.log($scope.init3);
    });
}

  ///eliminamos  $scope.removeRow(id);
  $scope.eliminar=function(id)
  {$scope.myText = '';
    $http.post('/eliminar/cpu',
    {	'id':id,
      'accion':'eliminar',
    }).then(function(response)
      {
         $scope.removeRow(id);

      },
      function(data) {

        $scope.myText='Elimine el  Ordenador Relacionado a este Registro';

}

    );
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
      alert("Eliminado");
  else
      $scope.encs.splice(index, 1);
};
//  fin de la eliminacion
$scope.mostrarDatos1=function(data)
  {	d=data.split(",");
    $scope.id=d[0];
    $scope.num_ip=d[1];
    $scope.procesador=d[2];
    $scope.nummac=d[3];
    $scope.memram=d[4];
    $scope.capalmac=d[5];
    $scope.Patrimonio_id=d[6];
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
