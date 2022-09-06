const $stage = document.querySelector('.stage')
const $time = document.querySelector('.time')

let stage = 1
let time = 60

$stage.innerHTML = `STAGE ${stage}`

function timeout() {
  setInterval(function() {
    console.log(time);
    time--;
    $time.innerHTML = `TIME ${time}`
  },1000) 
}

let $animal = document.querySelector('.animal')
let $front = document.querySelector('.front')
let $back = document.querySelector('.back')


const animalList = [...document.querySelectorAll('.animal')]

console.log(animalList)

function show() {
  for(let i=0; i<24; i++) {
    animalList[i].firstElementChild.style.transform = `rotateY(${180}deg)`
    animalList[i].lastElementChild.style.transform = `rotateY(${0}deg)`
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
}
showBack()

function showFront() {
  setInterval(function() {
    for(let i=0; i<24; i++) {
      animalList[i].firstElementChild.style.transform = `rotateY(${0}deg)`
      animalList[i].lastElementChild.style.transform = `rotateY(${-180}deg)`
    }
  },2000)
}
