const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

let stage = 1
let time = 60

$stage.innerHTML = `STAGE ${stage}`

function countdown() {
  setInterval(function() {
    console.log(time);
    time--;
    $time.innerHTML = `TIME ${time}`
  },1000) 
}


const animalsImg = 
['whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish',
'whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish']

const $board = document.querySelector('.gameboard')

const $animal = document.getElementsByClassName('.animal')
const $front = document.getElementsByClassName('front')
const $back = document.getElementsByClassName('back')


//카드 섞기
function shuffle(animalsImg) {
  animalsImg.sort(() => Math.random() - 0.5);
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
settingCard()

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
  // setTimeout(countdown, 2000)
}
showBack()

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

$board.addEventListener('click', (e) => {
  isTurn = false
  if (stopFlip) {
    return
  }

  e.target.parentElement.firstElementChild.style.transform = `rotateY(${180}deg)`
  e.target.parentElement.lastElementChild.style.transform = `rotateY(${0}deg)`

  
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




function flipCard(getTarget) {

  console.log(getTarget)
  let firstCard = getTarget[0]
  let secondCard = getTarget[1]
  
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('non-show')
    secondCard.classList.add('non-show')

    stopFlip = false
    getTarget.length = 0
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
