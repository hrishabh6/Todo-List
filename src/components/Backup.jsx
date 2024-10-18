import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import './TodoList.css';

const TodoList = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todosFromStorage = JSON.parse(todoString);
      setTodos(todosFromStorage);
    }
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() !== "") {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo('');
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (id) => {
    setTodoToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const newTodos = todos.filter(item => item.id !== todoToDelete);
    setTodos(newTodos);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id);
    if (itemToEdit) {
      setTodo(itemToEdit.todo);
      setIsEditing(true);
      setEditingTodoId(id);
    }
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map(item =>
      item.id === editingTodoId ? { ...item, todo } : item
    );
    setTodos(updatedTodos);
    setTodo('');
    setIsEditing(false);
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setTodo('');
    setIsEditing(false);
    setEditingTodoId(null);
  };

  return (
    <div className='container mx-auto bg-green-100 rounded-xl p-5 my-10 min-h-[70vh]'>
      <h1 className='text-xl font-bold text-black'>Your TO-DOs</h1>
      <input
        onChange={handleChange}
        value={todo}
        type="text"
        className='w-1/4 m-3'
        placeholder='Enter A Task!'
      />
      {!isEditing ? (
        <button onClick={handleAdd} className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>ADD</button>
      ) : (
        <>
          <button onClick={handleSaveEdit} className='mx-1 bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>SAVE</button>
          <button onClick={handleCancelEdit} className='mx-1 bg-red-700 hover:bg-red-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>CANCEL</button>
        </>
      )}
      <div className="todos my-3 w-1/2">
        <button onClick={toggleFinished} className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>{showFinished ? 'Hide Finished Tasks' : 'Show Finished Tasks'}</button>
        {todos.map(item => ( (showFinished || !item.isCompleted) &&

          <div key={item.id} className="todo flex gap-5 items-center my-3 w-full justify-between">
            <div className="items flex gap-3 items-center">
              <input
                onChange={handleCheckbox}
                name={item.id}
                type="checkbox"
                className="checkbox h-5 w-5 accent-emerald-600 border-gray-300 rounded focus:ring-green-500"
                checked={item.isCompleted}
              />
              <h1 className={`${item.isCompleted ? "bold-line-through" : ""} text-black font-medium text-lg`}>
                {item.todo}
              </h1>
            </div>
            <div className="buttons flex gap-3">
              <button
                onClick={() => handleEdit(item.id)}
                className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default TodoList;
