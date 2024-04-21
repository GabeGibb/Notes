var initialLocationsSet = false;




async function addEntities(lat, lon) {
    const scene = document.getElementById('scene');

    // Make a GET request
    const response = await fetch(`http://127.0.0.1:5000/notes?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();
    console.log(lat, lon)
    console.log(data)

    // let htmlContent = `<a-scene embedded class="fullscreen" vr-mode-ui="enabled: false" arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false" renderer="antialias: true; alpha: true">
    // <a-box position="-1 0.5 -30" rotation="0 45 0" color="#4CC3D9"></a-box>
    // `

    // //   <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
    // //   <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    // //   <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    // //   <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>


    // for (let i = 0; i < data.notes.length; i++) {  
    //     let note = data.notes[i];
    //     let entity = `
    //         <a-box
    //         position="${note.longitude_distance_feet} 0 ${note.latitude_distance_feet}"
    //         rotation="0 45 0" color="#4CC3D9">
    //         </a-box>
    //     `;
    //     console.log(entity)
    //     htmlContent += entity;

    //   }
    //   htmlContent += `</a-scene>`;
    // scene.innerHTML = htmlContent;
    // console.log(scene)
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

