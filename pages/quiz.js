import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import db from '../db.json'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import QuizContainer from '../src/components/QuizContainer'
import GitHubCorner from '../src/components/GitHubCorner'

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
          <Widget>
            <Widget.Header>
              <h1>
                Pergunta {qNum} de {count}
              </h1>
            </Widget.Header>
            <Widget.Content>
              <QuestionImage src={question.image} alt={question.title} />
              <h1>{question.title}</h1>
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
                onClick={(evt) => {
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
