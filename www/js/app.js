// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('utilityCntrl',function($scope,$cordovaFlashlight,$cordovaGeolocation,$cordovaBarcodeScanner){
  $scope.flashlight=function(){
    $cordovaFlashlight.available().then(function(availability) {
    var avail = availability; // is available
  }, function () {
    alert("FlashLight not available")
  });

  $cordovaFlashlight.switchOn()
    .then(
      function (success) { /* success */ },
      function (error) { alert("dc")/* error */ });

  $cordovaFlashlight.switchOff()
    .then(
      function (success) { /* success */ },
      function (error) { /* error */ });

  $cordovaFlashlight.toggle()
    .then(function (success) { /* success */ },
      function (error) { /* error */ });
}
  $scope.scanner=function(){
document.addEventListener("deviceready", function () {
 $cordovaBarcodeScanner.scan()
      .then(function(barcodeData) {
        alert(barcodeData.text)
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });
})
}
$scope.location=function(){
  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      console.log(err)
    },
    function(position) {
      alert("alert")
    $scope.a  = position.coords.latitude
    $scope.b = position.coords.longitude
    alert($scope.a)
   $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ $scope.a +"&lon="+ $scope.b +"&units=imperial&APPID=a3684df18eaf96bfea41257b288cb5ae").success(function(weather){
   $scope.weather = weather;
  }).error(function (err){
  alert(error)
})
  });
}


})