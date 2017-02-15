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
.controller('utilityCntrl',function($scope,$ionicModal,$http,$cordovaFlashlight,$cordovaGeolocation,$cordovaBarcodeScanner){
  //flashlight
  $scope.flashlight=function(){
  $cordovaFlashlight.toggle()
    .then(function (success) { },
      function (error) { alert("error") });
}
//Barcode
  $scope.scanner=function(){
 $cordovaBarcodeScanner.scan()
      .then(function(barcodeData) {
        alert(barcodeData.text)
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });
}
  $ionicModal.fromTemplateUrl('templates/location.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(page) {
    $scope.id=page;
    alert(page)
    switch(page){
      case 'locationPage':
      alert("f")
    $scope.modal.show();
    var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
    $scope.lat = position.coords.latitude;
    $scope.long = position.coords.longitude;
  },
  function(err){
    alert(err)
    $scope.abc = err;
  } )
   $scope.closeModal = function() {
    $scope.modal.hide();
  };
  break;
  case 'weatherPage':
  alert("weather")
    $scope.modal.show();
   var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

$cordovaGeolocation.getCurrentPosition(watchOptions).then(function(position) {
    $scope.a  = position.coords.latitude
    $scope.b = position.coords.longitude
   $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ $scope.a +"&lon="+ $scope.b +"&units=imperial&APPID=a3684df18eaf96bfea41257b288cb5ae").success(function(weather){
   $scope.weather = weather;
   alert(JSON.stringify(weather))
  }),
  function (err){
  alert(error)
}
  });
  break;
  default:
  alert("h")
}
}
});