const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

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


const animalsImg = 
['whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish',
'whale', 'tiger', 'sheep', 'parrot', 'octopus', 'koala', 'hen', 'giraffe', 'frog', 'fox', 'flamingo', 'clownfish']

const $animals = document.querySelector('.animals')
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
    $animals.innerHTML = $animals.innerHTML + `
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

    } else if (i>24) {
      clearInterval(showBack)
    }
  },50)

  showFront()
}
showBack()

// 다시 앞면
function showFront() {
  setInterval(function() {
    for(let i=0; i<24; i++) {
      $front[i].style.transform = `rotateY(${0}deg)`
      $back[i].style.transform = `rotateY(${-180}deg)`
    }
  },2000)
}


const $board = document.querySelector('.animals')
$board.addEventListener('click', (e) => {
  e.target.parentElement.firstElementChild.style.transform = `rotateY(${180}deg)`
  e.target.parentElement.lastElementChild.style.transform = `rotateY(${0}deg)`

  console.log(e)

  // if (e.target.parentElement.dataset.value === e.target.dataset.value) {
  //   console.log(e.target.dataset.value)
  // }

})
