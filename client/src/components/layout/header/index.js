import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import Toaster from '../../Toaster';



class Header  extends Component{

    render(){
        return(
            <div>
                <div>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName='active' to='/'>Home</NavLink></li>
                            <li><NavLink activeClassName='active' to='/users'>Users</NavLink></li>
                        </ul>
                    </nav>
                </div>
            {/* <Toaster toasterOpts={this.props.toasterOpts}/> */}
            </div>
        )
    }
}
const mapStateToProps = ({toasterOpts}) => {
    return {
    toasterOpts: toasterOpts
    }
  } 
export default connect(mapStateToProps)(Header);