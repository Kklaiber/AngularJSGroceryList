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

app.service("GroceryService", function(){
    var groceryService = {};
    groceryService.groceryItems = [
        {id:1, completed: true, itemName: "milk", date: "2018-12-20" },
        {id:2, completed: true, itemName: "cookies", date: "2018-12-20" },
        {id:3, completed: true, itemName: "ice cream", date: "2018-12-10" },
        {id:4, completed: true, itemName: "potatoes", date: "2018-12-11" },
        {id:5, completed: true, itemName: "cereal", date: "2018-12-13" },
        {id:6, completed: true, itemName: "bread", date: "2018-12-13" },
        {id:7, completed: true, itemName: "eggs", date: "2018-12-13" },
        {id:8, completed: true, itemName: "tortillas", date: "2018-12-15" }
      ];
      groceryService.save = function(entry){
        groceryService.groceryItems.push(entry);
      }
      return groceryService;
})

app.controller("HomeController", [
  "$scope",
  function($scope) {
    $scope.appTitle = "Grocery List";
  }
]);

app.controller("GroceryListItemsController", [
  "$scope",
  "$routeParams",
  "$location",
  "GroceryService",
  function($scope, $routeParams, $location, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems
    $scope.groceryItem = { id: 7, completed:true, itemName: "burger", date: new Date()};
    $scope.save = function(){
        GroceryService.save($scope.groceryItem);
        location.pathname("/");
    }
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
