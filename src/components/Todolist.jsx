import { MdOutlineDoneOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";

function Todolist({ todo, id, hadleDelete, handleComplete }) {
  return (
    <li>
      <span className={todo.isComplete ? "cross" : null}>{todo.text}</span>

      {/* <button className="btn-complete" onClick={() => handleComplete(id)}>Complete
      </button>
      <button className="btn-delete" onClick={() => hadleDelete(id)}>X
      </button> */}
      <div className="icons">
        <MdOutlineDoneOutline
          className="icon-complete"
          onClick={() => handleComplete(id)}
        />
        <GrClose className="icon-delete" onClick={() => hadleDelete(id)} />
      </div>
    </li>
  );
}

export default Todolist;
