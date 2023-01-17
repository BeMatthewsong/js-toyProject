// 변수 
const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('.button');

// 단어
init();

function init() {
  getWord();
  wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run() {
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("게 임 중");
}

function checkStatus(){
  if(!isPlaying && time === 0){
    buttonChange("게 임 시 작");
    clearInterval(checkInterval);
  }
}
//단어 불러오기
function getWord(){
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    // handle success
    response.data.forEach((word)=>{
      if(word.length<10){
        words.push(word);
      }
    })
    buttonChange("게 임 시 작");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}
// 단어 체크
function checkMatch(){
  if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    wordInput.value = '';
    if(!isPlaying){
      return;
    }
    score ++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random()* words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

// 카운트다운
function countDown() {
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval);
    alert(`당신은 ${score}점입니다.`);
  }
  timeDisplay.innerText = time;
}


buttonChange("게 임 시 작");

// 사용 시작 버튼
function buttonChange(text){
  buttonDisplay.innerText  = text;
  text === '게 임 시 작'? buttonDisplay.classList.remove('loading') : buttonDisplay.classList.add('loading'); 
}
