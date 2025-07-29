import React from 'react';
import {useState} from 'react'
import logo from './logo.svg';
import {v4 as uuidv4} from 'uuid'
import './App.css';
import TodoForm from './TodoForm';
import {Status, Todo} from '../type';
import { isFunctionExpression } from 'typescript';


const statusLabel: {[key in Status]: string} = {
  pending: '未着手',
  'in-progress': '進行中',
  done: '完了'
};


function App() {
  const[todos, setTodos] = useState<Todo[]>([]);
  const[formData, setFormData] = useState<Omit<Todo, 'id'>>({
    title: '',
    detail: '',
    status: 'pending'
  }); 
  const[isEditing, setIsEditing] = useState(false);
  const[editingId, setEditingId] = useState<string | null>(null);
  const[filterStatus, setFilterStatus] = useState('all')


  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  } 

  const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo: Todo = {
      id: uuidv4(),
      title: formData.title.trim(),
      detail: formData.detail.trim(),
      status: formData.status as Status,
    };

    setTodos((prev) => [...prev, newTodo]);
    resetForm();
  }


  const handleEditTodo = (todo: Todo) => {
    setIsEditing(true);
    setFormData({
      title: todo.title,
      detail: todo.detail,
      status: todo.status
    });
    setEditingId(todo.id);

  };


  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(editingId === null) return;

    const updatedTodo: Todo = {
      id: editingId,
      ...formData,
    };

    setTodos((prev) => 
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );

   resetForm();
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  } 


  const resetForm = () => {
    setFormData({
      title: '',
      detail: '',
      status: 'pending'
    });
    setIsEditing(false);
    setEditingId(null);
  }


  const filteredTodos = todos.filter((todo) => {
    if(filterStatus === "all") return true;
    return todo.status === filterStatus;
  })


  return (
    <div className="App">
      <div>
        <label htmlFor='filter'>ステータスで絞り込み</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">全て</option>
          <option value="pending">未着手</option>
          <option value="in-progress">進行中</option>
          <option value="done">完了</option>
        </select>
      </div>

      
      <h1>{isEditing ? "Update Todo" : "Create Todo"}</h1>
      <TodoForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={isEditing ? handleUpdateTodo : handleCreateTodo}
        isEditing={isEditing}
      />


    <ul className='todo-list'>
      {filteredTodos.map((todo) => (
        <li key={todo.id}
        style={{color: todo.status === "done" ? "black" : "red"}}
        className='todo-item'>
          <strong>タイトル：　</strong>{todo.title} <br />
          <strong>詳細：　</strong>{todo.detail}<br />
          <strong>ステータス：　</strong>{statusLabel[todo.status]}
          <button onClick={() => handleEditTodo(todo)}>Edit</button>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default App;
