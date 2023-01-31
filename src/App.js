import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import db from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `min-h-screen h-full w-screen p-4 bg-gradient-to-r from-[#f7797d] via-[#FBD786] to-[#C6FFDD]`,
  container: `bg-slate-100 max-w-[700px] w-full my-12 m-auto rounded-md shadow-xl p-6`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2 mb-8 `,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  btn: `border p-4 ml-2 bg-orange-400 hover:bg-orange-500 text-slate-100`,
  count: `text-center text-lg p-2 mt-8`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Getting documents from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // updating documents
  const toggleValid = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      Valid: !todo.Valid,
    });
  };

  // Add documents
  const addTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Enter a valid to-do");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      Valid: false,
    });
    setInput("");
  };

  // Delete documents
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>To-do App</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            className={style.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add New Todo"
          />
          <button className={style.btn}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <Todo
            key={todo.id}
              todo={todo}
              toggleValid={toggleValid}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className={style.count}>{`Number of to-dos : ${todos.length}`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
