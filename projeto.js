// TDE 6 - BackEnd 

const express = require('express') 
const app = express() 

app.get('/health', (req, res) => {
    res.json({
        status: 'running'
    }) //retorna o status da aplicação
})

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
}) //porta do servidor


// TDE 7 - BackEnd

const tasks = [] //array de tarefas

app.get('/tasks', (req, res) => { 
    res.json(tasks) //get que retorna todas as tarefas
})

app.post('/tasks', (req, res) => {
    const task = req.body 
    task.id = tasks.length + 1 
    tasks.push(task) 
    res.status(201).json(task) 
}) //post que adiciona uma nova tarefa

app.put('/tasks/:id', (req, res) => { 
    const id = parseInt(req.params.id) //id da tarefa
    const task = tasks.find(t => t.id === id) //busca a tarefa pelo id
    if (task) { //verifica se a tarefa existe
        Object.assign(task, req.body) 
        res.json(task) //retorna a tarefa modificada
    } else { 
        res.sendStatus(404) //retorna erro 404 se a tarefa não for encontrada
    }
}) //put que atualiza uma tarefa existente

app.delete('/tasks/:id', (req, res) => { 
    const id = parseInt(req.params.id) 
    const index = tasks.findIndex(t => t.id === id) 
    if (index !== -1) { 
        tasks.splice(index, 1) 
        res.sendStatus(204) 
    } else { 
        res.sendStatus(404) 
    } 
}) //delete que remove uma tarefa
