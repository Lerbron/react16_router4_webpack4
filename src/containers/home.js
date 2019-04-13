
import React, {Component} from 'react'
import {connect} from 'react-redux';

import  'assets/style.css';
import 'assets/home.scss';
import Header from 'components/Header';
import {requestHomeList} from 'actions/homeList';
import { Button } from 'antd'
import FirstHooks from 'components/hooks'
import SimpleDiagram from 'components/diagrams/simple'

class ChildComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name || '',
			second: ''
		}
	}

	static getDerivedStateFromProps(prevProps, prevState) {
		if (prevProps.name != prevState.name) {
			return{
				name: prevProps.name
			}

		}
		return null	
	}

	componentDidUpdate(prevProps, prevState) {
		let { name } = this.state
		if (name != prevProps.name) {
			this.setState({second: name})
		}
	}

	

	render() {
		return(
			<div>{this.state.name} {this.state.second} <Button type='primary'>button</Button></div>
		)
	}
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			name: 'bruce'
		};
	}

	componentDidMount() {
		window.scrollTo(0, (this.props.page - 1) * 625);
		setTimeout( () => {
			this.setState({ name: 'Lee'})
		}, 2000)
	}

	render() {
		return (
			<div className="homeContainer">
				{/* <Header title='HOME'/> */}
				{/* <p onClick={() => {this.props.history.push('/mine')}}>to mine</p>
				<ChildComponent name={this.state.name} />
				<FirstHooks />
				<div className='box'></div> */}
				<div style={{width: '600px', height: '600px', margin: '0 auto'}}><SimpleDiagram /></div>
			</div>
		)
	}

}


function mapStateToProps(state) {
	return state.homeList;
}

function mapDispatchToProps(dispatch) {
	return {
		fetching: page => dispatch(requestHomeList(page))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default connect(mapStateToProps, mapDispatchToProps)(AsyncGenerator(Home))