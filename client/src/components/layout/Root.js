import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';

class Root extends Component {

    render() {
        return (
            <div>
                <Header />
                    {/* <Toaster toasterOpts={this.props.toasterOpts}/> */}
                    {this.props.children}
                <Footer />
            </div>
        )
    }
}
export default Root;