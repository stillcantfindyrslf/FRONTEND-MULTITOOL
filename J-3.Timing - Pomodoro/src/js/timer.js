import {
    body,
    customPomodoroInput,
    customLongBreakInput,
    customShortBreakInput,
    pomodoroMainColor,
    shortBreakMainColor,
    longBreakMainColor,
    customBtn,
    timerElement,
    startBtn,
    pauseBtn,
    resumeBtn,
    shortBreak,
    pomodoroBtn,
    longBreak,
    startPauseBtn,
    customForm,
} from './pageElements.js';
import timeSound from '../sound/microwave-sound.mp3';

let interval;
let isPaused = false;
let remainingTime;
const timeEndSound = new Audio(timeSound);


export const bodyStyle = () => {
    function updateColors(mainColor) {
        body.style.backgroundColor = mainColor;
        startPauseBtn.forEach((startBtn) => {
            startBtn.style.color = mainColor;
        });
        customBtn.style.color = mainColor;
    }

    if (pomodoroBtn.classList.contains("active")) {
        updateColors(pomodoroMainColor);
    } else if (shortBreak.classList.contains("active")) {
        updateColors(shortBreakMainColor);
    } else if (longBreak.classList.contains("active")) {
        updateColors(longBreakMainColor);
    }
};

export const removeClickedStyle = (typeBtn) => {
    typeBtn.forEach((btn) => {
        btn.classList.remove("active");
    });
};

export const setTimer = (minutes, seconds) => {
    remainingTime = new Date();
    remainingTime.setMinutes(minutes);
    remainingTime.setSeconds(seconds);

    timerElement.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
};

const updateTimer = () => {
    remainingTime.setSeconds(remainingTime.getSeconds() - 1);

    const minutesLeft = remainingTime.getMinutes();
    const secondsLeft = remainingTime.getSeconds();

    if (minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(interval);
        timerElement.textContent = "00:00";
        playSound();

        if (pomodoroBtn.classList.contains("active")) {
            setTimeout(() => {
                shortBreak.click();
                startTimer();
            }, 5000);
        }
        return;
    }
    timerElement.textContent = String(minutesLeft).padStart(2, "0") + ":" + String(secondsLeft).padStart(2, "0");
};

export const startTimer = () => {
    if (!interval) {
        interval = setInterval(updateTimer, 1000);
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    }
};

export const pauseTimer = () => {
    if (!isPaused) {
        clearInterval(interval);
        isPaused = true;
        pauseBtn.style.display = "none";
        resumeBtn.style.display = "inline-block";
    }
};

export const resumeTimer = () => {
    if (isPaused) {
        interval = setInterval(updateTimer, 1000);
        isPaused = false;
        resumeBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    }
};

export const resetTimer = () => {
    clearInterval(interval);
    interval = null;
    isPaused = false;
    timerElement.textContent = "00:00";
    startBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
};

const playSound = () => {
    timeEndSound.play().catch((error) => {
        console.error("Error with song:", error);
    });
};

export const toggleCustomVal = () => {
    customBtn.classList.toggle("active");
    customForm.classList.toggle("active");
};

export const cleanInputs = () => {
    customPomodoroInput.value = "";
    customShortBreakInput.value = "";
    customLongBreakInput.value = "";
};