import { Navigate } from 'react-router-dom';
import { useSelector} from "react-redux";

export const PrivateRoot = ({children}) => {
    const user = useSelector(state => state.session)
    if(true){
        return user.user === "" ? <Navigate to="/auth"/> : children
    }
}
