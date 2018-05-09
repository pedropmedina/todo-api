import React, { Component } from 'react';
import DoneColumn from './DoneColumn';
import TodosColumn from './TodosColumn';

class TodosDashboard extends Component {
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
			this.setState(() => ({ todos }));
		} catch (ex) {
			console.log(ex);
		}
	}

	onChangeInput = e => {
		const val = e.target.value;
		const todo = { ...this.state.todo };
		todo.text = val;
		this.setState(() => ({ todo }));
	};

	onSubmitForm = async e => {
		e.preventDefault();

		const res = await fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify(this.state.todo),
			headers: {
				'content-type': 'application/json',
				'x-auth-token': localStorage.getItem('token'),
			},
		});

		if (!res.ok) {
			console.log(res.text());
			return;
		}
		const todo = await res.json();
		const todos = [...this.state.todos, todo];
		this.setState(() => ({ todos }));
	};

	render() {
		const { todos } = this.state;
		return (
			<div>
				<form onSubmit={this.onSubmitForm}>
					<input
						type="text"
						value={this.state.text}
						onChange={this.onChangeInput}
					/>
					<button>Add todo</button>
				</form>
				<TodosColumn todos={todos} />
				<DoneColumn todos={todos} />
			</div>
		);
	}
}

export default TodosDashboard;
