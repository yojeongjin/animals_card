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

const $board = document.querySelector('.animals')
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
    <div class="animal" data-code="${i}" data-value="${animalsImg[i]}">
      <div class="front"></div>
      <div class="back"></div>
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

  // showFront()
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
  getValue(e.target.parentElement.dataset.value)
})

let openValue = []


function getValue(value,target) {
  openValue.push(value)


  if (openValue.length === 2) {
    stopFlip = true
  }
  flipCard(openValue)
}

function flipCard(openValue) {
  let firstCard = openValue[0]
  let secondCard = openValue [1]
  
  if (firstCard === secondCard) {
    fitstTarget.classList.add('non-show')
    secondTarget.classList.add('non-show')

  } 
}
