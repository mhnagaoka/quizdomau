// src/components/QuizBackground/index.js
import styled from 'styled-components'

const QuizBackground = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right 10% top 0;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  flex: 1;
  @media screen and (max-width: 500px) {
    background-image: none;
    &:after {
      content: '';
      background-size: contain;
      background-position: right;
      background-repeat: no-repeat;
      background-image: linear-gradient(
          transparent,
          ${({ theme }) => theme.colors.mainBg}
        ),
        url(${({ backgroundImage }) => backgroundImage});
      display: block;
      width: 100%;
      height: 210px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    *:first-child {
      position: relative;
      z-index: 10;
    }
  }
`

export default QuizBackground
