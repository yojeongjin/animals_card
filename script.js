//state

const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

let stage = 1
let time = 60
let timer = 0

$stage.innerHTML = `STAGE ${stage}`

function countdown() {
  timer = setInterval(function() {
    time--
    $time.innerHTML = `TIME ${time}`
    if (time === 0) {
      clearInterval(timer)
      gameOver()
    }
  },1000)
}

//game
const animalsImg = 
['whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish',
'whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish']

const $board = document.querySelector('.game-board')
const $animal = document.getElementsByClassName('animal')
const $front = document.getElementsByClassName('front')
const $back = document.getElementsByClassName('back')

//game이 시작하면
function startGame() {
  $stage.innerHTML = `STAGE ${stage}`
  $time.innerHTML = `TIME ${time}`

  settingCard()
  showBack()
  setTimeout(countdown, 2500)
}

//카드 섞기
function shuffle(animalsImg) {
  animalsImg.sort(() => Math.random() - 0.5)
}

// 카드 셋팅
function settingCard() {
  shuffle(animalsImg)
  for (let i=0; i<24; i++) {
    $board.innerHTML = $board.innerHTML + `
    <div class="animals">
      <div class="animal" data-code="${i}" data-value="${animalsImg[i]}">
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>`

    $front[i].style.backgroundImage = `url(/assets/animals/zoo.png)`
    $back[i].style.backgroundImage = `url(/assets/animals/${animalsImg[i]}.png)`
  }
}

// 시작하면 뒷면 보여주고
function showBack() {
  let i = 0
  
  setInterval(function(){
    if(i<24) {
      $front[i].style.transform = `rotateY(${180}deg)`
      $back[i++].style.transform = `rotateY(${0}deg)`
    }
  },50)

  showFront()
}

// 카드를 다시 뒤집을까요?
let isTurn = true
let frontShow = 0
// 다시 앞면
function showFront() {
  frontShow = setInterval(function() {
    if(isTurn){
      for(let i=0; i<24; i++) {
        $front[i].style.transform = `rotateY(${0}deg)`
        $back[i].style.transform = `rotateY(${-180}deg)`
      }
    } else {
      clearInterval(frontShow)
    }
  },2000)
}

// 아직 뒤집지 마세요
let stopFlip = false

$board.addEventListener('click', function(e) {
  isTurn = false
  if (stopFlip) {
    return
  }

  if(e.target.parentElement.className === 'animal'){
    e.target.parentElement.firstElementChild.style.transform = `rotateY(${180}deg)`
    e.target.parentElement.lastElementChild.style.transform = `rotateY(${0}deg)`
  } else {
    return
  }

  let getTarget = getValue(e.target.parentElement)

  if (getTarget.length === 2) {
    stopFlip = true

    flipCard(getTarget)
  }
})


let getTarget = []
function getValue(target) {

  if(stopFlip) {
    return
  } else if (stopFlip === false) {
    getTarget.push(target)
    return getTarget
  }
}

let coincideCard = []
// 카드 두개가 다 뒤집히면 동작
function flipCard(getTarget) {

  console.log(getTarget)
  let firstCard = getTarget[0]
  let secondCard = getTarget[1]
  
  if (firstCard.dataset.value === secondCard.dataset.value && firstCard.dataset.code !== secondCard.dataset.code) {
    firstCard.classList.add('non-show')
    secondCard.classList.add('non-show')

    coincideCard.push(firstCard,secondCard)
    stopFlip = false
    getTarget.length = 0
    if (coincideCard.length === 24) {
      stageClear()
    }
  } else if (firstCard.dataset.value !== secondCard.dataset.value) {
    setTimeout(function() {
      for (let i=0; i<getTarget.length; i++) {
        getTarget[i].firstElementChild.style.transform = `rotateY(${0}deg)`
        getTarget[i].lastElementChild.style.transform = `rotateY(${-180}deg)`
      }
      stopFlip = false
      getTarget.length = 0
    },800)
  } else if (firstCard.dataset.code === secondCard.dataset.code) {
      stopFlip = false
      getTarget.length = 1
  }
}

// 게임 재시작 전 초기화
function init() {
  //배열 초기화
  coincideCard = []

  //stage 올리고
  stage++
  $stage.innerHTML = `STAGE ${stage}`

  //stage당 5초씩 감소
  if(stage < 20) {
    time = 60 - (stage * 5)
  }
  $time.innerHTML = `TIME ${time}`
  //게임판 초기화
  $board.innerHTML = ''
  
  //showfront초기화
  isTurn = true
}


const $nextmodal = document.querySelector('.next-modal')
// stage를 끝내면 동작
function stageClear() {
  clearInterval(frontShow)
  clearInterval(timer)
  $nextmodal.classList.add('show')

  setTimeout(function() {
    $nextmodal.classList.remove('show')
    init()
    startGame()
  },2000)
}

//game이 끝나면 동작
const $overmodal = document.querySelector('.over-modal')
function gameOver() {
  $board.innerHTML = ''
  $overmodal.classList.add('show')
}

//yes를 누르면 동작
const $restart = document.querySelector('.restart')

function reinit() {
  stage = 1
  time = 60
  isTurn = true
  coincideCard = []
}

$restart.addEventListener('click', function() {
  $overmodal.classList.remove('show')
  clearInterval(frontShow)
  clearInterval(timer)
  $time.innerHTML = `TIME ${60}`
  reinit()
  startGame()
})

//no를 누르면 동작
const $end = document.querySelector('.end')

$end.addEventListener('click', function() {
  $overmodal.classList.remove('show')
})

startGame()