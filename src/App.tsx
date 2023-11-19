import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoCard from './components/TodoCard'
import { Itodo } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Itodo[]>([])

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
      {todos.map((x) => <TodoCard key={x.id} todo={x} />)}
      </div>
    </>
  )
}

export default App
