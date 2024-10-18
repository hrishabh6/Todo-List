import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import './TodoList.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
    <div className='md:container md:mx-auto my-[50px] w-full bg-green-100 rounded-xl p-5 md:my-10 min-h-[70vh] md:w-1/2'>
      <h1 className='text-center text-2xl font-bold mb-5'><span className='text-gray-700'>Taskit</span> - Your Personalized Task Manager</h1>
      <h1 className='text-xl font-bold text-black'>Your TO-DOs</h1>
      <div className="inputs flex flex-col w-full items-center">
      <input
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAdd(); 
          }}}
        value={todo}
        type="text"
        className=' m-3 w-[95%] p-2 rounded-lg'
        placeholder='Enter A Task!'
      />
      {!isEditing ? (
        <button onClick={handleAdd} className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md  py-1 cursor-pointer text-sm w-[70%] h-[35px]'>ADD</button>
      ) : (
        <>
          <button onClick={handleSaveEdit} className='m-1 bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm w-[70%] h-[35px]'>SAVE</button>
          <button onClick={handleCancelEdit} className='m-1 bg-red-700 hover:bg-red-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm w-[70%] h-[35px]'>CANCEL</button>
        </>
      )}
      </div>
      <div className="todos my-3 w-3/4 my-7">
        <button onClick={toggleFinished} className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md p-2 py-1 cursor-pointer text-sm'>{showFinished ? 'Hide Finished Tasks' : 'Show Finished Tasks'}</button>
        {todos.map(item => ( (showFinished || !item.isCompleted) &&

          <div key={item.id} className="todo flex gap-5 items-center my-3 w-full justify-between">
            <div className="items flex gap-3 items-center w-3/4">
              <input
                onChange={handleCheckbox}
                name={item.id}
                type="checkbox"
                className="checkbox h-5 w-5 accent-emerald-600 border-gray-300 rounded focus:ring-green-500"
                checked={item.isCompleted}
              />
              <h1 className={`${item.isCompleted ? "bold-line-through bg-[#a1ba9d]" : ""} text-black font-medium text-lg w-full break-words`}>
                {item.todo}
              </h1>
            </div>
            <div className="buttons flex gap-3">
              <button
                onClick={() => handleEdit(item.id)}
                className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md py-3 px-4 cursor-pointer text-sm'>
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className='bg-emerald-700 hover:bg-emerald-950 text-white rounded-md py-3 px-4 cursor-pointer text-sm'>
                <MdDelete />
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
