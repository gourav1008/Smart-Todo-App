import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetols = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    savetols()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    savetols()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetols()
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetols()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    savetols()
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:w-[60vw] lg:w-[30vw] sm:w-[90vw] bg-violet-200 sm:mx-auto  p-5 my-15
    rounded-xl min-h-[80vh]">
      <h1 className='font-bold text-2xl flex justify-center'>Your Smart Manager</h1>
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
        <div className="addtodo flex">
          <input onChange={handleChange} value={todo} className='bg-white w-full h-full rounded-full p-1 px-2' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3}  className='bg-violet-800 h-full hover:bg-violet-900 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 cursor-pointer'>Save</button>
        </div>
        <div className='flex'>
        <input className='my-5 size-5' onChange={toggleFinished} type="checkbox" checked={showFinished} /><p className='text-xl my-2 p-2'>Show Finished</p>
        </div>
        <h2 className='text-lg font-bold  '>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between md:w-full my-3">
                <div className='flex gap-5 text-xl item-center'>
                  <input className='size-4 my-1.5' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><FaEdit/></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><RiDeleteBin5Line /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}

export default App
