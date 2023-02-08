import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {    
    const { login, isConfirmedEmail, isAdmin } = useAuth()

    useTitle(`techNotes: ${login}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {login}!</h1>            
            
            {(isConfirmedEmail && isAdmin) && <p><Link to="/dash/users">View Users Settings</Link></p>}
            {(isConfirmedEmail && isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}
            {(isConfirmedEmail) && <p><Link to="/dash/todos">Todo List</Link></p>}
            {(!isConfirmedEmail) && <p>Need confirmed account. Check you email<Link to="/login">Login</Link></p>}
        </section>
    )

    return content
}
export default Welcome