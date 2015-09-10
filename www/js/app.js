angular.module('SolsticeClientList', ['ionic', 'controllersModule','factoriesModule','uiGmapgoogle-maps'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
        url: "/home",
        templateUrl: "pages/home.html",
        resolve:{
          resolvedClients: ['$http', '$stateParams',
            function($http, $stateParams) {
              var url = "https://solstice.applauncher.com/external/contacts.json";
              return $http.get(url)
                .then(function(response) {
                  return response.data;
                },
                function(data) {
                });
            }
          ]

        },
        controller: 'homeCtrl'
      })

      .state('clientDetail', {
        url: "/clientDetail/:clientDetailsURL",
        templateUrl: "pages/clientDetails.html",
        params: {client: null},
        resolve:{
          resolvedClientDetails: ['$http', '$stateParams',
            function($http, $stateParams) {
              var url = $stateParams.clientDetailsURL;
              return $http.get(url)
                .then(function(response) {
                  console.log(response);
                  return response.data;
                },
                function(data) {
                });
            }
          ]

        },
        controller: 'clientDetailCtrl'
      })

      .state('clientLocation', {
        url: "/clientLocation/:latitude:longitude",
        templateUrl: "pages/clientLocation.html",
        controller: 'clientLocationCtrl'
      });

    $urlRouterProvider.otherwise('/home');
  });
