let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;
let laps = [];

function updateDisplay(time) {
  const milliseconds = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  document.getElementById("display").textContent =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(milliseconds).padStart(3, '0')}`;
}

function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  laps = [];
  lapCount = 0;
  updateLapList();
  localStorage.removeItem("laps");
}

function recordLap() {
  if (!timerInterval) return;
  lapCount++;
  const lapTime = document.getElementById("display").textContent;
  laps.push(`Lap ${lapCount}: ${lapTime}`);
  updateLapList();
  localStorage.setItem("laps", JSON.stringify(laps));
}

function updateLapList() {
  const lapList = document.getElementById("laps");
  lapList.innerHTML = "";
  laps.forEach(lap => {
    const li = document.createElement("li");
    li.textContent = lap;
    lapList.appendChild(li);
  });
}

function loadLaps() {
  const savedLaps = JSON.parse(localStorage.getItem("laps"));
  if (savedLaps && Array.isArray(savedLaps)) {
    laps = savedLaps;
    lapCount = laps.length;
    updateLapList();
  }
}

// Load previous laps on page load
window.onload = () => {
  updateDisplay(0);
  loadLaps();
};
