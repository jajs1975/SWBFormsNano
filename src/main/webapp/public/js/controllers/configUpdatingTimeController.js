'use strict';

angular.module('controller.configUpdatingTime', ['angular-carousel'])
        .controller('ConfigUpdatingTimeController', function ($scope, Config) {
            $scope.rates = Config.rateUpdate();
            console.log($scope.rates )
            var MSG_CONFIG_UPDATED = "MSG_CONFIG_UPDATED"

            Config.getRateUpdate().then(function (rate) {
                console.log(rate)
                $scope.optionValue = rate;
            }, function (error) {
                Config.saveRateUpdate({rateUpdPubl: {day:$scope.rates[0].day,text: $scope.rates[0].text} } ).then(function (rate) {
                    console.log(rate)
                    $scope.optionValue = rate;
                })
            })


            $scope.saveConfig = function (rate) {
                $scope.optionValue.rateUpdPubl = rate;
                Config.updateRateUpdate($scope.optionValue).then(function (rate) {
                    showMessage("ok", MSG_CONFIG_UPDATED)
                    $scope.optionValue = rate;
                },function(error){
                    console.log(error)
                })
            }

            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");  
                $(this).toggleClass("menu-toggle-off");
                
            });
            checkRezise()
        })