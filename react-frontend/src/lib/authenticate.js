import Cookies from 'js-cookie';

export function isAuthenticated () {
    const userID = Cookies.get('userID');
    const authToken = Cookies.get('authToken');
    return (!!userID) && (!!authToken);
};