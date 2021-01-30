import styled from 'styled-components'
import PropTypes from 'prop-types'

const PlayerInput = styled.input`
  width: 100%;
  height: 3em;
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.contrastText};
  margin-top: 19px;
  margin-bottom: 25px;
  &:focus {
    outline: none;
  }
`

PlayerInput.defaultProps = {
  value: '',
}

PlayerInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

export default PlayerInput
