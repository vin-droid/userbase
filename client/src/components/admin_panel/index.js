import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminApi } from '../../ApiCalls';
import { updateToaster } from '../../actions/shared';

class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    uploadFile(e){
        e.preventDefault();
        console.log("get file");
        debugger;
        console.log(this.state.selectedFile);
        AdminApi.uploadUserListFile(this.state.selectedFile)
            .then(data => {
                console.log(data);
                if (data.errors === undefined) {
                    // this.props.history.push(`/User/${data.user.id}`);
                    this.props.updateToaster({ open: true, variant: 'success', message: 'file uploaded' });
                } else {
                    this.props.updateToaster({ open: true, variant: 'erorr', message: 'error occured' });
                }
            });
    }

    fileChangeHanndler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render(){
        return (
            <div>
                <h1>Admin Panel</h1>
                <div>
                    <form onSubmit={(e) => this.uploadFile.bind(this, e)()}>
                        <div className="field">
                            <label className="label">File</label>
                            <div className="">
                                <input className=""
                                    name='file'
                                    type="file"
                                    onChange={this.fileChangeHanndler}
                                />
                            </div>
                        </div>
                        <button className="button is-primary" type='submit'>upload</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateToaster
    }, dispatch)
)
export default connect(null, mapDispatchToProps)(Admin);