/**
 * Created by admin on 2017/3/3.
 */
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Button } from 'antd'
import FirstHooks from 'components/hooks'


export default class Second extends Component{
	constructor(props){
		super(props);
	}
    render(){
      return(
        <div>
          Mine page
          <Button>djfad</Button>
          <FirstHooks />
        </div>
      )
    }
}