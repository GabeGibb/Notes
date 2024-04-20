var initialLocationsSet = false;

function addEntities(lat, lon) {
    const scene = document.querySelector('a-scene');
    if (!initialLocationsSet) {
        for (let i = 0; i < 10; i++) {
            const offsetLat = lat + (Math.random() - 0.5) * 0.005;
            const offsetLon = lon + (Math.random() - 0.5) * 0.005;
            let entity = document.createElement('a-entity');
            entity.setAttribute('material', 'color: red');
            entity.setAttribute('geometry', 'primitive: box');
            entity.setAttribute('scale', '10 10 10');
            entity.setAttribute('gps-new-entity-place', `latitude: ${offsetLat}; longitude: ${offsetLon}`);
            scene.appendChild(entity);
        }
        initialLocationsSet = true;
    }
    // Update the coordinates display
    document.getElementById('coordinates').textContent = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
}

function updateLocation() {
    navigator.geolocation.watchPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        addEntities(latitude, longitude);
    }, function (error) {
        console.error("Geolocation error: " + error.message);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000
    });
}

window.onload = function () {
    if ("geolocation" in navigator) {
        updateLocation();
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};