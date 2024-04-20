var initialLocationsSet = false;




async function addEntities(lat, lon) {
    const scene = document.querySelector('a-scene');
    
    // Make a GET request
    const response = await fetch(`https://api.example.com/endpoint?lat=${lat}&lon=${lon}`);
    const data = await response.json();

    // Use the data to add entities to the scene
    data.entities.forEach(entity => {
        const entityEl = document.createElement('a-text');
        entityEl.setAttribute('position', {x: 5, y: 2, z: 5});
        entityEl.setAttribute('value', entity.text);
        scene.appendChild(entityEl);
    });

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
        timeout: 5000
    });
}

// window.onload = function () {
//     if ("geolocation" in navigator) {
//         updateLocation();
//     } else {
//         console.log("Geolocation is not supported by this browser.");
//     }
// };
function handleOrientation(event) {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    console.log(absolute, alpha, beta, gamma)
    // Do stuff with the new orientation data
  }

window.addEventListener("deviceorientation", handleOrientation, true);
