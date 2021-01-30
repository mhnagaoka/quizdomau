import { useRouter } from 'next/router'
import React, { useState } from 'react'
import db from '../db.json'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import PlayerButton from '../src/components/PlayerButton'
import PlayerInput from '../src/components/PlayerInput'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Widget from '../src/components/Widget'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

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
                  value={name}
                />
                <PlayerButton type="submit" disabled={name.length === 0}>
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
