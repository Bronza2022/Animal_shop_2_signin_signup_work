import classNames from "classnames";
import { useState } from "react";
import { useTodoListMethodsContext } from "../../../../contexts/TodoListContextProvider";
import { Modal } from "../../../Modal/Modal";

export function EditTodoModal({
    setIsEditModalOpen, isOpen, title, id,
})  {
    const { editTodo } = useTodoListMethodsContext();
    const [input, setInput] = useState(title)

    const closelHandler = () => {
    setIsEditModalOpen(false);
  };

  const saveTodo = () => {    
    editTodo(id,{
        title: input,
    })
    closelHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closelHandler}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="d-flex justify-content-center">
        <button
          onClick={closelHandler}
          type="button"
          className={classNames('btn', 'mx-2', 'btn-primary')}
        >
          Close
        </button>
        <button
          disabled={!input} // Добавление условия: если пустой Input, то кнопка Save неактивна. Видео 02:30:00
          onClick={saveTodo}
          type="button"
          className="btn btn-success"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}