import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
	width: 50rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 4rem 6rem;
	background-color: #dedede;

	> * {
		width: 100%;
	}

	> input {
		height: 5rem;
		text-indent: 1rem;
		font-size: 1.6rem;
		border: none;
		border-bottom: 0.2rem solid #fefefe;
		background-color: inherit;
		color: #fefefe;
		outline: none;
		position: relative;

		&::placeholder {
			color: #fefefe;
		}

		&:focus {
			background-color: #cecece;
		}

		&:focus + div::after {
			transform: scaleX(1);
			background-color: #318c8c;
		}
	}

	> div {
		width: 100%;
		background-color: inherit;
		height: 0.5rem;
		display: block;
		margin-bottom: 2rem;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 0.3rem;
			margin-top: -0.2rem;
			background-color: transparent;
			transform: scaleX(0);
			transform-origin: center;
			transition: all 0.3s;
		}
	}

	> button {
		padding: 1.5rem;
		border: none;
		background-color: #aeaeae;
		color: #fefefe;
		font-size: 1.6rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		margin-top: 1rem;
	}
`;

class SignUp extends React.Component {
	state = {
		fields: {
			name: '',
			email: '',
			password: '',
		},
		errFields: {},
	};

	onSubmitForm = () => {
		// code here
	};

	render() {
		const { name, email, password } = this.state.fields;
		return (
			<Form action="#" onSubmit={this.onSubmitForm}>
				<input type="text" placeholder="name" value={name} />
				<div />
				<input type="text" placeholder="email" value={email} />
				<div />
				<input type="text" placeholder="password" value={password} />
				<div />
				<button>Sign up</button>
			</Form>
		);
	}
}

export default SignUp;
