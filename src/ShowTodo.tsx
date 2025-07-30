import React from 'react';
import {Status, statusLabel, Todo} from './type';



type ShowTodoProps = {
    todos: Todo[];
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
}

const ShowTodo: React.FC<ShowTodoProps> = ({todos, onEdit, onDelete}) => {
    return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id}
        style={{color: todo.status === "done" ? "black" : "red"}}
        className='todo-item'>
          <strong>タイトル：　</strong>{todo.title} <br />
          <strong>詳細：　</strong>{todo.detail}<br />
          <strong>ステータス：　</strong>{statusLabel[todo.status]}
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
    );
};

export default ShowTodo;