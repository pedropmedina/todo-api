import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodosDashboard from '../components/TodosDashboard';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import PageNotFound from '../components/PageNotFound';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/signUp" component={SignUp} />
				<Route path="/dashboard" component={TodosDashboard} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
