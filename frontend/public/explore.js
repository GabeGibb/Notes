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

const note = document.getElementById('note');

function clickPopup(){
    noteDiv = document.createElement('div');
    noteDiv.classList.add('noteDiv')
    
    noteHeader = document.createElement('div');
    noteHeader.classList.add('noteHeader');
    
    //back button inside noteHeader
        backButton = document.createElement('button');
        backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M5.88705 5.00441L9.82601 1.0717C9.94375 0.953971 10.0099 0.79429 10.0099 0.62779C10.0099 0.46129 9.94375 0.301609 9.82601 0.183875C9.70828 0.066142 9.5486 0 9.3821 0C9.2156 0 9.05592 0.066142 8.93819 0.183875L5.00548 4.12283L1.07277 0.183875C0.955038 0.066142 0.795357 1.47826e-07 0.628857 1.49067e-07C0.462357 1.50307e-07 0.302676 0.066142 0.184942 0.183875C0.067209 0.301609 0.00106717 0.46129 0.00106717 0.62779C0.00106717 0.79429 0.067209 0.953971 0.184942 1.0717L4.1239 5.00441L0.184942 8.93712C0.12634 8.99524 0.079827 9.06439 0.0480848 9.14058C0.0163426 9.21677 0 9.29849 0 9.38103C0 9.46357 0.0163426 9.54529 0.0480848 9.62148C0.079827 9.69767 0.12634 9.76682 0.184942 9.82495C0.243066 9.88355 0.312217 9.93006 0.388407 9.96181C0.464598 9.99355 0.546319 10.0099 0.628857 10.0099C0.711395 10.0099 0.793116 9.99355 0.869307 9.96181C0.945497 9.93006 1.01465 9.88355 1.07277 9.82495L5.00548 5.88599L8.93819 9.82495C8.99631 9.88355 9.06546 9.93006 9.14165 9.96181C9.21784 9.99355 9.29956 10.0099 9.3821 10.0099C9.46464 10.0099 9.54636 9.99355 9.62255 9.96181C9.69874 9.93006 9.76789 9.88355 9.82601 9.82495C9.88462 9.76682 9.93113 9.69767 9.96287 9.62148C9.99461 9.54529 10.011 9.46357 10.011 9.38103C10.011 9.29849 9.99461 9.21677 9.96287 9.14058C9.93113 9.06439 9.88462 8.99524 9.82601 8.93712L5.88705 5.00441Z" fill="#5B5B5B"></svg>`;
        backButton.classList.add("backButton")
        noteHeader.append(backButton);
        backButton.onclick = function() {
            noteDiv.remove();
        }

    //date inside noteHeader
        noteDate = document.createElement('p');
        noteDate.innerHTML = '4/20/24';
        noteHeader.append(noteDate);
        noteDate.classList.add("noteDate");

    noteDiv.append(noteHeader);

    //text
        noteText = document.createElement('p');
        noteText.innerHTML = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.";
        noteText.classList.add("noteText");
        noteDiv.append(noteText);

    //name
        noteName = document.createElement('p');
        noteName.innerHTML = "- gabe gibb";
        noteName.classList.add("noteName");

        noteDiv.append(noteName);


    linesDiv = document.createElement("div");
    linesDiv.classList.add("linesDiv");
    noteDiv.appendChild(linesDiv);
    document.body.appendChild(noteDiv);
}


AFRAME.registerComponent('read-note', {
    schema: {
      color: {default: 'blue'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;
      console.log('test')
      el.addEventListener('mouseenter', function () {
        setTimeout(() => {
            clickPopup();
        }, 1000);

        // el.setAttribute('color', data.color);
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });

    }
  });