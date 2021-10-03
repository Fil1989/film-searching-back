const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const questions = [
  'What is your name?',
  'Where do you live?',
  'Where are yor from?',
]

const collectAnswers = (questions, done) => {
  const answers = []
  const questionAnswered = answer => {
    answers.push(answer)
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], questionAnswered)
    } else {
      done(answers)
    }
  }
  rl.question(questions[answers.length], questionAnswered)
}

collectAnswers(questions, answers => {
  console.log('Answers of the questions')
  console.log(answers)
  process.exit()
})
