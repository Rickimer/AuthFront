import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles, isConfirmedEmail} = useAuth()
    
    const include = ((allowedRoles.length === 0) || roles.some(role => allowedRoles.includes(role)))    
    
    const content = (isConfirmedEmail && include) ? <Outlet />
                        : <Navigate to="/login" state={{ from: location }} replace />

    return content
}
export default RequireAuth