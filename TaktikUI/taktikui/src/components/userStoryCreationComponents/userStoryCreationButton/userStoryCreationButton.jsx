import styles from './UserStoryCreationButton.module.css'

function UserStoryCreationButton({onClick }) {
    return (
        <>
            <button onClick={onClick}>Crear historia de usuario</button>
        </>
    )
}

export default UserStoryCreationButton