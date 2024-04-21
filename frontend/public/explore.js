var initialLocationsSet = false;




async function addEntities(lat, lon) {
    const scene = document.querySelector('a-scene');

    // Make a GET request
    const response = await fetch(`http://127.0.0.1:5000/notes`);
    const data = await response.json();
    console.log(data)
    for (let i = 0; i < 10; i++) {
        const offsetLat = lat + (Math.random() - 0.5) * 0.0005;
        const offsetLon = lon + (Math.random() - 0.5) * 0.0005;
        let entity = document.createElement('a-entity');
        entity.setAttribute('material', 'color: red');
        entity.setAttribute('geometry', 'primitive: box');
        entity.setAttribute('scale', '10 10 10');
        entity.setAttribute('gps-new-entity-place', `latitude: ${offsetLat}; longitude: ${offsetLon}`);
        scene.appendChild(entity);
      }
    for (let i = 0; i < data.notes.length; i++) {   
        // const offsetLat = lat + (Math.random() - 0.5) * 0.0005;
        // const offsetLon = lon + (Math.random() - 0.5) * 0.0005;
        // let note = data.notes[i];
        // let entity = document.createElement('a-entity');
        // entity.setAttribute('material', 'color: red');
        // // entity.setAttribute('value', note.content);
        // entity.setAttribute('geometry', 'primitive: box');
        // entity.setAttribute('scale', '10 10 10');
        // entity.setAttribute('gps-new-entity-place', `latitude: ${note.latitude}; longitude: ${note.longitude}`);
        // scene.appendChild(entity);
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

