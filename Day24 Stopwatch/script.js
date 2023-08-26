document.addEventListener("DOMContentLoaded", function () {
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const millisecondElement = document.getElementById("milisecond");
    const lapButton = document.querySelector(".lap");
    const startButton = document.querySelector(".start");
    const lapList = document.querySelector(".lap-list");

    let isRunning = false;
    let isPaused = false;
    let interval;
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let lapCount = 1;

    // Format time values to add leading zeros
    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }

    // Update the time display
    function updateTime() {
        millisecondElement.textContent = formatTime(milliseconds);
        secondElement.textContent = formatTime(seconds);
        minuteElement.textContent = formatTime(minutes);
        hourElement.textContent = formatTime(hours);
    }

    // Start or resume the stopwatch
    function start() {
        interval = setInterval(function () {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }
            updateTime();
        }, 10);

        isRunning = true;
        isPaused = false;
        lapButton.textContent = "Lap";
        startButton.textContent = "Stop";
    }

    // Stop the stopwatch
    function stop() {
        clearInterval(interval);
        isRunning = false;
        startButton.textContent = "Resume";
    }

    // Handle lap button click
    function lap() {
        const lapItem = document.createElement("li");
        lapItem.classList.add("lap-item");
        lapItem.innerHTML = `
            <span class="lap-item-number">${lapCount}</span>
            <span class="lap-item-time">${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}</span>
        `;
        lapList.appendChild(lapItem);
        lapCount++;
    }

    // Handle start button click
    function startButtonClick() {
        if (!isRunning) {
            if (startButton.textContent === "Resume") {
                // Resume the stopwatch
                start();
                lapButton.textContent = "Lap";
            } else {
                // Start the stopwatch
                start();
                lapButton.disabled = false;
            }
        } else {
            // Stop the stopwatch
            stop();
            lapButton.textContent = "Reset";
        }
    }

    // Handle lap button click
    function lapButtonClick() {
        if (isRunning) {
            lap();
        } else if (lapButton.textContent === "Reset") {
            // Reset the stopwatch
            clearInterval(interval);
            milliseconds = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
            updateTime();
            lapList.innerHTML = "";
            lapCount = 1;
            lapButton.textContent = "Lap";
            lapButton.disabled = true;
            startButton.textContent = "Start";
        }
    }

    // Add event listeners
    startButton.addEventListener("click", startButtonClick);
    lapButton.addEventListener("click", lapButtonClick);
});
