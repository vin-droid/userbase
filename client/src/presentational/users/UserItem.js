import React from 'react';
import {NavLink} from 'react-router-dom';
import SampleImage from '../../../assets/images/sample.png';
  
const UserItem = ({userItem}) => {
	const userDetails = Object.keys(userItem).map((key, index) => {
						 <p key = {index}>	userItem[key] </p>
						});
	return(
		<div className="box">
			<article className="media">

				<div className="media-content">
					<div className="content">
						{Object.keys(userItem).map(function(key, index){
		                    return <li key={ index }> <span> {key} </span>: {userItem[key]}</li>;
		                })}
					</div>
					<nav className="level is-mobile">
						<div className="level-left">
							<NavLink to= {`/user/${userItem._id}`} aria-label="like" className="level-item button">View</NavLink>
							<NavLink to= {`/user/${userItem._id}/edit`} className="button">Edit</NavLink>
						</div>
					</nav>
				</div>
			</article>
		</div>
	);
};

export default UserItem;