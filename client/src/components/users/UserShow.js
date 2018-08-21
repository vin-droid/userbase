import React, {Component}  from 'react';
import UserDetails from '../../presentational/users/UserDetails';
import {User} from '../../ApiCalls';
import {UserModel} from '../../models';



class UserShow extends Component{
    
    constructor(props){
        super(props)
        this.state = UserModel
    }


    componentWillMount(){
        User.show(this.props.match.params.userId).
        then(data => {
            let {id, first_name, last_name, state_name, country_name} = data.user
            this.setState({
                id,
                first_name,
                last_name,
                state_name,
                country_name
            })
        })
    }

    render(){
        return (
            <div>
                <UserDetails state={this.state}/>
            </div>
        );
    }
}


export default UserShow;