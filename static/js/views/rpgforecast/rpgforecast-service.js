/**
 * Created by whobird on 17/2/22.
 */
angular.module('dataSet').service('rpgForecastService', ["$rootScope","$http",function($rootScope,$http) {

    var service = {
        getData: function () {
            return $http.get('../data/'+'forecast.json', {cache: false}).then(function (res) {
                return res.data;
            });
        },
    };
    return service;

}]);