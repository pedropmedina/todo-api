import React from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const FormWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	form {
		width: 50rem;
		padding: 4rem 6rem;
		background-color: #dedede;
		border-radius: 0.2rem;
		box-shadow: 0 0.5rem 0.7rem rgba(0, 0, 0, 0.18);

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
			color: #3bafaf;
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
			background-color: #3bafaf;
			color: #fefefe;
			font-size: 1.6rem;
			text-transform: uppercase;
			letter-spacing: 0.1rem;
			margin-top: 1rem;
			outline: none;
			border-radius: 0.2rem;
			box-shadow: 0 0.5rem 0.7rem rgba(0, 0, 0, 0.1);
			transition: all 0.1s;

			&:hover {
				transform: translateY(-0.1rem);
			}

			&:active {
				box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
				transform: translateY(0);
			}
		}
	}

	> div {
		margin-top: 0.5rem;
		padding: 1rem;
		font-size: 1.3rem;
		color: #aeaeae;
		letter-spacing: 0.03rem;
	}
`;

const InvalidField = styled.span`
	display: block;
	padding: 0.7rem;
	margin: -1rem 0 1rem 0;
	background-color: #edcece;
	color: #e8e8e8;
	font-size: 1.2rem;
	letter-spacing: 0.08rem;
	border-radius: 0.2rem;
`;

const Error = InvalidField.extend`
	position: absolute;
	top: -1rem;
	left: 50%;
	font-size: 1.6rem;
	padding: 2rem;
	background-color: transparent;
	color: transparent;
	transform: translateX(-50%);
	transition: all 0.2s;

	${props =>
		props.error &&
		css`
			background-color: #e26f6f;
			color: #fefefe;
			top: 20%;
		`};
`;

const RedirectLink = styled(Link)`
	text-decoration: none;
	color: #3bafaf;
`;

class SignUp extends React.Component {
	state = {
		fields: {
			name: '',
			email: '',
			password: '',
		},
		errFields: {},
		error: '',
	};

	onSubmitForm = async e => {
		e.preventDefault();
		const errFields = this.validateFields();
		this.setState(() => ({ errFields }));
		if (Object.keys(errFields).length) return;

		try {
			const res = await fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify(this.state.fields),
				headers: {
					'content-type': 'application/json',
				},
			});

			if (!res.ok) {
				const error = await res.text();
				this.setState(() => ({ error }));
				return;
			}

			const error = '';
			const fields = {
				name: '',
				email: '',
				password: '',
			};
			this.setState(() => ({ error, fields }));

			const token = res.headers.get('x-auth-token');
			localStorage.setItem('token', token);
			this.props.history.push('/dashboard');
		} catch (ex) {
			console.log(ex);
		}
	};

	onChangeInput = e => {
		const name = e.target.name;
		const val = e.target.value;
		const fields = { ...this.state.fields };
		fields[name] = val;
		this.setState(() => ({ fields }));
	};

	validateFields = () => {
		const { name, email, password } = this.state.fields;
		const errFields = {};
		if (!name) errFields['name'] = 'Name field is required.';
		if (!email) errFields['email'] = 'Email is required.';
		if (!password) errFields['password'] = 'Password is required.';
		return errFields;
	};

	render() {
		const { name, email, password } = this.state.fields;
		return (
			<React.Fragment>
				<Error error={this.state.error}>{this.state.error}</Error>
				<FormWrapper>
					<form onSubmit={this.onSubmitForm}>
						<input
							type="text"
							placeholder="name"
							name="name"
							value={name}
							onChange={this.onChangeInput}
						/>
						<div />
						{this.state.errFields.name && (
							<InvalidField>{this.state.errFields.name}</InvalidField>
						)}
						<input
							type="text"
							placeholder="email"
							name="email"
							value={email}
							onChange={this.onChangeInput}
						/>
						<div />
						{this.state.errFields.email && (
							<InvalidField>{this.state.errFields.email}</InvalidField>
						)}
						<input
							type="password"
							placeholder="password"
							name="password"
							value={password}
							onChange={this.onChangeInput}
						/>
						<div />
						{this.state.errFields.password && (
							<InvalidField>{this.state.errFields.password}</InvalidField>
						)}

						<button>Sign up</button>
					</form>

					<div>
						Have an account? - <RedirectLink to="/">Login!</RedirectLink>
					</div>
				</FormWrapper>
			</React.Fragment>
		);
	}
}

export default withRouter(SignUp);
