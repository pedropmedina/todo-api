import React from 'react';

const Todo = props => {
	return (
		<li>
			{props.text} <button>X</button>
		</li>
	);
};

export default Todo;
