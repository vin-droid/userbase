import React, {Component}  from 'react';
import {User} from '../../ApiCalls';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {updateUserList} from '../../actions/user';
import UserItem from '../../presentational/users/UserItem';


class UserList extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            Users: this.props.users || []
        }
    }

    componentWillMount(){
        User.all(1)
        .then(data => {
            this.props.updateUserList(data.users);
            this.setState({
                users: data.users
            });
        });
    }

    render(){
        const users = this.state.users.map( User => (
                <div key = {User.id}>
                    <UserItem UserItem={User}/>
                </div>
            ))
        return (
            <div className="columns">
                <div className="column">
                <NavLink to='/User' className="button">Create User</NavLink>
                {users}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserList
    },dispatch)
  )
  const mapStateToProps = ({users}) => {
      return {
      users: users
      }
    }
  export default connect(mapStateToProps,mapDispatchToProps)(UserList);