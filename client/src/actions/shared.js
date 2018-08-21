import { UPDATE_TOASTER } from '../constants';

/*
* action creators
*/

export function updateToaster(toasterOpts){
	return{
		'type': UPDATE_TOASTER,
		toasterOpts
	}
}