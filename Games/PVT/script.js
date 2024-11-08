const testArea = document.getElementById('test-area');
const timer = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultsDiv = document.getElementById('results');

let stimuliTimer, countDownTimer;
let startTime, reactionStartTime;
let reactionTimes = [];
let stimulusCount = 0;

function startTest() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  reactionTimes = [];
  stimulusCount = 0;
  startTime = Date.now();
  scheduleNextStimulus();
  countDownTimer = setTimeout(endTest, 180000); // End test after 3 minutes
}

function scheduleNextStimulus() {
  const randomInterval = Math.random() * 8000 + 2000; // Schedule a stimulus between 2 and 10 seconds
  stimuliTimer = setTimeout(triggerStimulus, randomInterval);
}

function triggerStimulus() {
  reactionStartTime = Date.now();
  timer.textContent = reactionStartTime - startTime;
  stimulusCount++;
}

function stopTest() {
  clearTimeout(stimuliTimer);
  clearTimeout(countDownTimer);
  endTest();
}

function endTest() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  timer.textContent = "Be ready";
  showResults();
}

function showResults() {
  const meanReactionTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
  const lapses = reactionTimes.filter(time => time > 500).length;
  const falseStarts = reactionTimes.filter(time => time < 100).length;
  
  resultsDiv.innerHTML = `<p>Mean Reaction Time: ${meanReactionTime.toFixed(2)} ms</p>
                          <p>Number of Lapses: ${lapses}</p>
                          <p>Number of False Starts: ${falseStarts}</p>
                          <p>What is your fatigue scale? Scroll down for more info.</p>`;
}

// Event listeners
testArea.addEventListener('touchstart', handleReaction);

// This function centralizes the reaction logic for both key presses and touch events
function handleReaction() {
  if (stimulusCount > 0) {
    const reactionTime = Date.now() - reactionStartTime;
    reactionTimes.push(reactionTime);
    timer.textContent = "Be ready";
    scheduleNextStimulus();
  }
}

// Modify the existing keydown event listener to call the new handleReaction function
document.addEventListener('keydown', (event) => {
  if (['KeyX', 'KeyM'].includes(event.code)) {
    handleReaction();
  }
});

startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);
