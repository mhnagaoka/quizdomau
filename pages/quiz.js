import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import db from '../db.json'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import PlayerButton from '../src/components/PlayerButton'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Spinner from '../src/components/Spinner'
import Widget from '../src/components/Widget'

const QuestionImage = styled.img`
  max-width: 100%;
`

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h2>Carregando...</h2>
      </Widget.Header>
      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Spinner />
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  questionNumber,
  totalQuestions,
  question,
  onConfirm,
}) {
  const questionId = `question__${questionNumber}`
  const [selectedOption, setSelectedOption] = useState('')

  // Reseta a resposta selecionada sempre que mudar a pergunta
  useEffect(() => {
    setSelectedOption('')
  }, [questionNumber])

  return (
    <Widget>
      <Widget.Header>
        <h2>
          Pergunta {questionNumber} de {totalQuestions}
        </h2>
      </Widget.Header>
      <Widget.Content>
        <QuestionImage src={question.image} alt={question.title} />
        <h3>{question.title}</h3>
        <p>{question.description}</p>
        <form
          onChange={(evt) => {
            setSelectedOption(evt.target.value)
          }}
          onSubmit={(evt) => {
            evt.preventDefault()
            onConfirm({ selectedOption }, evt)
          }}
        >
          {question.alternatives.map((a, i) => {
            const alternativeId = `alternative__${i}`
            const value = i.toString()
            const checked = selectedOption === value
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                checked={checked}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  value={value}
                  checked={checked}
                />
                {a}
              </Widget.Topic>
            )
          })}
          <PlayerButton
            type="submit"
            colors={db.theme.colors}
            disabled={selectedOption === ''}
          >
            Confirmar
          </PlayerButton>
        </form>
      </Widget.Content>
    </Widget>
  )
}

QuestionWidget.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  question: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
}

const FormattedName = styled.span`
  text-transform: capitalize;
`
function ScoreWidget({ name, correctAnswers, total }) {
  return (
    <Widget>
      <Widget.Header>
        <h2>Quiz concluído</h2>
      </Widget.Header>
      {correctAnswers === 0 && (
        <Widget.Content>
          <QuestionImage src="https://media.giphy.com/media/TJawtKM6OCKkvwCIqX/giphy.gif" />
          <h3>
            Que pena, <FormattedName>{name}</FormattedName>!
          </h3>
          <p>Você não acertou nenhuma resposta.</p>
        </Widget.Content>
      )}
      {correctAnswers !== total && correctAnswers === 1 && (
        <Widget.Content>
          <QuestionImage src="https://media.giphy.com/media/qmfpjpAT2fJRK/giphy.gif" />
          <h3>
            <FormattedName>{name}</FormattedName>,
          </h3>
          <p>você acertou apenas uma resposta.</p>
        </Widget.Content>
      )}
      {correctAnswers !== total && correctAnswers > 1 && (
        <Widget.Content>
          <QuestionImage src="https://media.giphy.com/media/9xijGdDIMovchalhxN/giphy.gif" />
          <h3>
            <FormattedName>{name}</FormattedName>,
          </h3>
          <p>Você acertou {correctAnswers} respostas.</p>
        </Widget.Content>
      )}
      {correctAnswers === total && (
        <Widget.Content>
          <QuestionImage
            src="https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif"
            alt="Fogos de artifício"
          />
          <h3>
            Parabéns, <FormattedName>{name}</FormattedName>!
          </h3>
          <p>Você acertou todas as {total} respostas!</p>
        </Widget.Content>
      )}
    </Widget>
  )
}

ScoreWidget.propTypes = {
  name: PropTypes.string.isRequired,
  correctAnswers: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
}

function countCorrectAnswers(answers) {
  const correctAnswers = db.questions.map((q) => q.answer.toString())
  return correctAnswers.reduce((sum, correct, i) => {
    return answers[i] === correct ? sum + 1 : sum
  }, 0)
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const router = useRouter()
  const { name } = router.query
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answers, setAnswers] = useState([])
  const question = db.questions[questionNumber - 1]
  const totalQuestions = db.questions.length

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1000)
  }, [])

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            question={question}
            onConfirm={({ selectedOption }) => {
              const newAnswers = [...answers]
              newAnswers[questionNumber - 1] = selectedOption
              setAnswers(newAnswers)
              if (questionNumber < totalQuestions) {
                setQuestionNumber(questionNumber + 1)
              } else {
                setScreenState(screenStates.RESULT)
              }
            }}
          />
        )}
        {screenState === screenStates.RESULT && (
          <ScoreWidget
            name={name}
            correctAnswers={countCorrectAnswers(answers)}
            total={totalQuestions}
          />
        )}
        <Footer />
        <GitHubCorner projectUrl="https://github.com/mhnagaoka/quizdomau" />
      </QuizContainer>
    </QuizBackground>
  )
}
