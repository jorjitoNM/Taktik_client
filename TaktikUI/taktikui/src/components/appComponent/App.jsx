import { useState } from 'react'
import UserStoryCreationButton from '../userStoryCreationComponents/userStoryCreationButton/UserStoryCreationButton'
import './App.css'
import UserStoryCreationModal from '../userStoryCreationComponents/userStoryCreationModal/UserStoryCreationModal'

function App() {
  const [modalOpened, setModalOpened] = useState(false)

  const onClick = () => {
    setModalOpened(true)
  }

  const onClose = () => {
    setModalOpened(false)
  }

  return (
    <>
      <UserStoryCreationButton onClick={onClick}/>
      <UserStoryCreationModal isOpened={modalOpened} onClose={onClose} />
    </>
  )
}

export default App
