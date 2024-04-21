let lat, lon;

async function addEntities() {
    const scene = document.querySelector("a-scene");

    // loadData(lat, lon);
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
        entity.setAttribute('rotation', `0 ${theta} 0`);
        entity.setAttribute('width', '4');
        entity.setAttribute('height', '4');
        // entity.setAttribute('material', `src: home_cat.png; transparent: true`);

        entity.setAttribute('material', `src: ${note.imgname}; transparent: true`);
        entity.setAttribute('read-note', '');
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
        lat =latitude;
        lon = longitude;
        addEntities();
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

historyButton = document.createElement('button');
historyButton.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52' fill='none'><path d='M9.66667 46.8333L9.66698 46.833L14.152 43.4747L14.4524 43.2497L14.7523 43.4754L19.215 46.8333H9.66667ZM9.66667 46.8333C9.41905 47.019 9.12461 47.1321 8.81634 47.1599C8.50808 47.1877 8.19816 47.1291 7.92131 46.9906C7.64447 46.8522 7.41164 46.6394 7.24892 46.3761C7.08619 46.1128 7 45.8094 7 45.4999V6.49992C7 6.05789 7.17559 5.63397 7.48816 5.32141C7.80072 5.00885 8.22464 4.83325 8.66667 4.83325H43.3333C43.7754 4.83325 44.1993 5.00885 44.5118 5.32141C44.8244 5.63397 45 6.05789 45 6.49992L45 45.4984C45 45.4988 45 45.4992 45 45.4995C44.9989 45.8069 44.9127 46.108 44.7511 46.3695C44.5893 46.6313 44.3582 46.8432 44.0833 46.9817L44.0821 46.9823C43.8054 47.1227 43.4949 47.1831 43.1858 47.1566C42.8766 47.1301 42.5809 47.0178 42.3321 46.8323L37.848 43.4747L37.5476 43.2497L37.2477 43.4754L32.785 46.8333C32.7849 46.8333 32.7847 46.8334 32.7846 46.8335C32.4962 47.0497 32.1455 47.1666 31.785 47.1666C31.4244 47.1666 31.0735 47.0496 30.785 46.8333L30.7847 46.833L26.2997 43.4747L26 43.2503L25.7003 43.4747L21.2153 46.833L21.215 46.8333M9.66667 46.8333H21.215M21.215 46.8333C20.9265 47.0496 20.5756 47.1666 20.215 47.1666C19.8546 47.1666 19.504 47.0498 19.2156 46.8337L21.215 46.8333ZM40.8673 41.567L41.6667 42.1647V41.1666V8.66659V8.16659H41.1667H10.8333H10.3333V8.66659V41.1666V42.1647L11.1327 41.567L13.4511 39.8337L13.4517 39.8333C13.7402 39.6169 14.0911 39.4999 14.4517 39.4999C14.8121 39.4999 15.1629 39.6168 15.4513 39.833C15.4514 39.8331 15.4515 39.8332 15.4517 39.8333L19.9144 43.1911L20.2143 43.4168L20.5147 43.1918L24.9997 39.8335L25 39.8333C25.2885 39.6169 25.6394 39.4999 26 39.4999C26.3606 39.4999 26.7115 39.6169 27 39.8333L27.0003 39.8335L31.4853 43.1918L31.7857 43.4168L32.0856 43.1911L36.5483 39.8333C36.5485 39.8332 36.5486 39.8331 36.5487 39.833C36.8371 39.6168 37.1879 39.4999 37.5483 39.4999C37.909 39.4999 38.2598 39.6169 38.5483 39.8333L38.5489 39.8337L40.8673 41.567ZM34.6667 16.8333H21.6667C21.2246 16.8333 20.8007 16.6577 20.4882 16.3451C20.1756 16.0325 20 15.6086 20 15.1666C20 14.7246 20.1756 14.3006 20.4882 13.9881C20.8007 13.6755 21.2246 13.4999 21.6667 13.4999H34.6667C35.1087 13.4999 35.5326 13.6755 35.8452 13.9881C36.1577 14.3006 36.3333 14.7246 36.3333 15.1666C36.3333 15.6086 36.1577 16.0325 35.8452 16.3451C35.5326 16.6577 35.1087 16.8333 34.6667 16.8333ZM34.6667 25.4999H17.3333C16.8913 25.4999 16.4674 25.3243 16.1548 25.0118C15.8423 24.6992 15.6667 24.2753 15.6667 23.8333C15.6667 23.3912 15.8423 22.9673 16.1548 22.6547C16.4674 22.3422 16.8913 22.1666 17.3333 22.1666H34.6667C35.1087 22.1666 35.5326 22.3422 35.8452 22.6547C36.1577 22.9673 36.3333 23.3912 36.3333 23.8333C36.3333 24.2753 36.1577 24.6992 35.8452 25.0118C35.5326 25.3243 35.1087 25.4999 34.6667 25.4999ZM34.6667 34.1666H17.3333C16.8913 34.1666 16.4674 33.991 16.1548 33.6784C15.8423 33.3659 15.6667 32.9419 15.6667 32.4999C15.6667 32.0579 15.8423 31.634 16.1548 31.3214C16.4674 31.0088 16.8913 30.8333 17.3333 30.8333H34.6667C35.1087 30.8333 35.5326 31.0088 35.8452 31.3214C36.1577 31.634 36.3333 32.0579 36.3333 32.4999C36.3333 32.9419 36.1577 33.3659 35.8452 33.6784C35.5326 33.991 35.1087 34.1666 34.6667 34.1666Z' fill='white' stroke='#AF9F78'/></svg>"
historyButton.classList.add("historyButton");
document.body.appendChild(historyButton);

historyButton.addEventListener('click', function() {
    window.location.href = '/history';
});

prompt = document.createElement('p');
prompt.innerHTML = "tap anywhere to leave a memo!";
prompt.classList.add("prompt");
document.body.appendChild(prompt);

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
        backButton.addEventListener('touchstart', function() {noteDiv.remove();});


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


const chars = ["/img/bellflowers.png",
                "/img/cat_calico.png",
                "/img/cat_leaf.png",
                "/img/cat_tabby.png",
                "/img/duck_flower.png",
                "/img/duck_knife.png",
                "/img/dumb_dog.png",
                "/img/frog.png",
                "/img/mushroom.png",
                "/img/shiba_stuck.png",
                "/img/strawberry_snail.png"];


async function createNote(){  
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
    backButton.onclick = function() {
        createNoteDiv.remove();
    }
    backButton.addEventListener('touchstart', function() {createNoteDiv.remove();});

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
            submitButton.value = "post";
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
                let noteContent = inputText.value;

                fetch('http://127.0.0.1:5000/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: noteContent,
                        latitude: lat,
                        longitude: lon,
                        user_id: localStorage.getItem("user_id"),
                        imgname: chars[curr_index]
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });

            form.classList.add("form");
            form.appendChild(inputTextDiv);
            form.appendChild(submitButton);
            createNoteDiv.appendChild(form);




    document.body.appendChild(createNoteDiv);


    linesDiv = document.createElement("div");
    linesDiv.classList.add("createLinesDiv");
    createNoteDiv.appendChild(linesDiv);

            submitButton.addEventListener('click', function() {
                createNoteDiv.style.display = 'none';
                showConfirmation();
            });

}

