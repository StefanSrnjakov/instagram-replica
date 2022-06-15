import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="nav-item nav-link" to='/'>Home</Link>
                <Link className="nav-item nav-link" to='/hotPhotos'>Hot Photos</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <>
                                    <Link className="nav-item nav-link" to='/publish'>Publish</Link>
                                    <Link className="nav-item nav-link" to='/profile'>Profile</Link>
                                    <Link className="nav-item nav-link" to='/logout'>Logout</Link>
                                </>
                                :
                                <>
                                    <Link className="nav-item nav-link" to='/login'>Login</Link>
                                    <Link className="nav-item nav-link" to='/register'>Register</Link>
                                </>

                        )}
                    </UserContext.Consumer>
                </div>

            </nav>
        </header>
    );
}

export default Header;