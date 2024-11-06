const express = require("express")
const app = express()
const port = 3000

let tasks = []
let nextTaskId = 1

app.use(express.json())

app.get("/tasks", (req, res) => {
  res.json(tasks)
})

app.post("/tasks", (req, res) => {
  const newTask = {
    id: nextTaskId++,
    title: req.body.title,
    completed: false,
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" })
  }
  tasks[taskIndex] = {
    id: taskId,
    title:
      req.body.title !== undefined && req.body.title !== ""
        ? req.body.title
        : tasks[taskIndex].title,
    completed:
      req.body.completed !== undefined
        ? req.body.completed
        : tasks[taskIndex].completed,
  }

  res.json(tasks[taskIndex])
})

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" })
  }

  tasks = tasks.filter((task) => task.id !== taskId)

  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
