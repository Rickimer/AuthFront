import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {
    
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')
    
    const [repeatPassword, setRepeatPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [validUsername, setValidUsername] = useState(false)    
    const [equalPasswords, setEqualPasswords] = useState(false)
    const [persist, setPersist] = usePersist()    

    useTitle('Register')

    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        setErrMsg('');
    }, [username, password])
    
    useEffect(() => {        
           setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {        
            setValidPassword(PWD_REGEX.test(password))
            setEqualPasswords(password === repeatPassword)        
    }, [password, repeatPassword])
    
    let canSave = [validUsername, validPassword, equalPasswords].every(Boolean)    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {                        
            await register({ username, password, email }).unwrap()            
            setUsername('')
            setPassword('')
            setEmail('')            
            navigate('/dash')            
        } catch (err) {            
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.status === 409) {
                setErrMsg(err.data?.message ?? err.data);
            } else {
                setErrMsg('Server error');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleRepeatPwdInput = (e) => setRepeatPassword(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)

    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public">
            <header>
                <h1>Register</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"                        
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="email"                        
                        value={email}
                        onChange={handleEmailInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    
                    <label htmlFor="repeat_password">Confirm password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="repeat_password"
                        onChange={handleRepeatPwdInput}
                        value={repeatPassword}
                        required
                    />                    

                    <button className="form__submit-button" disabled={!canSave}>Register</button>
                    
                    <Link to="/login">to LogIn</Link>                        

                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Register