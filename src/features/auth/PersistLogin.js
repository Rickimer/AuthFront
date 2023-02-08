import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from 'react'
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { setCredentials, selectCurrentToken } from "./authSlice"
import { useDispatch } from 'react-redux'
import '../../config';

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {                    
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {                    
                    await fetch(global.config.app.baseUrl+'/auth/refreshToken', {
                        credentials: 'include'
                      })
                        .then(result => result.json())
                        .then((result) => {            
                            let accessToken = result.accessToken;
                            dispatch(setCredentials({ accessToken }))
                        })
                        .catch(e => {console.log(e);});
                }
                catch (err) {                    
                    console.error(err)                    
                }
            }
            if (!token && persist) verifyRefreshToken()        
    })

    let content    
    if (token) { // persist: no        
        content = <Outlet />
    } else {
        navigate('/login')
    }

    return content
}
export default PersistLogin