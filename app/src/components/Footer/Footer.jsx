import { memo } from 'react'
import { useTodoListMethodsContext } from '../../contexts/TodoListContextProvider'

// eslint-disable-next-line react/display-name
export const Footer = memo(() => {
  console.log('Render Footer')

  const { clearAllTodos } = useTodoListMethodsContext()

  const clearHandler = (e) => {
    clearAllTodos(e, 'hello')
  }

  return (
    <footer className="d-flex justify-content-center">
      <button
        // onClick={clearAllTodos}
        onClick={clearHandler}
        type="button"
        className="btn btn-dark"
      >
        Clear all
      </button>
    </footer>
  )
})
