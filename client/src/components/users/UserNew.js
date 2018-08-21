import React, {Component}  from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {User} from '../../ApiCalls';
import {updateToaster} from '../../actions/shared';
import {UserModel} from '../../models';
import {UserForm} from '../../presentational/users/UserForm';

class UserNew extends Component{

    constructor(props){
        super(props);
        this.state = UserModel
    }
    createUser(e){
        e.preventDefault();
        User.create(this.state)
        .then(data => {
            if (data.errors === undefined){
                this.props.history.push(`/User/${data.user.id}`);
                this.props.updateToaster({open:true, variant: 'success', message: data.meta.message});
            }else{
                this.props.updateToaster({open:true, variant: 'erorr', message: data.errors});
            }
        });
    }

    render(){
        return (
            <div className="container">
                <UserForm state={this.state} context={this} formAction='create' formSubmitHandler={this.createUser}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateToaster
  },dispatch)
)

export default connect(null,mapDispatchToProps)(UserNew);