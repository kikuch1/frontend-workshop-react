import { FormEvent, useState } from "react"

type Task = {
  id: string,
  title: string,
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const task: Task = {
      id: crypto.randomUUID(),
      title: input,
      completed: false
    }

    setTasks([...tasks, task])
    setInput("")
  }

  function handleCheckboxChange(task: Task) {
    setTasks((tasks) => {
      return tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    })
  }

  return (
    <>
      <h1>ToDoアプリ</h1>

      {tasks.length > 0 ?
        <>
          <h2>My Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(task)}></input>
                {task.completed ? <s>{task.title}</s> : task.title}
              </li>
            ))}
          </ul>
        </> : <p>タスクを追加してください！</p>}

      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)}></input>
        <button type="submit">Button</button>
      </form>
    </>
  )
}

export default App
