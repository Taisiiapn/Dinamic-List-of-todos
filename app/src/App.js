import React from 'react';
import './App.css';
import preparedTodos from './api/getTodos';
import ListOfTodos from './components/ListOfTodos';

class App extends React.Component {

  state = {
    btnLoad: true,
    isLoading: false,
    todos: []
  }

  async componentDidMount() {
    const todos = await preparedTodos();
    this.setState({
      todos: todos
    })
  }

  handleLoadBtn = () => {
    this.setState({
      isLoading: true
    })

    setTimeout(() => {
      this.setState({
        btnLoad: false
      })
    }, 1500) 
  }

  sortBy = (sortField) => {
    this.setState({
      todos: this.state.todos.sort((todoA, todoB) => {
        switch (sortField) {
          case 'name': 
            return todoA.user.name.localeCompare(todoB.user.name);
          case 'title': 
            return todoA[sortField].localeCompare(todoB[sortField]);
          case 'completed': 
            return todoA[sortField] - todoB[sortField];
          default:
            return this.state.todos;
        }
      })
    })
  }

  render() {
    const { todos } = this.state;
    return (
      <>
        {this.state.btnLoad ?
          <button className="mean-btn" onClick={this.handleLoadBtn}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button> :

          <ListOfTodos todos={todos}
                        sortBy={this.sortBy}
          />
        }
      </>
    )
  }
};

export default App;