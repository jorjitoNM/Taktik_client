import { useEffect, useRef } from "react"

function UserStoryCreationModal({ isOpened, onClose }) {
    const dialogRef = useRef(null)

    useEffect(() => {
        if (dialogRef.current) {
            if (isOpened) {
                dialogRef.current.showModal()
            } else {
                dialogRef.current.close()
            }
        }
    }, [isOpened])

    return (
        <>
            <dialog ref={dialogRef}>
                <h1>Esto es un modal</h1>
                <button onClick={onClose}>Cancelar</button>
            </dialog>
        </>
    )
}

export default UserStoryCreationModal