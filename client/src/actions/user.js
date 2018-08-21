import { UPDATE_USER_LIST } from '../constants';

export function updateUserList(users) {
    return {
    'type': UPDATE_USER_LIST,
    users
    }
}