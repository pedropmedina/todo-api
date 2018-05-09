import React from 'react';
import Todo from './Todo';

const TodosColumn = props => {
	return (
		<div>
			<h2>To do</h2>
			<ul>
				{props.todos.map(({ _id, text, completed }) => {
					if (!completed) {
						return <Todo key={_id} text={text} completed={completed} />;
					}
					return false;
				})}
			</ul>
		</div>
	);
};

export default TodosColumn;
