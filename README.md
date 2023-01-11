# 💻 Project
* 제목 : 카드 게임
* 기간 : 2022.09.06 - 2022.09.12
* 목적
  * 바닐라 자바스크립트로 토이 프로젝트를 만들어보며 자바스크립트의 기초 문법을 익히기 위함
  * 비동기 프로그램 개념, setInterval, clearInterval 등 내부 API 사용법 학습
* 데모페이지
  * https://curious-pony-b3cb0b.netlify.app/
  
# 🛠 사용기술
<img src="https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-1F8ACB?style=plastic&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=JavaScript&logoColor=fff" /> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=plastic&logo=Netlify&logoColor=fff" />


# 🐰 카드 게임

### 1. 게임 시작

```JavaScript
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

```

게임이 실행되면 ```setInterval``` 함수를 이용하여 0.5초 간격으로 카드의 뒷면을 보여주는 로직이 실행됩니다. setInterval 함수가 종료되면 카드는 모두 앞면으로 뒤집혀집니다.

### 2. 카드 뒤집기

#### 2-1 뒤집기

```JavaScript
...
  if(e.target.parentElement.className === 'animal'){
    e.target.parentElement.firstElementChild.style.transform = `rotateY(${180}deg)`
    e.target.parentElement.lastElementChild.style.transform = `rotateY(${0}deg)`
  } 
...
```

카드를 뒷장에서 앞장으로 뒤집는 경우 카드 뒷장을 Y축 기준으로 180도만큼 회전 시키고, 카드를 앞장에서 뒷장으로 뒤집는 경우
카드 앞장을 Y축 기준으로 -180도만큼 회전시켰습니다.

그리고 카드가 뒤집히는 순간 카드의 뒷면이 보이지 않게 하기 위하여 backface-visibility: hidden 속성을 주었습니다.


#### 2-2 카드 판별

```JavaScript
let frontShow = 0
let stopFlip = false
let getTarget = []

$board.addEventListener('click', function(e) {
  isTurn = false
  if (stopFlip) {
    return
  }
  
  if(e.target.parentElement.className === 'animal'){
  ...
  }
  
  let getTarget = getValue(e.target.parentElement)

  if (getTarget.length === 2) {
    stopFlip = true

    flipCard(getTarget)
  }
})

function getValue(target) {

  if(stopFlip) {
    return
  } else if (stopFlip === false) {
    getTarget.push(target)
    return getTarget
  }
}
```

카드를 뒤집고 난 후 카드를 getTarget 배열에 넣는 함수를 실행시켜 뒤집은 카드를 getTarget 배열에 넣어줍니다. 
그리고 getTarget의 length가 2라면 두번째 선택이라고 판단하여 카드 일치 여부를 판단하는 함수를 실행시켜주었습니다.

#### 2-3 카드 일치여부 확인

```JavaScript
let coincideCard = []
function flipCard(getTarget) {

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
```
getTarget 배열의 요소들을 비교하여 일치하면 coincideCard에 넣어주고 coincideCard의 길이가 24(전체 카드의 갯수)가 되면
모든 카드의 짝을 찾았다고 판단하여 다음 스테이지로 넘어갑니다.
카드의 짝을 맞추지 못한 경우에는 ```setTimeout```함수를 이용하여 0.8초 동안 카드를 보여준 후 다시 뒷면으로 뒤집고 다시 게임을 재개하였습니다.


### 4. 카운트다운 

```JavaScript

let stage = 1
let time = 60
let timer = 0

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

function init() {

...
  //stage당 5초씩 감소
  if(stage < 20) {
    time = 60 - (stage * 5)
  }
...
}

```

게임이 시작되면 60초의 카운트 다운이 시작되고 stage가 올라감에 따라 stage당 시간이 5초씩 감소되는 로직을 구현하였습니다.
또한, 시간이 0초가 되는 시점에 gameOver 함수를 실행시켜 게임이 종료되도록 하였습니다.

---

# 마치는 글

내장 함수에 대해 다시 한번 학습 할 수 있었고, 객체와 배열을 함께 쓰는 방법을 익히며 알고있던 개념들을 최대한 활용 해 볼 수 있었던 프로젝트였습니다.
CSS 미디어쿼리를 이용한 반응형 디자인 적용을 해본 첫번째 프로젝트라 부족한 부분을 알 수 있었고, 그 부분들을 보완해가는 과정에서 자바스크립트 뿐만아니라 css도 다시 한번 학습할 수 있게 되었습니다.

***(프로젝트에 사용된 모든 이미지는 무료 아이콘 사이트인 Flaticon에서 다운받아 사용하였음을 알립니다.)***
