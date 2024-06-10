import { useContext } from 'react';
import { AuthContext } from './AuthContext';
const Onlyadmin = (props) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser?.email === "admin@gmail.com") {
        return (
            props.children
        )
    }
    else if (!currentUser) {
        window.location.href = '../login'
        // return <Navigate to='/Login' />
    }
}
export const Adminlink = (props) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser?.email === "admin@gmail.com") {
        return (
            props.children
        )
    }
    else if (!currentUser) {
        window.location.href = '../login'
        // return <Navigate to='/Login' />
    }
}
export default Onlyadmin