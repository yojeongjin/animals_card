//state

const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

let stage = 1
let time = 60

$stage.innerHTML = `STAGE ${stage}`

function countdown() {
  setInterval(function() {
    if(time > 0) {
      time--
      $time.innerHTML = `TIME ${time}`
    } else {
      clearInterval(countdown)
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
  settingCard()
  showBack()
  // setTimeout(countdown, 2000)
}
startGame()


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

// 다시 앞면
function showFront() {
  setInterval(function() {
    if(isTurn){
      for(let i=0; i<24; i++) {
        $front[i].style.transform = `rotateY(${0}deg)`
        $back[i].style.transform = `rotateY(${-180}deg)`
      }
    } else {
      clearInterval(showFront)
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
  
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('non-show')
    secondCard.classList.add('non-show')

    coincideCard.push(firstCard,secondCard)    
    console.log(coincideCard.length)
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
    },900)
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

// stage를 끝내면 동작
function stageClear() {
  init()
  startGame()
}
