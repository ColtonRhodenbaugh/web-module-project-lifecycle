import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
    <>
       {
          this.props.todos.reduce((acc, td) => {
            if (this.props.completed || !td.completed) 
            return acc.concat(
              <Todo 
                key={td.id}
                toggleComplete={this.props.toggleComplete}
                todo={td}
              />
            )
            return acc
          }, [])
        }
    </>
    )
  }
}
