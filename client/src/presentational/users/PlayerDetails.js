import React from 'react'; 
import { userModel } from '../../models';
import {NavLink} from 'react-router-dom';
const initialState = userModel

export const UserDetails = ({state = initialState}) => (
    <div className='container'>
		<div className="box">
			<article className="media">
				<div className="media-left">
				<figure className="image is-64x64">
					<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"></img>
				</figure>
				</div>
				<div className="media-content">
				<div className="content">
					<strong>{state.first_name} {state.last_name}</strong> <small>{state.country_name}</small>
					<br></br>
                    <p>State: <small>{state.state_name}</small></p>
                    <p>Game:<small>{state.game}</small> </p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
				</div>
				<nav className="level is-mobile">
					<div className="level-left">
					<NavLink to= {`/user/${state.id}/edit`} className="button">Edit</NavLink>
					<NavLink to= {`/user/${state.id}`} className="button">Delete</NavLink>
					</div>
				</nav>
				</div>
			</article>
		</div>
    </div>
)

export default UserDetails;