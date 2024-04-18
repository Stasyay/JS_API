const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
const sliderContainerEl = document.querySelector('.slider-container');
const slidersEl = document.querySelector('.slider-box');
const dotsEl = document.querySelector('.dots');

let currentIndex = 0
let currentImg = images[currentIndex]
slidersEl.innerHTML = `<img class="pic" src="image/${currentImg}" alt="image" class="pic"></img>`

for (let indexDot = 0; indexDot < images.length; indexDot++) {
    (indexDot === 0) ?
        dotsEl.insertAdjacentHTML('beforeend', `<a class="dot activ" data-id="${indexDot}" href="#"></a>`)
        :
        dotsEl.insertAdjacentHTML('beforeend', `<a class="dot" data-id="${indexDot}" href="#"></a>`)
}

sliderContainerEl.addEventListener('click', ({ target }) => {
    if (target.closest('.next-btn')) {
        currentIndex++
        if (currentIndex === images.length) {
            currentIndex = 0
        }
        getCurrentImage(currentIndex)
    }
    if (target.closest('.previous-btn')) {
        currentIndex--
        if (currentIndex < 0) {
            currentIndex = images.length - 1
        }
        getCurrentImage(currentIndex)
    }
    if (target.closest('.dot')) {
        currentIndex = Number(target.dataset.id)
        getCurrentImage(currentIndex)
    }
});

function getCurrentImage(index) {
    currentImg = images[index]
    slidersEl.innerHTML = `<img class="pic" src="image/${currentImg}" alt="image" class="pic"></img>`

    dotsEl.querySelectorAll('.dot').forEach((dot) => {
        (Number(dot.dataset.id) !== index) ?
            dot.classList.remove('activ') : dot.classList.add('activ')
    })
}
