angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$ionicHistory,$ionicViewSwitcher) {
  $scope.isItemSort = false;
  $scope.items = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7}];
  $scope.forwardAnim = function(){
    $ionicViewSwitcher.nextDirection("forward"); 
  };
  // $('#home').onscroll = function(){
  //   console.log('asd'); 
  // };
}) 

.controller('DetailCtrl', function($scope,$stateParams,$ionicHistory,$ionicViewSwitcher,$location) {
  $scope.id = $stateParams.id;
  $scope.goBack = function(){
    $location.path("/tab/home");
    $ionicViewSwitcher.nextDirection("back");
  };
})

.controller('SettingCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('MeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
