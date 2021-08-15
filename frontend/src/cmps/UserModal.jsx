import { Link, NavLink } from 'react-router-dom'

export function UserModal({ loggedInUser, logout }) {
    return (
        <div className="user-modal flex column">
            <ul>
                {!loggedInUser &&
                    <NavLink to="/login">
                        <li className="login-link">Login</li>
                    </NavLink>
                }
                {loggedInUser &&
                    <div className="options-loggedin">
                        <li>Messages</li>
                        <li><Link to="/trips">Trips</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        {loggedInUser.isHost === 'true' &&
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        }
                    </div>
                }
                <div className="divider"></div>
                <li>Host your home</li>
                <li>Host an experience</li>
                <li>Account</li>
                <div className="divider"></div>
                <li>Help</li>
                <Link to="/">
                    <li onClick={() => logout()}>Log out</li>
                </Link>
            </ul>
        </div>
    )
}





