import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoCard from './components/TodoCard'
import {Itodo} from './types/todo'

function App() {
  const [todos, setTodos] = useState<todo>([])

  const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_page=1')
    const data= await res.json()
    setTodos(data);
  }
  console.log(todos)

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
     <div>
      {todos.map((x) => <TodoCard key={todo.id} todo={todo} />)}
      </div>
    </>
  )
}

export default App
