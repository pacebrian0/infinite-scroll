import React, { FC } from "react";
import { Itodo } from "../types/todo"

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  todo:Itodo;

};

const TodoCard: FC<TodoCardProps> = ({todo, ...props}) => {
  return (
    <p className="todo-card" key={todo.id} {...props}>{todo.title} </p>
  )
}

export default TodoCard