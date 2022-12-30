const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

console.log(screens)

let time = 0
let score = 0
let fullTime = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')


})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn'))
        console.log(event.target)
    time = parseInt(event.target.getAttribute('data-time'))
    fullTime = parseInt(event.target.getAttribute('data-time'))
    console.log(fullTime)
    screens[1].classList.add('up')
    startGame()
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRundomCircle()
    }
})



function startGame() {
    setInterval(decreaseTime, 1000)
    createRundomCircle()


}

function decreaseTime() {

    if (time > 60) {
        let minute = --time
        minute = `0${Math.floor(time / 60)}:${time - Math.floor(time/60)*60}`

        if ((time - Math.floor(time / 60) * 60) < 10) {
            minute = `0${Math.floor(time/60)}:0${time-Math.floor(time/60)*60}`
        }
        setTime(minute)
    } else {
        if (time === 0) {
            finishGame()
        } else {

            let current = --time
            setTime(time)
            if (current < 10) {
                current = `0${current}`
                setTime(current)
            }
        }
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`

}

function finishGame() {
    if (score < Math.floor(fullTime * .8)) {
        board.innerHTML = `<h1><span class="style-score">Рахунок ~ </span><span class="style-score-1"><span class="style-score_0">${score}</span> <br> <i class="fas fa-frown"></i><br><p>Спробуй ще</p></span></h1>`
    } else if (score < Math.floor(fullTime * 1.3)) {
        board.innerHTML = `<h1><span class="style-score">Рахунок ~ </span><span class="style-score-2"><span class="style-score_0">${score}</span> <br> <i class="fas fa-meh"></i><br><p>Ти можеш краще</p></span></h1>`
    } else {
        board.innerHTML = `<h1><span class="style-score">Рахунок ~ </span><span class="style-score-3"><span class="style-score_0">${score}</span> <br> <i class="far fa-smile-beam"></i><br><p>Так тримати!!!</p></span></h1>`
        
    }
    timeEl.parentNode.classList.add('hide')
}

function createRundomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(25, 70)
    const {
        width,
        height
    } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}