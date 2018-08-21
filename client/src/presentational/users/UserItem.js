import React from 'react';
import {NavLink} from 'react-router-dom';
import SampleImage from '../../../assets/images/sample.png';
  
const UserItem = ({userItem}) => { 
	return(
		<div className="box">
			<article className="media">
				<div className="media-left">
				<figure className="image is-64x64">
					<img src={SampleImage} alt="Image"></img>
				</figure>
				</div>
				<div className="media-content">
				<div className="content">
					<p>
					<strong>{userItem.first_name} {userItem.last_name}</strong> <small>{userItem.country_name}</small> <small>31m</small>
					<br></br>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
					</p>
				</div>
				<nav className="level is-mobile">
					<div className="level-left">
					<NavLink to= {`/player/${userItem.id}`} aria-label="like" className="level-item button">View</NavLink>
					<NavLink to= {`/player/${userItem.id}/edit`} className="button">Edit</NavLink>
					</div>
				</nav>
				</div>
			</article>
		</div>
	);
};

export default UserItem;