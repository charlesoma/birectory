import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';
import { Provider } from "react-redux";
import { configureStore } from "./store/index";

const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<div>
				<Router>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
				</Router>
			</div>
		</Provider>
	);
}

export default App;
