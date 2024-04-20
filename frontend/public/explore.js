var initialLocationsSet = false;




async function addEntities(lat, lon) {
    const scene = document.querySelector('a-scene');
    
    // Make a GET request
    const response = await fetch(`http://127.0.0.1:5000/notes?latitude=-1&longitude=1.0001`);
    const data = await response.json();
    console.log(data)
    // Use the data to add entities to the scene
    for (let i = 0; i < data.notes.length; i++) {
        let note = data.notes[i];
        const entityEl = document.createElement('a-text');
        // entityEl.setAttribute('position', `${note.latitude_distance_feet} 2 ${note.longitude_distance_feet}`);
        // entityEl.setAttribute('value', note.content);
        // entityEl.setAttribute('look-at', '[camera]');
        scene.appendChild(entityEl);
    }
    console.log(scene)

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

window.onload = function () {
    if ("geolocation" in navigator) {
        updateLocation();
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

