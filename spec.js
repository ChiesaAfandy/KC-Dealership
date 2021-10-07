// var app = angular.module("myModule", []);
// app.controller("myController", function ($scope) {
//   $scope.specs = [
//     { "Car": "Mitsubishi Lancer Evo X", "Engine": "2.0 Turbocharged l4", "BHP": "305BHP(227 kW)", "Torque": "314 lb-ft", "layoutEngine": "Front-Engined", "Mass": "3395 lbs", "Transmission": "6-speed Transmission", "Drivetrain": "All-Wheel Drive", "Gearbox": "Manual", "Price": "$35,000" },

//     { "Car": "Audi R8 V10 Plus", "Engine": "5.2L Naturally-Aspirated V10", "BHP": "602 bhp(449 kW)", "Torque": "413 lb-ft", "layoutEngine": "Mid-Engined", "Mass": "3428 lbs", "Transmission": "7-speed Transmission", "Drivetrain": "All-Wheel Drive", "Gearbox": "Automatic", "Price": "$142,700" },

//     { "Car": "Nissan GT-R 2017", "Engine": "3.8L Twin-Turbocharged V6", "BHP": "565 bhp(421 kW)", "Torque": "467 lb-ft", "layoutEngine": "Front-Engined", "Mass": "3933 lbs", "Transmission": "6-speed Transmission", "Drivetrain": "All-Wheel Drive", "Gearbox": "Manual", "Price": "$96,900" },

//     { "Car": "Porsche 911 Turbo S", "Engine": "3.8L Twin-Turbocharged F6", "BHP": "560 bhp(418 kW)", "Torque": "553 lb-ft", "layoutEngine": "Rear-Engined", "Mass": "3607 lbs", "Transmission": "7-speed Transmission", "Drivetrain": "All-Wheel Drive", "Gearbox": "Automatic", "Price": "$219,800" },
//   ];
// });

var App = angular.module('myCars', []);

App.controller('myController', function($scope, $http) {
  $http.get('spec.json')
       .then(function(res){
          $scope.specs = res.data;                
        });
});
