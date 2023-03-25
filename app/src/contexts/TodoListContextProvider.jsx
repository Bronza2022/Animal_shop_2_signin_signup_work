import {
  createContext, useContext, useMemo,
} from 'react';
import { useTodos } from './useTodos';

export const TodoListContext = createContext();
export const TodoListMethodsContext = createContext();

export function TodoListContextWrapper({ children }) {
  const {
    todos, ...methods
  } = useTodos();

  const todoListMethods = useMemo(() => methods, []);

  return (
    <TodoListContext.Provider value={todos}>
      <TodoListMethodsContext.Provider value={todoListMethods}>

        {children}

      </TodoListMethodsContext.Provider>
    </TodoListContext.Provider>
  );
}

export const useTodoListContext = () => useContext(TodoListContext);
export const useTodoListMethodsContext = () => useContext(TodoListMethodsContext);
