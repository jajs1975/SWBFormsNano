'use strict';

angular.module('controller.configGen', [])

        .controller('ConfigGenController', function ($scope, $stateParams, Gene, Alteration, CancerType, Gene_Cancer) {
            $scope.geneSelected = false;
            $scope.geneList = [];
            $scope.geneId;
            $scope.altList = [];
            $scope.cancerList = [];

            var altIndex;
            var disIndex;

            $scope.addingGen = false;
            $scope.addingAlt = false;
            $scope.addingDisease = false;
            $scope.editingAlt = false;
            $scope.editingDisease = false;

            $scope.cancelGen = function () {
                $scope.addingGen = false;
            }

            $scope.addAlt = function () {
                $scope.cancelAlt()
                $scope.addingAlt = true;
            }
            $scope.cancelAlt = function () {
                $scope.addingAlt = false;
                $scope.editingAlt = false;
                $scope.alterationName = ""
                $scope.aliase = "";
            }
            $scope.editAlt = function (alt) {
                $scope.editingAlt = true;
                $scope.addingAlt = false;
                $scope.alterationName = alt.name
                $scope.aliase = alt.aliases;
                $scope.altList.forEach(function (a, i) {
                    if (a._id == alt._id) {
                        altIndex = i;
                    }
                })
            }

            $scope.addDis = function () {
                   $scope.cancerDis();
                $scope.addingDisease = true;


            }
            $scope.cancerDis = function () {
                $scope.addingDisease = false;
                $scope.editingDisease = false;
                $scope.dideaseName = ""
                $scope.diseaseSummary = "";
            }
            $scope.editDisease = function (dis) {
                $scope.editingDisease = true;
                $scope.addingDisease = false;
                $scope.dideaseName = dis.name
                $scope.diseaseSummary = dis.summary;
                $scope.cancerList.forEach(function (c, i) {
                    if (c._id == dis._id) {
                        disIndex = i;
                    }
                })
            }

            $scope.addGene = function (geneSymbol) {
                Gene.save({symbol: geneSymbol}).then(function (newGene) {
                    $scope.geneList.push(newGene);
                }, function (error) {
                    console.log(error);
                })
            }

            $scope.addAlteration = function (alterationName, aliase) {
                Alteration.save({gene: $scope.geneId, name: alterationName, aliases: aliase}).then(function (newAlt) {
                    $scope.altList.push(newAlt);
                    $scope.cancelAlt();
                }, function (error) {
                    console.log(error);
                })

            }
            $scope.updateAlteration = function (alterationName, aliase) {
                $scope.altList[altIndex].name = alterationName;
                $scope.altList[altIndex].aliases = aliase;

                Alteration.update($scope.altList[altIndex]).then(function (newAlt) {
                    $scope.cancelAlt();
                }, function (error) {
                    console.log(error);
                })
            }

            $scope.addDisease = function (dideaseName, diseaseSummary) {
                CancerType.save({name: dideaseName, summary: diseaseSummary}).then(function (newCancer) {
                    Gene_Cancer.save({gene: $scope.geneId, cancer: newCancer._id}).then(function (newGeneCancer) {
                        $scope.cancerList.push(newCancer);
                        $scope.cancerDis();
                    })
                })
            }

            $scope.updateDisease = function (dideaseName, diseaseSummary) {
                $scope.cancerList[disIndex].name = dideaseName;
                $scope.cancerList[disIndex].summary = diseaseSummary;
                CancerType.update( $scope.cancerList[disIndex] ).then(function (newCancer) {
                        $scope.cancerDis();
                })
            }


            $scope.setGenId = function (geneId) {
                $scope.geneSelected = true;
                $scope.geneId = geneId;
                Alteration.list($scope.geneId).then(function (altList) {
                    $scope.altList = altList;
                }, function (error) {
                    console.log(error)
                })
                CancerType.listByGenId($scope.geneId).then(function (cancerList) {
                    $scope.cancerList = cancerList;
                    console.log($scope.cancerList);
                }, function (error) {
                    console.log(error)
                })
            }

            Gene.list().then(function (geneList) {
                $scope.geneList = geneList;
                console.log($scope.geneList)
            })

        })