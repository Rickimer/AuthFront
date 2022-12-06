import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isConfirmedEmail = false
    let isAdmin = false
    let status = "UnConfirmed"
    
    if (token) {
        const decoded = jwtDecode(token)        
        
        let username = decoded.username
        let roles = decoded.roles      
        
        if (!Array.isArray(decoded.roles))
        {
            roles = []
            if ((decoded.roles))
            {
                roles.push(decoded.roles)
            }
        }
                
        isAdmin = roles.includes('Admin')
        isConfirmedEmail = roles.includes('ConfirmedEmail')

        if (isConfirmedEmail) status = "Confirmed"
        if (isAdmin) status = "Admin"        

        return { username, roles, status, isConfirmedEmail, isAdmin }
    }

    return { username: '', roles: [], isConfirmedEmail, isAdmin, status }
}
export default useAuth