import React, { Component } from 'react';
import DoneColumn from './DoneColumn';
import TodosColumn from './TodosColumn';

class App extends Component {
	state = {
		todos: [],
		todo: {
			text: '',
			completed: false,
		},
	};

	async componentDidMount() {
		try {
			const res = await fetch('/api/todos', {
				method: 'GET',
				headers: {
					'x-auth-token': localStorage.getItem('token'),
				},
			});
			if (!res.ok) {
				console.log(res.text());
				return;
			}
			const todos = await res.json();
			console.log(todos);
		} catch (ex) {
			console.log(ex);
		}
	}

	onChangeInput = () => {};

	render() {
		return (
			<div>
				<input type="text" value={this.state.text} />
				<TodosColumn />
				<DoneColumn />
			</div>
		);
	}
}

export default App;
