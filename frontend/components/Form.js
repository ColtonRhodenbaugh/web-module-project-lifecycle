import React from 'react'


export default class Form extends React.Component {
  render() {
    return(
    <>
    <form id="todoForm" onSubmit={this.props.todoFormSubmit}>
          <input 
          value={this.props.todoNameInput} 
          onChange={this.props.todoNameChange} 
          type="text" 
          placeholder="Type todo">
          </input>

          <input type="submit">
          </input>

        </form>
        <button 
        onClick={this.props.toggleCompleted}
        >
          {this.props.completed ? 'Hide' : 'Show'} Clear Completed
        </button>
    </>
    )
  }
}
