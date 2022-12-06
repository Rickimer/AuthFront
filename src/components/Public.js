import { Link } from 'react-router-dom'

const Public = () => {
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
            </footer>
        </section>

    )
    return content
}
export default Public