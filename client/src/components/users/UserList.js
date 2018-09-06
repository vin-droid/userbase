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
            users: this.props.users || []
        }
    }

    componentWillMount(){
        User.all(10, 10)
        .then(data => {
            this.props.updateUserList(data.users);
            this.setState({
                users: data.users
            });
        });
    }

    render(){
        const users = this.state.users.map( User => (
                <div key = {User._id}>
                    <UserItem userItem={User}/>
                </div>
            ))
        return (
            <div className="columns">
                <div className="column">
                <NavLink to='/User' className="button">Create User</NavLink>
                <select>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
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