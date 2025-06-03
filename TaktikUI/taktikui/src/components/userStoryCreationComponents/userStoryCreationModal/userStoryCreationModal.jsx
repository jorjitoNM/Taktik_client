import { useEffect, useRef, useState } from "react"
import styles from './userStoryCreationModal.module.css'

function UserStoryCreationModal({ isOpened, onClose }) {
    const dialogRef = useRef(null)
    
    const [titleText, setTitleText] = useState('')

    const [showTitleError, setShowTilteError] = useState(false)

     const [descriptionText, setDescriptionText] = useState('')

    const [showDescriptionError, setShowDescriptionError] = useState(false)

    const titleEventHandler = (event) => {
        const currentTitleTextValue = event.target.value    

        setTitleText(currentTitleTextValue)  
        
        if (currentTitleTextValue.trim() === '') {
            setShowTilteError(true)      
        } else {
            setShowTilteError(false)
        }
    }

    const descriptionEventHandler = (event) => {
        const currentDescriptionTextValue = event.target.value

        setDescriptionText(currentDescriptionTextValue)

        if (currentDescriptionTextValue.trim() === '') {
            setShowDescriptionError(true)
        } else {
            setShowDescriptionError(false)
        }
    }

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
            <dialog onClose={onClose} ref={dialogRef} style={isOpened ? { borderRadius: '8px', width : '500px', height : '270px', display : 'flex', flexDirection : 'column', alignItems: 'center', gap: '38px', justifyContent: 'center' } : {display : 'none'}}>
                <div style={{display : 'flex', flexDirection : 'row', gap : '20px',  width : '100%', justifyContent : 'left', alignItems : 'center'}}>
                    <label htmlFor="title" className={styles['user-story-creation-label']} style={{alignSelf : 'flex-start'}}>Título:</label>
                    <div style={{display : 'flex', flexDirection : 'column'}}>
                        <input type="text" id="title" placeholder="Escribe aquí el título" value={titleText} onChange={titleEventHandler}/>
                        <p style={showTitleError ? {color : 'red', fontSize : '15px'} : {display : 'none'}}>El título no puede estar vacío</p>
                    </div>    
                </div>

                <div style={{display : 'flex', flexDirection : 'row', width : '100%', justifyContent : 'left', alignItems : 'center'}}>
                    <label htmlFor="description" className={styles['user-story-creation-label']}>Descripción:</label>
                </div> 

                <div style={{display : 'flex', flexDirection : 'column'}}>
                    <textarea id="description" style={{resize : 'none'}} placeholder="Describe aquí tu historia de usuario" cols={50} rows={5} onChange={descriptionEventHandler} value={descriptionText}/>
                    <p style={showDescriptionError ? {color : 'red', fontSize : '15px'} : {display : 'none'}}>La descripción no puede estar vacía</p>
                </div>
                
                <div style={{display : 'flex', flexDirection : 'row', width : '100%', gap : '20px',  justifyContent : 'right', alignItems : 'center'}}>
                    <button onClick={onClose}>Aceptar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </dialog>
        </>
    )
}

export default UserStoryCreationModal