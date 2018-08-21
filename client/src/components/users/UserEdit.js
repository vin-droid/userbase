import React, {Component}  from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {User} from '../../ApiCalls';
import {updateToaster} from '../../actions/shared';
import {userModel} from '../../models';
import {UserForm} from '../../presentational/users/UserForm';

class UserEdit extends Component{

    constructor(props){
        super(props);
        this.state = userModel;
    }
    componentWillMount(){
        User.show(this.props.match.params.userId).
        then(data => {
            let {id, first_name, last_name, state_name} = data.user
            this.setState({
                id,
                first_name,
                last_name,
                state_name
            })
        })
    }
    updateUser(e){
        e.preventDefault();
        User.update(this.state)
        .then(data => {
            if (data.errors === undefined){
                this.props.updateToaster({open:true, variant: 'success', message: data.meta.message, duration: 1000});
                this.props.history.push(`/User/${this.state.id}`);
            }else{
                this.props.updateToaster({open:true, variant: 'erorr', message: data.errors, duration: 2000});
            }
        });
    }

    render(){
        return (
            <div className="container">
                <UserForm state={this.state} context={this} formAction='update' formSubmitHandler={this.updateUser}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateToaster
  },dispatch)
)

export default connect(null,mapDispatchToProps)(UserEdit);