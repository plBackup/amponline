'use strict';

/* Filters */

(function(){
    var ampFilters = ampFilters||angular.module('ampFilters', []);

    ampFilters.filter("numberFormatDefault", ["$filter", function ($filter) {
        return function (number,fractionSize) {

            if (isNaN(number)) {
                return number;
            }

            return $filter("number")(number,fractionSize);
        };
    }]);


    ampFilters.filter("stringFormat", [ function () {
        return function (str,suffix,placeholder) {

            if(str==null||str==""){
                return placeholder;
            }
            return str+suffix;
        };
    }]);
})();

