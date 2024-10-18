import {
    pomodoroBtn,
    shortBreak,
    longBreak,
    typeBtn,
    startBtn,
    pauseBtn,
    resumeBtn,
    saveCustomBtn,
    customPomodoroInput,
    customShortBreakInput,
    customLongBreakInput,
    selectCustom,
} from './pageElements.js';
import {
    removeClickedStyle,
    bodyStyle,
    cleanInputs,
    toggleCustomVal,
    setTimer,
    resetTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
} from './timer.js';


export const setupEventHandlers = () => {
    saveCustomBtn.addEventListener("click", () => {

        let pomodoroValue = customPomodoroInput.value;
        let shortBreakValue = customShortBreakInput.value;
        let longBreakValue = customLongBreakInput.value;

        if (pomodoroValue === "" && shortBreakValue === "" &&
            longBreakValue === "") {
            alert("Empty field!");
            return;
        }
        if (pomodoroValue.includes("-") || shortBreakValue.includes("-") ||
            longBreakValue.includes("-")) {
            alert("Time should not include minus!");
            return;
        }

        pomodoroValue = pomodoroValue.slice(0, 3);
        shortBreakValue = shortBreakValue.slice(0, 3);
        longBreakValue = longBreakValue.slice(0, 3);

        window.defaultTimes = {
            pomodoro: parseInt(pomodoroValue, 10) || 25,
            shortBreak: parseInt(shortBreakValue, 10) || 5,
            longBreak: parseInt(longBreakValue, 10) || 15,
        };

        alert("Custom time saved!");
        pomodoroBtn.click();
        cleanInputs();
        toggleCustomVal();
    });

    selectCustom.addEventListener("click", () => {
        toggleCustomVal();
    });

    pomodoroBtn.addEventListener("click", () => {
        resetTimer();
        removeClickedStyle(typeBtn);
        pomodoroBtn.classList.add("active");
        bodyStyle();
        const pomodoroTime = window.defaultTimes?.pomodoro || 25;
        setTimer(pomodoroTime, 0);
    });

    shortBreak.addEventListener("click", () => {
        resetTimer();
        removeClickedStyle(typeBtn);
        shortBreak.classList.add("active");
        bodyStyle();
        const shortBreakTime = window.defaultTimes?.shortBreak || 5;
        setTimer(shortBreakTime, 0);
    });

    longBreak.addEventListener("click", () => {
        resetTimer();
        removeClickedStyle(typeBtn);
        longBreak.classList.add("active");
        bodyStyle();
        const longBreakTime = window.defaultTimes?.longBreak || 15;
        setTimer(longBreakTime, 0);
    });

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resumeBtn.addEventListener("click", resumeTimer);

    pomodoroBtn.click();
};