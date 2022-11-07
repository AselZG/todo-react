import "./styles.css";
import { useEffect, useState } from "react";
import Todolist from "./components/Todolist";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [pendingTaskNum, setPendingTaskNum] = useState(0);

  const handleInput = (e) => {
    const value = e.target.value;
    const newValue = value.slice(0, 15);
    setInput(newValue);
  };

  const handleKeyPress = (e) => {
    const copyTodos = [...todos];
    if (e.key === "Enter" && !/^\s*$/.test(input)) {
      // is the regex for empty string or string with only spaces.
      const obj = {
        id: uuidv4(),
        text: input,
        isComplete: false
      };
      setTodos([...copyTodos, obj]);
      setInput("");
    }
  };

  const handleCountPending = () => {
    const copyTodos = [...todos];
    const filteredTodos = copyTodos.filter((todo) => {
      return todo.isComplete === false;
    });
    setPendingTaskNum(filteredTodos.length);
  };
  const handleComplete = (index) => {
    const copyTodos = [...todos];
    copyTodos[index].isComplete = !copyTodos[index].isComplete;
    setTodos([...copyTodos]);
  };

  const hadleDelete = (index) => {
    const copyTodo = [...todos];
    const filteredTodos = copyTodo.filter((todo, i) => {
      return i !== index;
    });
    setTodos(filteredTodos);
  };

  const handleStorage = () => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    setTodos(JSON.parse(sessionStorage.getItem("todos")));
  }, []); //didMount

  useEffect(() => {
    handleCountPending();
    handleStorage();
  }, [todos]); //didUpdate

  return (
    <div className="App">
      <h1>
        Pending Tasks(<span className="pending-task">{pendingTaskNum}</span>)
      </h1>
      <ul className="todo-list">
        {todos.map((todo, index) => {
          return (
            <Todolist
              hadleDelete={hadleDelete}
              todo={todo}
              key={todo.id}
              id={index}
              handleComplete={handleComplete}
            />
          );
        })}
      </ul>
      <input
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="add todo"
        onChange={handleInput}
        value={input}
      />
    </div>
  );
}
