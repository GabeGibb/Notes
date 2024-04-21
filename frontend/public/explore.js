
// async function setData(){
//     const response = await fetch(`http://127.0.0.1:5000/notes?latitude=${lat}&longitude=${lon}`);
//     const data = await response.json();
//     const planes = document.querySelectorAll('a-plane');
//     for (let i = 0; i < planes.length; i++) {
//         let entity = planes[i];
//         let note = data.notes[i];
//         entity.setAttribute('material', `src: ${note.imgname}; transparent: true`);
//         entity.dataset.content = note.content;
//         entity.dataset.username = note.user.username;
//         entity.dataset.imgname = note.imgname;
//         entity.dataset.distance = note.distance;
//         let date = new Date(note.date);
//         let formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
//         entity.dataset.date = formattedDate;
//     }
    
// }

async function addEntities(lat, lon) {
    const scene = document.querySelector("a-scene");

    // Make a GET request
    const response = await fetch(`http://127.0.0.1:5000/notes?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();

    // const data = {}
    // data.notes = [1,2,3,4,5]
    for (let i = 0; i < data.notes.length; i++) {  
        let note = data.notes[i];
        let entity = document.createElement('a-plane');
        let randomX = Math.floor(Math.random() * 100) - 50;
        let randomZ = Math.floor(Math.random() * 100) - 50;
        entity.setAttribute('position', `${randomX} 1 ${randomZ}`);
        let camera = document.querySelector('#camera');
        let position = camera.getAttribute('position');
        let dx = position.x - randomX;
        let dz = position.z - randomZ;
        let theta = Math.atan2(dz, dx);
        // theta *= 180 / Math.PI; // Convert from radians to degrees
        entity.setAttribute('rotation', `0 ${theta} 0`);
        // entity.setAttribute('rotation', '0 0 0');
        entity.setAttribute('width', '4');
        entity.setAttribute('height', '4');
        entity.setAttribute('material', `src: ${note.imgname}; transparent: true`);
        entity.setAttribute('material', `src: img/shiba_stuck.png; transparent: true`);

        entity.setAttribute('read-note', '');
        entity.setAttribute('do-something-once-loaded', '');
        entity.setAttribute('cursor-listener', '');
        entity.setAttribute('look-at', '#camera');

        entity.dataset.content = note.content;
        entity.dataset.username = note.user.username;
        entity.dataset.imgname = note.imgname;
        entity.dataset.distance = note.distance;
        let date = new Date(note.date);
        let formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        entity.dataset.date = formattedDate;

        scene.appendChild(entity)

      }

    document.getElementById('coordinates').textContent = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
}

function updateLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
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

function clickPopup(el){
    const data = el.dataset
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
        noteDate.innerHTML = data.date;
        noteHeader.append(noteDate);
        noteDate.classList.add("noteDate");

    noteDiv.append(noteHeader);

    //text
        noteText = document.createElement('p');
        noteText.innerHTML = data.content;
        noteText.classList.add("noteText");
        noteDiv.append(noteText);

    //name
        noteName = document.createElement('p');
        noteName.innerHTML = data.username;
        noteName.classList.add("noteName");

        noteDiv.append(noteName);


    linesDiv = document.createElement("div");
    linesDiv.classList.add("linesDiv");
    noteDiv.appendChild(linesDiv);
    document.body.appendChild(noteDiv);
}

const createNote = document.getElementById("createNote");

const chars = ["/img/bellflowers.png",
                "/img/cat_calico.png",
                "/img/cat_leaf.png",
                "/img/cat_tabby.png",
                "/img/duck_flower.png",
                "/img/duck_knife.png",
                "/img/dumb_dog.PNG",
                "/img/frog.png",
                "/img/mushroom.png",
                "/img/shiba_stuck.PNG",
                "/img/strawberry_snail.png"];

createNote.addEventListener('click', function() {  
    curr_index = 0;
    charCount = 0;
    createNoteDiv = document.createElement('div');
    createNoteDiv.classList.add('createNoteDiv')
    
    createNoteHeader = document.createElement('div');
    createNoteHeader.classList.add('createNoteHeader');
    createNoteDiv.appendChild(createNoteHeader);

    backButton = document.createElement('button');
    backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M5.88705 5.00441L9.82601 1.0717C9.94375 0.953971 10.0099 0.79429 10.0099 0.62779C10.0099 0.46129 9.94375 0.301609 9.82601 0.183875C9.70828 0.066142 9.5486 0 9.3821 0C9.2156 0 9.05592 0.066142 8.93819 0.183875L5.00548 4.12283L1.07277 0.183875C0.955038 0.066142 0.795357 1.47826e-07 0.628857 1.49067e-07C0.462357 1.50307e-07 0.302676 0.066142 0.184942 0.183875C0.067209 0.301609 0.00106717 0.46129 0.00106717 0.62779C0.00106717 0.79429 0.067209 0.953971 0.184942 1.0717L4.1239 5.00441L0.184942 8.93712C0.12634 8.99524 0.079827 9.06439 0.0480848 9.14058C0.0163426 9.21677 0 9.29849 0 9.38103C0 9.46357 0.0163426 9.54529 0.0480848 9.62148C0.079827 9.69767 0.12634 9.76682 0.184942 9.82495C0.243066 9.88355 0.312217 9.93006 0.388407 9.96181C0.464598 9.99355 0.546319 10.0099 0.628857 10.0099C0.711395 10.0099 0.793116 9.99355 0.869307 9.96181C0.945497 9.93006 1.01465 9.88355 1.07277 9.82495L5.00548 5.88599L8.93819 9.82495C8.99631 9.88355 9.06546 9.93006 9.14165 9.96181C9.21784 9.99355 9.29956 10.0099 9.3821 10.0099C9.46464 10.0099 9.54636 9.99355 9.62255 9.96181C9.69874 9.93006 9.76789 9.88355 9.82601 9.82495C9.88462 9.76682 9.93113 9.69767 9.96287 9.62148C9.99461 9.54529 10.011 9.46357 10.011 9.38103C10.011 9.29849 9.99461 9.21677 9.96287 9.14058C9.93113 9.06439 9.88462 8.99524 9.82601 8.93712L5.88705 5.00441Z" fill="#5B5B5B"></svg>`;
    backButton.classList.add("backButton")
    createNoteHeader.append(backButton);

    title = document.createElement('p');
    title.innerHTML = "pick your avatar";
    title.classList.add("title")
    createNoteHeader.appendChild(title);

    //create char
        charDiv = document.createElement('div');
        charDiv.classList.add('charDiv');
        createNoteDiv.appendChild(charDiv);

        leftArrowDiv = document.createElement('div');
        leftArrowDiv.classList.add('leftArrowDiv');
        leftArrowDiv.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'><path d='M9.85655 14.8779L16.4599 21.4695C16.5683 21.5789 16.6974 21.6657 16.8395 21.7249C16.9817 21.7841 17.1342 21.8146 17.2882 21.8146C17.4422 21.8146 17.5947 21.7841 17.7369 21.7249C17.8791 21.6657 18.0081 21.5789 18.1166 21.4695C18.3338 21.2509 18.4558 20.9553 18.4558 20.647C18.4558 20.3388 18.3338 20.0431 18.1166 19.8245L12.3416 13.9912L18.1166 8.21621C18.3338 7.99762 18.4558 7.70192 18.4558 7.39371C18.4558 7.08549 18.3338 6.7898 18.1166 6.57121C18.0085 6.46097 17.8797 6.37327 17.7375 6.31319C17.5953 6.25311 17.4426 6.22185 17.2882 6.22121C17.1339 6.22185 16.9812 6.25311 16.839 6.31319C16.6968 6.37327 16.5679 6.46097 16.4599 6.57121L9.85655 13.1629C9.73813 13.2721 9.64362 13.4047 9.57898 13.5523C9.51434 13.6999 9.48097 13.8593 9.48097 14.0204C9.48097 14.1815 9.51434 14.3409 9.57898 14.4884C9.64362 14.636 9.73813 14.7686 9.85655 14.8779Z' fill='black' fill-opacity='0.2'/></svg>";
        charDiv.appendChild(leftArrowDiv);


        charImages = document.createElement('div');
        charImages.classList.add('charImages');
        charDiv.appendChild(charImages);

        char = document.createElement('img');
        char.src= chars[curr_index];
        charImages.append(char);

        rightArrowDiv = document.createElement('div');
        rightArrowDiv.classList.add('rightArrowDiv');
        rightArrowDiv.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'><path d='M18.1434 14.8779L11.5401 21.4695C11.4317 21.5789 11.3026 21.6657 11.1605 21.7249C11.0183 21.7841 10.8658 21.8146 10.7118 21.8146C10.5578 21.8146 10.4053 21.7841 10.2631 21.7249C10.1209 21.6657 9.99192 21.5789 9.88343 21.4695C9.66621 21.2509 9.54418 20.9553 9.54418 20.647C9.54418 20.3388 9.66621 20.0431 9.88343 19.8245L15.6584 13.9912L9.88343 8.21621C9.66621 7.99762 9.54418 7.70192 9.54418 7.39371C9.54418 7.08549 9.66621 6.7898 9.88343 6.57121C9.99154 6.46097 10.1204 6.37327 10.2626 6.31319C10.4048 6.25311 10.5574 6.22185 10.7118 6.22121C10.8661 6.22185 11.0188 6.25311 11.161 6.31319C11.3032 6.37327 11.4321 6.46097 11.5401 6.57121L18.1434 13.1629C18.2619 13.2721 18.3564 13.4047 18.421 13.5523C18.4857 13.6999 18.519 13.8593 18.519 14.0204C18.519 14.1815 18.4857 14.3409 18.421 14.4884C18.3564 14.636 18.2619 14.7686 18.1434 14.8779Z' fill='black' fill-opacity='0.2'/></svg>"
        charDiv.appendChild(rightArrowDiv);

        leftArrowDiv.onclick = function() {
            curr_index--;
            if (curr_index < 0) {
                curr_index = 10;
            }
            char.src = chars[curr_index];
        };

        rightArrowDiv.onclick = function() {
            curr_index++;
            if (curr_index > 10) {
                curr_index = 0;
            }
            char.src = chars[curr_index];
        };

            //input
            inputTextDiv = document.createElement("div");
            inputTextDiv.classList.add("createNoteText");

            inputText = document.createElement('textarea');
            inputText.type = "text";
            inputText.placeholder = "Write a message...";
            inputText.classList.add("inputText");
            inputTextDiv.append(inputText);

            submitButton = document.createElement('input');
            submitButton.type = "submit";
            submitButton.value = "Post";
            submitButton.classList.add("submitButton");
            createNoteDiv.append(submitButton);

            //char limit
            limitDiv = document.createElement("div");
            limitDiv.classList.add("limitDiv");
            limitDiv.innerHTML = charCount + "/260";

            createNoteDiv.appendChild(limitDiv);



            inputText.addEventListener('input', function() {
                charCount = inputText.value.length;
                limitDiv.innerHTML = charCount + "/260";

                if(inputText.value.length >= 260) {
                    inputText.value = inputText.value.substring(0, 259);
                }
            });

            form = document.createElement('form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                // handle form submission here
                console.log("jlsdkf")
            });

            form.classList.add("form");
            form.appendChild(inputTextDiv);
            form.appendChild(submitButton);
            createNoteDiv.appendChild(form);




    document.body.appendChild(createNoteDiv);


    linesDiv = document.createElement("div");
    linesDiv.classList.add("createLinesDiv");
    createNoteDiv.appendChild(linesDiv);

});

AFRAME.registerComponent('read-note', {
    schema: {
      color: {default: 'blue'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;
     
      el.addEventListener('mouseenter', function () {
        setTimeout(() => {
            clickPopup(el);
        }, 1000);

        // el.setAttribute('color', data.color);
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });

    }
  });