const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

const animalsImg = ['whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish',
'whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish']

let stage = 1
let time = 60
let isOpen = false

$stage.innerHTML = `STAGE ${stage}`

function timeout() {
  setInterval(function() {
    console.log(time);
    time--;
    $time.innerHTML = `TIME ${time}`
  },1000) 
}
let animalList = [...document.querySelectorAll('.animal')]

function shuffle(animalList) {
  animalList.sort(() => Math.random() - 0.5);
}

function settingCard() {
  for (let i=0; i<24; i++) {
    animalList[i].lastElementChild.style.backgroundImage = `url(/assets/animals/${animalsImg[i]}.png)`
  }
}



function showBack() {
  let i = 0
  setInterval(function(){
    if (animalList[i]) {
      animalList[i].firstElementChild.style.transform = `rotateY(${180}deg)`
      animalList[i].lastElementChild.style.transform = `rotateY(${0}deg)`
      
      i++
    } else if (i>24) {
      clearInterval(showBack)
    }
  },50)
  showFront()
  // timeout()
}

function showFront() {
  setInterval(function() {
    for(let i=0; i<24; i++) {
      animalList[i].firstElementChild.style.transform = `rotateY(${0}deg)`
      animalList[i].lastElementChild.style.transform = `rotateY(${-180}deg)`
    }
  },2000)
}



const $board = document.querySelector('.animals')
$board.addEventListener('click', (e) => {
  e.target.parentElement.firstElementChild.style.transform = `rotateY(${180}deg)`
  e.target.parentElement.lastElementChild.style.transform = `rotateY(${0}deg)`

  if (e.target.parentElement.dataset.value === e.target.dataset.value) {
    console.log(e.target.dataset.value)
  }

})


function gameStart() {
  showBack()
  shuffle(animalList)
  settingCard()
}

window.onload = gameStart()