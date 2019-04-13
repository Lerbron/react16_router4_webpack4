import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch} from 'react-router-dom';
import { Route } from 'react-router';


import Loadable from 'react-loadable';



// 路由切割
const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./containers/home'),
  loading: Loading,
});

const Mine = Loadable({
  loader: () => import('./containers/mine'),
  loading: Loading,
});

const More = Loadable({
  loader: () => import('./containers/more'),
  loading: Loading,
});
const Seller = Loadable({
  loader: () => import('./containers/seller'),
  loading: Loading,
});

export default () => (
	<BrowserRouter>
		<div className='route-container'>
			<div className='tab-container'>
				<NavLink to='/' exact activeClassName='tab-active'>Home</NavLink>
				<NavLink to='/seller' activeClassName='tab-active'>Seller</NavLink>
				<NavLink to='/mine' activeClassName='tab-active'>Mine</NavLink>
				<NavLink to='/more' activeClassName='tab-active'>More</NavLink>
			</div>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/mine' component={Mine} />
				<Route path='/more' component={More} />
				<Route path='/seller' component={Seller} />
			</Switch>
		</div>
	</BrowserRouter>
)