document.querySelector('a-scene').addEventListener('click', function() {
    createNote();
});
document.querySelector('a-scene').addEventListener('touchstart', function() {
    createNote();
});

function showConfirmation(){
    confirmationDiv = document.createElement('div');
    confirmationDiv.classList.add('confirmationDiv');

    confirmationText = document.createElement('p');
    confirmationText.innerHTML = "your memo has been successfully posted!";
    confirmationText.classList.add("confirmationText");
    confirmationDiv.appendChild(confirmationText);

    returnWorld = document.createElement('button');
    // returnWorld.innerHTML = "<p className='returnText'>back to world</p>";
    returnWorld.innerHTML = "back to world";
    returnWorld.classList.add("returnWorld");
    confirmationDiv.appendChild(returnWorld);
    returnWorld.onclick = function() {
        confirmationDiv.remove();
    }
    returnWorld.addEventListener('touchstart', function() {confirmationDiv.remove();});

    document.body.appendChild(confirmationDiv);
}


AFRAME.registerComponent('read-note', {
    schema: {
      color: {default: 'blue'}
    },

    init: function () {
      var el = this.el;  // <a-box>
     
      el.addEventListener('mouseenter', function () {
        setTimeout(() => {
            clickPopup(el);
        }, 1000);

      });

    }
  });