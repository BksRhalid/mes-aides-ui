'use strict';

var mergeDroits = function(prestationsNationales, partenairesLocaux) {

    var droits = _.values(prestationsNationales);
    _.forEach(partenairesLocaux, function(partenaireLocal) {
        droits = droits.concat(_.values(partenaireLocal.prestations));
    });

    droits.sort(function(a, b) {
        return a.label < b.label ? -1 : 1;
    });

    return droits;
};

var controllerOptions = function(templateUrl) {
    return function(TrampolineService) {
        return {
            restrict: 'E',
            templateUrl: templateUrl,
            scope: {
                droits: '=',
                yearMoins2: '=',
            },
            // Inject list into scope, filtered by benefits specified via the "filter" attribute
            link: function (scope, element, attributes) {

                scope.$watch(attributes.droits, function(value) {
                    if (value) {
                        scope.list = mergeDroits(value.prestationsNationales, value.partenairesLocaux);
                    }
                });

                scope.trampoline = TrampolineService;
                scope.isNumber = _.isNumber;
                scope.isString = _.isString;
                scope.list = [];

                // console.log($scope.partenairesLocaux);

                // $scope.droits = mergeDroits($scope.prestationsNationales, $scope.partenairesLocaux); // droits;

                // TODO Implement filtering
                // if ($attributes.hasOwnProperty('filter')) {
                //     var filter = $scope.$eval($attributes.filter);
                //     $scope.list = _.pickBy($scope.$eval($attributes.list), function(value, key) {
                //         return _.includes(filter, key);
                //     });
                // } else {
                //     $scope.list = $scope.$eval($attributes.list);
                // }
            }
        };
    };
};

angular.module('ddsApp')
    .directive('droitEligiblesList', controllerOptions('/partials/droits-eligibles-list.html'));

angular.module('ddsApp')
    .directive('droitEligiblesDetails', controllerOptions('/partials/droits-eligibles-details.html'));

angular.module('ddsApp')
    .directive('droitNonEligiblesList', controllerOptions('/partials/droits-non-eligibles-list.html'));
