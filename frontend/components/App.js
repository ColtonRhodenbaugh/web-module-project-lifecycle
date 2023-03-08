import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    completed: true,
  }
  todoNameChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })

  setAxiosResponseErr = err => this.setState({ ...this.state, error: err.response.data.message })

  postTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      this.resetForm()
    })
    .catch(this.setAxiosResponseErr)
  }

  todoFormSubmit = evt => {
    evt.preventDefault()
    this.postTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosResponseErr)
  }

  toggleComplete = id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(td => {
          if (td.id !== id) return td 
          return res.data.data
        })
      })
      })
      .catch(this.setAxiosResponseErr)
  }

  componentDidMount() {
    //fetch all todos from server 
    this.fetchAllTodos()
  }

  toggleCompleted = () => {
    this.setState({ ...this.state, completed: !this.state.completed })
  }

  render() {
    return(
      <div>
        <div id="error"> Error: {this.state.error}</div>
        <h1>Todos:</h1>
        <TodoList 
        todos={this.state.todos}
        completed={this.state.completed}
        toggleComplete={this.toggleComplete}
        />
        <Form
          todoFormSubmit={this.todoFormSubmit}
          todoNameInput={this.state.todoNameInput}
          todoNameChange={this.todoNameChange}
          toggleCompleted={this.toggleCompleted}
          completed={this.state.completed}
        />
        </div>
      
    )
  }
}
