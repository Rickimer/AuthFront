import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from "@fortawesome/free-solid-svg-icons"

const TodoItem = ({todo, changeTodo, removeTodo}) => {    
    return <div className='todo-buttons'>
        
        <input type="checkbox" className="todo__checkbox"
            defaultChecked={todo.isCompleted}
            onChange={() => changeTodo(todo)}
        />
        {todo.Title}
        
        <button        
            className="icon-button"
            title="Add Todo"
            onClick={() => removeTodo(todo.Id)}
        >
            <FontAwesomeIcon icon={faRemove} color="red"/>
        </button>
        
        </div>
}

export default TodoItem