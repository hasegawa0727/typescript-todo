import React from 'react';
import {useState} from 'react'
import logo from './logo.svg';
import {v4 as uuidv4} from 'uuid'
import './App.css';
import TodoForm from './TodoForm';
import {Status, Todo} from './type';
import { isFunctionExpression } from 'typescript';
import ShowTodo from './ShowTodo';
import FilterTodo from './FilterTodo';



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


  const handleEditButton = (todo: Todo) => {
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
      <FilterTodo
        status={filterStatus}
        onSelect={setFilterStatus}
        />

      
      <h1>{isEditing ? "Update Todo" : "Create Todo"}</h1>
      <TodoForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={isEditing ? handleUpdateTodo : handleCreateTodo}
        isEditing={isEditing}
      />

      <ShowTodo
        todos={filteredTodos}
        onEdit={handleEditButton}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
