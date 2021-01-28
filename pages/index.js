import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'

const PlayerInput = styled.input`
  width: 100%;
  height: 3em;
  background-color: ${({colors}) => colors.mainBg};
  border-radius: 3.5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({colors}) => colors.primary};
  padding:  8px 16px;
  color: ${({colors}) => colors.contrastText};
  &:focus {
    outline: none;
  }
`

const PlayerButton = styled.button`
  width: 100%;
  height: 3em;
  margin-top: 25px;
  text-transform: uppercase;
  font-family: Lato;
  background-color: ${({colors}) => colors.secondary};
  color: ${({colors}) => colors.contrastText};
  border-radius: 4px;
  border: none;
  &:focus {
    outline: none;
  }
`

export default function Home() {
  const router = useRouter()
  const [ name, setName ] = useState('')

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form
                onSubmit={(evt) => {
                  evt.preventDefault()
                  router.push(`/quiz?name=${name}`)
                }}
              >
                <PlayerInput
                  onChange={(evt) => {
                    setName(evt.target.value)
                  }}
                  placeholder="Seu nome"
                  colors={db.theme.colors}
                />
                <PlayerButton type="submit" disabled={name.length === 0} colors={db.theme.colors}>
                  Jogar
                </PlayerButton>
              </form>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/mhnagaoka/quizdomau" />
      </QuizBackground>
    </>
  )
}
