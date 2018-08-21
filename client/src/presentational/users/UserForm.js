import React from 'react'; 
import { userModel } from '../../models';
import {fieldChangeHandler} from '../../CommonHelper';
const initialState = userModel;




function resetForm(e){
    e.target.form.reset();
}
export const UserForm = ({state = initialState, context, formAction, formSubmitHandler}) => (
    <form onSubmit={(e) => formSubmitHandler.bind(context,e)()} >
    <div className="field">
        <label className="label">First Name</label>
        <div className="control">
            <input className="input"
                name='first_name'
                type="text" 
                placeholder="Enter first name" 
                value={state.first_name} 
                onChange={(e) => {return fieldChangeHandler.call(context,e);}}
            />
        </div>
    </div>
    <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
            <input className="input"
                name='last_name'
                type="text" 
                placeholder="Enter last name" 
                value={state.last_name} 
                onChange={(e) => fieldChangeHandler.call(context,e)}
            />
        </div>
    </div>
    <div className="field">
        <label className="label">State</label>
        <div className="control">
            <input className="input"
                name='state_name'
                type="text" 
                placeholder="Enter state" 
                value={state.state_name} 
                onChange={(e) => fieldChangeHandler.call(context,e)}
            />
        </div>
    </div>
    <div className="field">
        <label className="label">Country</label>
        <div className="control">
            <input className="input"
                name='country_name'
                type="text" 
                placeholder="Enter country name" 
                value={state.country_name} 
                onChange={(e) => fieldChangeHandler.call(context,e)}
            />
        </div>
    </div>
    <div className="field">
        <label className="label">Game</label>
        <div className="control">
            <input className="input"
                name='game'
                type="text" 
                placeholder="Enter country name" 
                value={state.game} 
                onChange={(e) => fieldChangeHandler.call(context,e)}
            />
        </div>
    </div>
    <div className="control">
        <button className="button is-primary" type='submit'>{formAction.toCamelCase()}</button>
        <button className="button is-primary" type='button' onClick={(e) => resetForm(e)}>Reset</button>    
    </div>
</form>
)

export default UserForm;