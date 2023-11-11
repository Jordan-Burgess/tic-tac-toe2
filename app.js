const boxElems = document.querySelectorAll('.box')
const turnElem = document.querySelector('.message')
const scoreElems = document.querySelectorAll('.score')
const newElem = document.querySelector('.new')
const score = [0, 0]
const markers = ['X', 'O']
let turn = 0
let count = 0
let active = true

const checkWin = function (place, marker){
    const wins = []
    const winCombos = {
        zero: [[0, 1, 2], [0, 4, 8], [0, 3, 6]],
        one: [[0, 1, 2], [1, 4, 7]],
        two: [[0, 1, 2], [2, 5, 8], [2, 4, 6]],
        three: [[0, 3, 6], [3, 4, 5]],
        four: [[0, 4, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5]],
        five: [[2, 5, 8], [3, 4, 5]],
        six: [[0, 3, 6], [2, 4, 6], [6, 7, 8]],
        seven: [[1, 4, 7], [6, 7, 8]],
        eight: [[0, 4, 8], [6, 7, 8], [2, 5, 8]],
    }
    for(let i=0; i<winCombos[place].length; i++){
        for(let j=0; j<winCombos[place][i].length; j++){
            if(boxElems[winCombos[place][i][j]].innerText != marker){
                wins.push(false)
                break
            }else if(j == 2 && boxElems[winCombos[place][i][j]].innerText == marker){
                wins.push(true)
            }
        }
    }
    return wins.includes(true)
}

const handleWin = function (){
    turnElem.innerText = `${markers[turn]} Won!!`
    score[turn] += 1
    scoreElems[turn].innerText = `${markers[turn]} Wins: ${score[turn]}`
    newElem.style.display = "block"
    active = false
}

const handleDraw = function (){
    turnElem.innerText = `Draw`
    newElem.style.display = "block"
}

const resetGame = function (){
    boxElems.forEach((box)=>{
        box.innerText = ""
    })
    newElem.style.display = "none"
    active = true
    turn = 0
    count = 0
    turnElem.innerText = `X's Turn`
}

boxElems.forEach((box)=>{
    box.addEventListener('click', (event)=>{
        if(event.target.innerText == "" && active){
            event.target.innerText = markers[turn]
            count += 1
            if(checkWin(event.target.id, markers[turn])){
                handleWin()
            }else if(count == 9){
                handleDraw()
            }else{
                turn = 1 - turn
                turnElem.innerText = `${markers[turn]}'s Turn`
            }
        }
    })
})

newElem.addEventListener('click', resetGame)