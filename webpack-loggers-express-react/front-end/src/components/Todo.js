function Todo(props){
    return (
        <div className={"Todo"+(props.done?' done':'')}>
            <input type="checkbox" onChange={()=>props.toggleDone(props.id)} checked={props.done}/>
            <div className="text">{props.text}</div>
            <div className="date">{props.date}</div>
            <button className="removeButton" onClick={()=>props.removeTodo(props.id)}>X</button>
        </div>
    )
}

export default Todo;