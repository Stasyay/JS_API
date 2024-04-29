const localStorageKey = 'photos';
const APIkey = ''
const url = `https://api.unsplash.com/photos/random?client_id=${APIkey}`;

const photoContainerEl = document.querySelector('#photo-container');
const btnNextEl = document.querySelector('.btn-next');
const btnPrevEl = document.querySelector('.btn-prev');

let dataPhotos = [];
let indexCurrentPhoto = 0;


if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, dataPhotos);
    btnPrevEl.setAttribute('disabled', '');
} else {
    dataPhotos = JSON.parse(localStorage.getItem(localStorageKey));
    indexCurrentPhoto = dataPhotos.length - 1;
}

render();

async function render() {
    const initialdata = await getData();
    if (dataPhotos.length === 0) {
        const newPhoto = {
            id: initialdata.id,
            photo: initialdata
        };
        dataPhotos.push(newPhoto);
        addedPhotoToContainer(newPhoto.photo);
        addPhotoToLocalStorage(dataPhotos);
        indexCurrentPhoto = dataPhotos.length - 1;
    } else {
        checkForPhotoInLocalStorage(initialdata);
    }
}

async function getData() {
    isFetching = true;
    let promise = await fetch(url);
    const data = await promise.json();
    return data;
}

function checkForPhotoInLocalStorage(initialdata) {
    // dataPhotos = JSON.parse(localStorage.getItem(localStorageKey));
    const result = false;
    dataPhotos.forEach(item => {
        if (item.id === initialdata.id) {
            addedPhotoToContainer(item.photo);
            result = true;
        };
    });
    if (result === false) {
        const newPhoto = {
            id: initialdata.id,
            photo: initialdata
        };
        addedPhotoToContainer(newPhoto.photo);
        dataPhotos.push(newPhoto);
        addPhotoToLocalStorage(dataPhotos);
        indexCurrentPhoto = dataPhotos.length - 1;
    }
}

function addedPhotoToContainer(data) {
    photoContainerEl.insertAdjacentHTML('beforeend', `<div class="photo"><img src="${data.urls.small_s3}" alt="${data.alt_description}"><p class="photo__author">${data.user.username}</p><svg class="btn btn-likes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" /></svg><span class="likes">${data.likes}</span>`);
    const btnLikes = document.querySelector('.btn-likes');
    const likesEl = document.querySelector('.likes');
    if (data.liked_by_user) {
        btnLikes.classList.add('added');
    } else {
        btnLikes.classList.remove('added');
    }
    btnLikes.addEventListener('click', () => {
        addLikeToPhoto(data, btnLikes, likesEl);
    });
}

function addPhotoToLocalStorage(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

btnPrevEl.addEventListener('click', () => {
    photoContainerEl.innerHTML = "";
    if (dataPhotos.length > 0) {
        indexPrevPhoto = indexCurrentPhoto - 1;
        const prevPhoto = dataPhotos[indexPrevPhoto];
        addedPhotoToContainer(prevPhoto.photo);
        indexCurrentPhoto = indexPrevPhoto;
    }

    if (indexCurrentPhoto === 0) {
        btnPrevEl.setAttribute('disabled', '');
    }
});

btnNextEl.addEventListener('click', () => {
    btnPrevEl.removeAttribute('disabled');
    photoContainerEl.innerHTML = "";
    if (indexCurrentPhoto === dataPhotos.length - 1) {
        render();
    } else {
        const indexNextPhoto = indexCurrentPhoto + 1;
        addedPhotoToContainer(dataPhotos[indexNextPhoto].photo);
        indexCurrentPhoto = indexNextPhoto;
    }
});

function addLikeToPhoto(data, btn, likes) {

    let likedByUser = data.liked_by_user;
    let likesCounter = data.likes;
    if (!likedByUser) {
        likesCounter++;
        data.liked_by_user = true;
        btn.classList.add('added');
    } else {
        likesCounter--;
        data.liked_by_user = false;
        btn.classList.remove('added');
    }
    likes.textContent = likesCounter;
    data.likes = likesCounter;
    addPhotoToLocalStorage(dataPhotos);
}
