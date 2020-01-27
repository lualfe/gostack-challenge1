const express = require('express')

const server = express()
server.use(express.json())

var projects = []
var counter = 0

server.use((req, res, next) => {
     counter++
     console.log(`Counter: ${counter}`)
     next()
})

function checkID(req, res, next) {
     const { id } = req.params
     let found = false
     projects.map(item => {
          if (item.id == id) {
               found = true
          }
     })
     if (!found) {
          return res.status(400).json({ error: "invalid id" })
     }
     return next()
}

server.get("/projects", (req, res) => {
     return res.json(projects)
})

server.put("/project/:id", checkID, (req, res) => {
     const { id } = req.params
     const { title } = req.body
     projects.map(item => {
          if (item.id == id) {
               item.title = title
          }
     })
     return res.json(projects)
})

server.delete("/project/:id", checkID, (req, res) => {
     const { id } = req.params
     let projectIndex = 0
     projects.map((item, index) => {
          if (item.id == id) {
               projectIndex = index
          }
     })
     projects.splice(projectIndex, 1)
     return res.json(projects)
})

server.post("/project/:id/tasks", checkID, (req, res) => {
     const { id } = req.params
     const { title } = req.body
     projects.map(item => {
          if (item.id == id) {
               item.tasks.push(title)
          }
     })
     return res.json(projects)
})

server.post("/project", (req, res) => {
     projects.push(req.body)
     return res.json(projects)
})

server.listen(3333)