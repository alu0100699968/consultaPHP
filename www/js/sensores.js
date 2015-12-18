// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
  startWatch();
}

// Start watching the acceleration
//
function startWatch() {

  var options = {
    frequency: 500
  };

  watchID = navigator.accelerometer.watchAcceleration(onSuccessAC, onError, options);
  navigator.geolocation.getCurrentPosition(onSuccessGPS, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
  if (watchID) {
    navigator.accelerometer.clearWatch(watchID);
    watchID = null;
  }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccessAC(acceleration) {
  var element = document.getElementById('accelerometer');
  if (acceleration.x < 1 && Math.abs(acceleration.y) > 1) //vertical
    element.style.backgroundColor = 'red';
  else if (acceleration.x < 1 && acceleration.y < 1) //plano
    element.style.backgroundColor = 'blue';
  else { //horizontal
    element.style.backgroundColor = 'green';
  }
}

function onError() {
  alert('¡Error!');
}

function onSuccessGPS(position) {
  var element = document.getElementById('geolocation');
  element.innerHTML = 'Latitud: ' + position.coords.latitude + '<br />' +
    'Longitud: ' + position.coords.longitude + '<br />';

  getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
}

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geocode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results);
            var address = (results[0].formatted_address);
            document.getElementById('position').innerHTML = address;
        }
    });
}
