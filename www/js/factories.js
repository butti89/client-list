var factoriesModule = angular.module('factoriesModule', []);

factoriesModule.factory('ClientFactory', function ($http) {
    var factory = {};

    factory.getClients = function(){
        var clients = [];

        $http.get("https://solstice.applauncher.com/external/contacts.json")
            .success(function(response) {
                clients = response;

                return clients;}
        );
    };

    return factory;
});
