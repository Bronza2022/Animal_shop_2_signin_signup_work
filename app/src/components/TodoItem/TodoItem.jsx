import classNames from "classnames";
import { useState } from "react";
import { useTodoListMethodsContext } from "../../contexts/TodoListContextProvider";
import { DeleteTodoModal } from "./Modals/DeleteTodoModal/DeleteTodoModal";
import { EditTodoModal } from "./Modals/EditTodoModal/EditTodoModal";
import styles from "./todoItem.module.css";

export function TodoItem({ title, id, index, completed }) {
  const { changeStatusTodo } = useTodoListMethodsContext(); // Создание действий для кнопок Close, Delete модалки видео 10.01.22 02:01:50

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true);
  };
  const openEditModalHandler = () => {
    setIsEditModalOpen(true);
  };

  const completeHandler = () => {
    changeStatusTodo(id);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className={completed ? styles.done : ""}>
        {index + 1}. {title}
      </span>

      <div>
      <button
          onClick={openEditModalHandler}
          type="button"
          className={classNames(
            "btn",
            "mx-2",
            "btn-warning",
              )}
        >
          Edit
        </button>
        <button
          onClick={completeHandler}
          type="button"
          className={classNames(
            "btn",
            "mx-2",
            { "btn-primary": completed },
            { "btn-success": !completed }
          )}
        >
          {completed ? "Undone" : "Done"}
        </button>
        <button
          onClick={openDeleteModalHandler}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
      <DeleteTodoModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        title={title}
        id={id}
      />
      <EditTodoModal
        isOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        title={title}
        id={id}
      />
    </li>
  );
}
