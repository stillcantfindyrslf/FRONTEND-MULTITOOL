let position = 0;
const slidesToShow = 4;
const slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const holder = document.querySelector('.slider-holder');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const item = document.querySelectorAll('.slider-item');
const itemsCount = item.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

item.forEach((items) => {
    items.style.minWidth = `${itemWidth}px`;
});

prevBtn.addEventListener("click", () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    if (itemsLeft >= slidesToScroll) {
        position += movePosition;
    } else {
        position +=itemsLeft * itemWidth
    }

    setPosition();
    checkBtns();
});

nextBtn.addEventListener("click", () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    if (itemsLeft >= slidesToScroll) {
        position -= movePosition;
    } else {
        position -=itemsLeft * itemWidth
    }

    setPosition();
    checkBtns();
});

const setPosition = () => {
    holder.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
    prevBtn.disabled = position === 0;
    nextBtn.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;

    prevBtn.classList.toggle('button-disabled', prevBtn.disabled);
    nextBtn.classList.toggle('button-disabled', nextBtn.disabled);
};

checkBtns();
