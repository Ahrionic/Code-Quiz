let firstQ = 0
let score = 0
let timer = 26
let myTimer

let questions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hotdog Tyme Melon Lime', 'Hypertext Markup Language', 'Hip Time Moment Ligma', 'Hippo Truck Molten Lava'],
    answer: 'Hypertext Markup Language',
  },
  {
    question: 'Which of the following is not a coding language?',
    options: ['Html', 'CSS', 'C++','JavaChip'],
    answer: 'JavaChip',
  },
  {
    question: 'You change the contents of a variable.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'How do you declare a constant variable?',
    options: ['let', 'for', 'var', 'const'],
    answer: 'const',
  },

]
const display = () => {
  let i = 0
 
  document.getElementById('quest').innerHTML = 
  `${questions[firstQ].question}`
 

  questions[firstQ].options.forEach(() =>{

    document.getElementById('option').innerHTML +=
    `<ul class="opt" 
        data-option='${questions[firstQ].options[i]}'
        data-answer='${questions[firstQ].answer}'>
         ${questions[firstQ].options[i]} 
    </ul>`
    
    console.log(questions[firstQ].options[i])
    console.log(i)
    i++
  })
}
const quizFinish = () =>{
  if (firstQ === questions.length) {
    
    scoreDisplay()
    clearInterval(myTimer)
    document.getElementById('all').innerHTML = `<h2> Quiz Finished!!🤗 </h2> Your Score: ${score}

    <div class="row">
      <div class="input-field col s6">
      <a> Submit your Intials!</a>
        <input id="initials" type="text"></input>
        <button id="submit" class="btn">Submit</button>
      </div>
      
       <div id="score"> </div>
    </div>`

    document.getElementById('submit').addEventListener('click', event => {
      let saveStats = {
        time: timer,
        initial: document.getElementById('initials').value
      }

      console.log(saveStats)

      if(localStorage.getItem('score')){
        let score = JSON.parse(localStorage.getItem('score'))
        score.push(saveStats)
        localStorage.setItem('score', JSON.stringify(score))
      }else{
        let score = []
        score.push(saveStats)
        localStorage.setItem('score', JSON.stringify(score))
      }

      let score = JSON.parse(localStorage.getItem('score'))
      score.forEach(score => {
        document.getElementById('score').innerHTML += `
        ${score.initial}
        ${score.time}
        <hr> </hr>
        `
      })
    })
  }
  

}

document.addEventListener('click', event =>{
  if(event.target.classList.contains('opt')){
    
    console.log(event.target.dataset.option)
    console.log(event.target.dataset.answer)
    
    if(event.target.dataset.option === event.target.dataset.answer){
      document.getElementById('right').innerHTML = 'Right!'
      document.getElementById('wrong').innerHTML = ''
      document.getElementById('option').innerHTML = ''
      score += 1
      firstQ += 1
    
      quizFinish()
      scoreDisplay()
      display()
    }else{
      document.getElementById('wrong').innerHTML = 'Wrong!'
      document.getElementById('right').innerHTML = ''
      document.getElementById('option').innerHTML = ''
      firstQ += 1
      timer-=5

      quizFinish()
      display()
    }
  }
})

const scoreDisplay = () =>{
  document.getElementById('score').innerHTML = `${score}`
}

const timerFunction = () =>{
  timer -= 1
  document.getElementById('timer').innerHTML = `${timer}`

  if(timer <= 0){
    document.getElementById('all').innerHTML = ` <h2> You Lost!!! 😭 </h2>`
  }
}


document.getElementById('start').addEventListener('click', event =>{
  document.getElementById('quiz').classList.remove('hidden')
  document.getElementById('screen').classList.remove('hidden')
  document.getElementById('label').classList.add('hidden')
  
  myTimer = setInterval(timerFunction, 1000)
  scoreDisplay()
  display()
})