import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useGithubLoginMutation } from '../features/auth/authApiSlice'
import { setCredentials } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { useNavigate, } from 'react-router-dom'
import '../config';

const Public = () => {
    const [guthub_login] = useGithubLoginMutation()
    /*const [guthub_login, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useGithubLoginMutation()*/

    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const navigate = useNavigate()

    const Client_ID	= "569e058ccfea13790450"
    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id="+Client_ID);        
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        console.log(code);        
        
        if (code && !token) 
        {
            async function getAccessToken() {                
                //const { accessToken } = await guthub_login({ code }).unwrap()
                const { accessToken } = await guthub_login({ code }).unwrap()
                
                console.log("accessToken="+accessToken);
                dispatch(setCredentials({ accessToken }))
                navigate('/dash')
            }
            getAccessToken();
        }
    }, [guthub_login, dispatch, token, navigate])
    
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Kovalenko Uriy project example!</span></h1>
            </header>
            <main className="public__main">
                <p>Little todo list with jwt authorization.</p>
                <address className="public__addr">
                    phone +7 (910) 493-6485<br />
                    email - russelkov@list.ru<br />
                    Skype - Rickimer<br />                    
                </address>
                <br />
                <p>Owner: Uriy Kovalenko</p>
            </main>
            <footer>
                <Link to="/login">Login</Link>
                <button className="aslink-button" onClick = {loginWithGithub}>
                    Login with Github
                </button>
            </footer>
        </section>

    )
    return content
}
export default Public