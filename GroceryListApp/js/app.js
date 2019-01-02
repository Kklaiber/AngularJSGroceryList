var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/groceryList.html",
      controller: "HomeController"
    })
    .when("/addItem", {
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemController"
    })
    .when("/addItem/edit/:id", {
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemController"
    })
    .otherwise({
      redirectTo: "/"
    });
});

app.service("GroceryService", function($http) {
  var groceryService = {};
  groceryService.groceryItems = [];
    $http({
        method: "GET",
        url: "data/serverData.json"
    }).then(function successCallback(response){
        groceryService.groceryItems = response.data;

        for(var item in groceryService.groceryItems){
            groceryService.groceryItems[item].date = new Date(
                groceryService.groceryItems[item].date
            );
        }
    })

  groceryService.findById = function(id) {
    for (var i in groceryService.groceryItems) {
      if (groceryService.groceryItems[i].id === id) {
        return groceryService.groceryItems[i];
      }
    }
  };
  groceryService.getNewId = function() {
    if (groceryService.newId) {
      groceryService.newId++;
      return groceryService.newId;
    } else {
      var maxId = _.max(groceryService.groceryItems, function(entry) {
        return entry.id;
      });
      groceryService.newId = maxId.id + 1;
      return groceryService.newId;
    }
  };
  groceryService.markCompleted = function(entry) {
    entry.completed = !entry.completed;
  };
  groceryService.removeItem = function(entry) {
    var index = groceryService.groceryItems.indexOf(entry);
    groceryService.groceryItems.splice(index, 1);
  };
  groceryService.save = function(entry) {
    var updatedItem = groceryService.findById(entry.id);

    if (updatedItem) {
      updatedItem.completed = entry.completed;
      updatedItem.itemName = entry.itemName;
      updatedItem.date = entry.date;
    } else {
    $http({
        method: "POST",
        url: "data/addedItem.json",
        params: entry,
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json' 
    }})
    .then(function success(data, entry){
        entry.id = response.data.newId
    
    });
        //how we created the clientside id, but no longer needed since line
        //74 does the same thing, but from the server.
    //   entry.id = groceryService.getNewId();
      groceryService.groceryItems.push(entry);
    }
  };
  return groceryService;
});

app.controller("HomeController", [
  "$scope",
  "GroceryService",
  function($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;

    $scope.removeItem = function(entry) {
      GroceryService.removeItem(entry);
    };

    $scope.markCompleted = function(entry) {
      GroceryService.markCompleted(entry);
    };

    $scope.$watch(function(){
        return GroceryService.groceryItems;
    }, function(groceryItems){
        $scope.groceryItems = groceryItems;
    })
  }
]);

app.controller("GroceryListItemController", [
  "$scope",
  "$routeParams",
  "$location",
  "GroceryService",
  function($scope, $routeParams, $location, GroceryService) {
    if (!$routeParams.id) {
      $scope.groceryItem = {
        id: 0,
        completed: false,
        itemName: "",
        date: new Date()
      };
    } else {
      $scope.groceryItem = _.clone(
        GroceryService.findById(parseInt($routeParams.id))
      );
    }
    $scope.save = function() {
      GroceryService.save($scope.groceryItem);
      $location.path("/");
    };
    // console.log($scope.groceryItems);
  }
]);

app.directive("kkGroceryItem", function() {
  return {
    restrict: "E",
    templateUrl: "views/groceryItem.html"
  };
});

