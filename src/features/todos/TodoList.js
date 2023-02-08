import TodoItem from "./TodoItem"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "./TodoApiSlice"

const TodoList = () => {    
    const {        
        data,
        refetch,
        isSuccess,        
    } = useGetTodosQuery('todosList', {
        //pollingInterval: 60000,
        //refetchOnFocus: true,
        //refetchOnWindowFocus : true,
        //refetchOnMountOrArgChange: true
    })

    const [createTodo] = useCreateTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()      
    const [todotitle, setTodotitle] = useState('')
 
    let content;
    if (isSuccess) 
    {
        let ids  = data

    const onAddTodoClicked = async (id) => {
        await createTodo({ title: todotitle, id: 0 })  
        setTodotitle('')
        refetch()
    }

    const onUpdateTodo = async (todo) => {         
        const copy = {...todo}        
        copy.IsCompleted = !copy.IsCompleted;
        await updateTodo({IsCompleted: copy.IsCompleted, Id: copy.Id, Title: copy.Title})        
    }

    const onRemoveTodo = async (id) => {        
        await deleteTodo({id: id})
        refetch()
    }

    const handleAddTodoInput = (e) => setTodotitle(e.target.value)    

    content = (        
        <section className="welcome">
        <div>
            <h1>Todo list</h1>            
            {ids?.length && ids.map(todo=> <TodoItem key={todo.Id} todo={todo} changeTodo={onUpdateTodo} removeTodo={onRemoveTodo}/>)}

            <div className="action-buttons">
                    <label htmlFor="todotitle">Add Todo:</label>
                    <input
                        className="todo__input"
                        type="text"
                        id="todotitle"
                        value={todotitle}
                        onChange={handleAddTodoInput}
                        autoComplete="off"
                        required
                    />

                    <button
                            className="icon-button"
                            title="Add Todo"
                            onClick={onAddTodoClicked}
                    >
                        <FontAwesomeIcon icon={faPlus} color="green"/>
                    </button>
            </div>
        </div>

        </section>
    )

        return content
    }

    return <div></div>    
}

export default TodoList