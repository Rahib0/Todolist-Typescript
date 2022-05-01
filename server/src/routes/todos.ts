import express, { Router } from 'express'
import { displayAllTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo'

export const router: Router = express.Router()

// GET all todos
router.get('/get', displayAllTodos)
// POST
router.post('/post', createTodo)
// UPDATE
router.put('/update/:id', updateTodo)
// DELETE
router.delete('/delete/:id', deleteTodo)