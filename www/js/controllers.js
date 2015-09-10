angular.module('controllersModule', [])

.controller('homeCtrl', function($scope, resolvedClients,$state,$ionicPopup) {

    if(resolvedClients){
      $scope.clients = resolvedClients;
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'You might have lost internet connection. Try again later!'
      });
    }

    $scope.goToDetails = function (client) {
        $state.go('clientDetail',{client:client,clientDetailsURL:client.detailsURL});
    };
})

.controller('clientDetailCtrl', function($scope, $stateParams,$state, resolvedClientDetails,$ionicPopup) {

  if(resolvedClientDetails && $stateParams.client){
    $scope.client = $stateParams.client;
    $scope.clientDetails = resolvedClientDetails;
  }else{
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'You might have lost internet connection. Try again later!'
    });
  }

    $scope.openURL = function (url) {
      var ref = cordova.InAppBrowser.open(url, '_system');
    };

    $scope.rightButtons = [{
      type: 'button-clear',
      content: 'Edit',
      tap: function(e) {}
    }];

  var birthMoment = moment.unix($scope.client.birthdate);
  $scope.clientBirthdate = birthMoment.format("MM/DD/YYYY");

  $scope.goToLocation = function () {
    $state.go('clientLocation',{latitude:$scope.clientDetails.address.latitude,longitude:$scope.clientDetails.address.longitude});
  };

})

.controller('clientLocationCtrl', function($scope, $stateParams) {

  $scope.latitude = $stateParams.latitude;
  $scope.longitude = $stateParams.longitude;

  $scope.map = {
    center: {
      longitude:$scope.longitude,
      latitude:$scope.latitude
    },
    options:{ streetViewControl:false, mapTypeControl:false},
    zoom: 11,
    drag: "true",
    bounds:{}
  };

  $scope.clientLocation = {
    id:272727,
    coords: {
      latitude: $scope.latitude,
      longitude: $scope.longitude
    },
    options: { draggable: false}
  };

});
