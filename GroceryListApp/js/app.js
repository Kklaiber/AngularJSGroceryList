var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/groceryList.html",
      controller: "GroceryListItemsController"
    })
    .when("/addItem", {
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemsController"
    })
    .when("/addItem/:id/:cat", {
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemsController"
    })
    .otherwise({
      redirectTo: "/"
    });
});

app.controller("HomeController", [
  "$scope",
  function($scope) {
    $scope.appTitle = "Grocery List";
  }
]);

app.controller("GroceryListItemsController", [
  "$scope",
  "$routeParams",
  function($scope, $routeParams) {
    $scope.groceryItems = [
      { completed: true, itemName: "milk", date: "2018-12-20" },
      { completed: true, itemName: "cookies", date: "2018-12-20" },
      { completed: true, itemName: "ice cream", date: "2018-12-10" },
      { completed: true, itemName: "potatoes", date: "2018-12-11" },
      { completed: true, itemName: "cereal", date: "2018-12-13" },
      { completed: true, itemName: "bread", date: "2018-12-13" },
      { completed: true, itemName: "eggs", date: "2018-12-13" },
      { completed: true, itemName: "tortillas", date: "2018-12-15" }
    ];
    $scope.rp = "Route Param Value: " + $routeParams.id + " Category: " + $routeParams.cat;
  }
]);

// var app = angular.module('groceryListApp', ["ngRoute"]);

// app.config(function($routeProvider){
//     $routeProvider
//         .when("/",{
//             templateUrl: "views/groceryList.html",
//             controller: "GroceryListItemsController"
//         })
//         .when("/addItem",{
//             templateUrl: "views/addItem.html",
//             controller: "GroceryListItemsController"
//         })
//         .when("/addItem/:id", {
//             templateUrl: "views/addItem.html",
//             controller: "GroceryListItemsController"
//         })
//         .otherwise({
//             redirectTo: "/"
//         })
// });

// app.controller("HomeController", ["$scope", function($scope) {
//     $scope.appTitle = "Grocery List";
// }]);

// app.controller("GroceryListItemsController", ["$scope", "$routeParams", function($scope, $routeParams){

//     $scope.groceryItems = [
//         {completed: true, itemName: 'milk', date: '2014-10-00'},
//         {completed: true, itemName: 'cookies', date: '2014-10-01'},
//         {completed: true, itemName: 'ice cream', date: '2014-10-02'},
//         {completed: true, itemName: 'potatoes', date: '2014-10-02'},
//         {completed: true, itemName: 'cereal', date: '2014-10-03'},
//         {completed: true, itemName: 'bread', date: '2014-10-03'},
//         {completed: true, itemName: 'eggs', date: '2014-10-04'},
//         {completed: true, itemName: 'tortillas', date: '2014-10-04'}
//     ]

// }]);
