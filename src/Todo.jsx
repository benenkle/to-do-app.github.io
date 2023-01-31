import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize cursor-pointer`,
  liValid: `flex justify-between bg-slate-400 p-4 my-2 capitalize cursor-pointer`,
  row: `flex `,
  text: `ml-2 text-lg`,
  textValid: `ml-2 line-through`,
  button: `flex items-center`,
};

const Todo = ({ todo, toggleValid, deleteTodo }) => {
  return (
    <li className={todo.Valid ? style.liValid : style.li} onClick={() => toggleValid(todo)}>
      <div className={style.row} >
        <input
          onChange={() => toggleValid(todo)}
          type="checkbox"
          checked={todo.Valid ? "checked" : ""}
        />
        <p
          className={todo.Valid ? style.textValid : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt size={25} />}</button>
    </li>
  );
};

export default Todo;
