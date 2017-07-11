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

.controller('utilityCntrl',function($scope,$state,$ionicModal,$http,$cordovaFlashlight,$cordovaGeolocation,$cordovaBarcodeScanner){
  //ionic model
  $ionicModal.fromTemplateUrl('templates/location.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.locationModel= modal;
        });

     $ionicModal.fromTemplateUrl('templates/weather.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.weatherModel= modal;
        });

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
//location
 $scope.ShowLocation = function (){
         $scope.locationModel.show()
    var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
    $scope.lat = position.coords.latitude;
    $scope.long = position.coords.longitude;
    $scope.latLng = new google.maps.LatLng($scope.lat, $scope.long);
    $scope.mapOptions = {
      center: $scope.latLng, 
      zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     $scope.map = new google.maps.Map(document.getElementById("map"), $scope.mapOptions);
    google.maps.event.addListener($scope.map, 'idle', function(){
    $scope.marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: $scope.latLng
  });      

});
  },function(err){
    alert(err)
  });
}
  $scope.closeModal = function() {
    $scope.weatherModel.hide();
    $scope.locationModel.hide();

  };
//weather
     $scope.ShowWeather= function (){
       $scope.date = new Date();
         $scope.weatherModel.show()
   var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };
$cordovaGeolocation.getCurrentPosition(watchOptions).then(function(position) {
    $scope.a  = position.coords.latitude
    $scope.b = position.coords.longitude
   $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ $scope.a +"&lon="+ $scope.b +"&units=imperial&APPID=a3684df18eaf96bfea41257b288cb5ae").success(function(weather){
   $scope.weather = weather;
   $scope.degree = ($scope.weather.main.temp-32)*5.0/9.0;
  }),
  function (err){
  alert(error)
}
  });
    }

});
