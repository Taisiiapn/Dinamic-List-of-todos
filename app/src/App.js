import React from 'react';
import './App.css';
import preparedTodos from './api/getTodos';
import ListOfTodos from './components/ListOfTodos';

class App extends React.Component {

  state = {
    btnLoad: true,
    isLoading: false,
    inputValue: '',
    todos: [],
    copiedTodos: []
  }

  async componentDidMount() {
    const todos = await preparedTodos();
    this.setState({
      todos: todos,
      copiedTodos: todos
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

  // handleInput = (event) => {
  //   const inputValue = event.target.value;
    
  //   this.setState({
  //     inputValue: inputValue,
  //     copiedTodos: this.searchingByName(inputValue)
  //   });
  // }

  // sortBy = (sortField) => {
  //   this.setState({
  //     copiedTodos: [...this.state.todos].sort((todoA, todoB) => {
  //       switch (sortField) {
  //         case 'name': 
  //           return todoA.user.name.localeCompare(todoB.user.name);
  //         case 'title': 
  //           return todoA[sortField].localeCompare(todoB[sortField]);
  //         case 'completed': 
  //           return todoA[sortField] - todoB[sortField];
  //         default:
  //           return this.state.todos;
  //       }
  //     })
  //   })
  // }

  // searchingByName = (inputValue) => {
  //   const preparedInputValue = inputValue.toLowerCase();
    
  //   return [...this.state.todos]
  //     .filter(todo => 
  //       todo.title.toLowerCase().includes(preparedInputValue))
  // }

  handleInput = (event) => {
    const inputValue = event.target.value;
    
    this.setState(({sortField}) => ({
      inputValue: inputValue,
      copiedTodos: this.getSortedFilteredTodos(inputValue, sortField)
    }));
  }

  sortBy = (sortField) => {
    this.setState(({inputValue}) => ({
      sortField,
      copiedTodos: this.getSortedFilteredTodos(inputValue, sortField)
    }));
  } 

  getSortedFilteredTodos = (inputValue, sortField) => {
    const preparedInputValue = inputValue.toLowerCase();
    
    return [...this.state.todos]
      .filter(todo => 
        todo.title.toLowerCase().includes(preparedInputValue))
      .sort((todoA, todoB) => {
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
  }

  render() {
    const { copiedTodos, inputValue } = this.state;
    return (
      <>
        {this.state.btnLoad 
          ? <button className="mean-btn" onClick={this.handleLoadBtn}>
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>

          : <main>
              <h1>List of Todos</h1>

              <div className="input-container">
                <div className="input-search-icon"></div>
                <input className="input" type="search" value={inputValue} 
                  placeholder="Search..." onChange={this.handleInput} />
              </div>

              <ListOfTodos todos={copiedTodos}
                            sortBy={this.sortBy}
              />
            </main>
        }
      </>
    )
  }
};

export default App;