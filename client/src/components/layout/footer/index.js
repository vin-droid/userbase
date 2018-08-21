import React, {Component} from 'react';


class Footer  extends Component{

    render(){
        return(
            <div>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <address>
                            Postal Address: Door No.00, Street, City, State, Country.
                        </address>
                        <p>Copyright © 2018 All rights reserved.</p>
                    </div>
                </footer>
            </div>
        )
    }
}


export default Footer;