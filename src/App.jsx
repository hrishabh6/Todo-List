import React from "react";
import Navbar from "./components/Navbar"; // Importing the Navbar component
// Importing the TodoList component
import TodoList from "./components/TodoList";
function App() {
  return (
    <>
      <Navbar/>
      <TodoList/>
    </>
  );
}

export default App;
