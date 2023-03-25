import classNames from 'classnames';
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

function ModalInner({ closeHandler, children }) {
    useEffect(() => {
        console.log('gsgshhshshhh');
        
        const closeModalByEscape = (e) => {
            if (e.key === "Escape") {
                closeHandler()
               }
            }
    
        document.addEventListener('keydown', closeModalByEscape)   // удаление ненужных обработчиков событий видео 10.01.23 1:25:00
    
        return () => {
            console.log('UseEffect Return');
            document.removeEventListener('keydown', closeModalByEscape)
        }
    }, [])
   
const closeModalByClickX = () => closeHandler()

     return (
     <div className={styles.modalInner}>
        <button 
            type="button" 
            className={classNames(
            "btn",
            "btn-primary",
            "btn-sm",
            styles.closeBtn
            )} 
            onClick={closeModalByClickX}
            >
                X
            </button>
        {children}
     </div>
   )
}

export function Modal({ isOpen, closeHandler, children }) {
console.log({ isOpen, closeHandler });

if (!isOpen) return null
       
const closeModalByClickWrapper = (e) => {
     if (e.target === e.currentTarget) { // Закрытие модалки по клику на серую область видео 10.01.23 01:40:38
        closeHandler()
     }
    }

    return createPortal(
        <div onMouseDown={closeModalByClickWrapper} className={styles.modalWr}> 
        <ModalInner closeHandler={closeHandler}>
            {children}
        </ModalInner>
        </div>,
        document.getElementById('modal-root')
    )
}