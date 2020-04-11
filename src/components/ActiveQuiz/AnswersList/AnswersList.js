import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
	<ul className = {classes.AnswersList}>
		{ props.answers.map( (elem, index) => 
			{ return (
				<AnswerItem 
				state={props.state ? props.state[elem.id] : null}
				key={index} 
				answers={elem}
				onAnswerClick={props.onAnswerClick}/>
			)})}

{/* <AnswerItem answers={props.answers}/> */}

	</ul>
)


export default AnswersList