import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import db from '../db.json'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Widget from '../src/components/Widget'

const QuestionImage = styled.img`
  max-width: 100%;
`

const AlternativeButton = styled.button`
  width: 100%;
  height: 3em;
  text-align: left;
  font-family: Lato;
  padding-left: 15px;
  background-color: ${({ colors }) => colors.secondary};
  color: ${({ colors }) => colors.contrastText};
  border-radius: 4px;
  border: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
`

const ConfirmButton = styled.button`
  width: 100%;
  height: 3em;
  text-transform: uppercase;
  font-family: Lato;
  padding-left: 15px;
  background-color: ${({ colors }) => colors.primary};
  color: ${({ colors }) => colors.contrastText};
  border-radius: 4px;
  border: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
`

const Spinner = styled.div`
  margin-left: 100px;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h2>Carregando...</h2>
      </Widget.Header>
      <Widget.Content>
        <Spinner>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </Spinner>
      </Widget.Content>
    </Widget>
  )
}

export default function QuizPage() {
  const router = useRouter()
  const { name, q = 1 } = router.query
  const qNum = parseInt(q, 10)
  const question = db.questions[qNum - 1]
  const count = db.questions.length

  // Isso parece q não funciona direito. Dá pau quando recarrega a página.
  //   useEffect(() => {
  //     // Se não tem nome definido, volta p/ a tela inicial
  //     if (!name) {
  //       router.push('/')
  //     }
  //   })

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <LoadingWidget />
          <Widget>
            <Widget.Header>
              <h2>
                Pergunta {qNum} de {count}
              </h2>
            </Widget.Header>
            <Widget.Content>
              <QuestionImage src={question.image} alt={question.title} />
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <ul>
                {question.alternatives.map((a) => {
                  return (
                    <li>
                      <AlternativeButton colors={db.theme.colors} type="button">
                        {a}
                      </AlternativeButton>
                    </li>
                  )
                })}
              </ul>
              <ConfirmButton
                onClick={() => {
                  router.push(`/quiz?name=${name}&q=${qNum + 1}`)
                }}
                colors={db.theme.colors}
              >
                Confirmar
              </ConfirmButton>
            </Widget.Content>
          </Widget>
          <Footer />
          <GitHubCorner projectUrl="https://github.com/mhnagaoka/quizdomau" />
        </QuizContainer>
      </QuizBackground>
    </>
  )
}
