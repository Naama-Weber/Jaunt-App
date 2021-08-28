import { Link, NavLink } from 'react-router-dom'

export function UserModal({ loggedInUser, logout, isUserModalShown, openUserModal, closeUserModal }) {

    document.addEventListener("click", (event) => {
        if (event.target.closest('.login-btn')) {
            console.log('open');
            openUserModal()
        }
        else if (isUserModalShown && !event.target.matches('.login-btn')) {
            console.log('close');
            closeUserModal()
        }

    }, false);


    return (
        isUserModalShown&& (

            <div className="user-modal flex column">
                    <ul>
                        {!loggedInUser &&
                            <NavLink to="/login">
                                <li className="login-link">Login</li>
                            </NavLink>
                        }
                        {loggedInUser &&
                            <div className="options-loggedin">
                                {/* <li>Messages</li> */}
                                {loggedInUser && <li>
                                    <b>Hello, {loggedInUser.fullName}</b>
                                </li>}
                                <div className="divider"></div>
                                <li><Link to="/trips">Trips</Link></li>
                                <li><Link to="/wishlist">Wishlist</Link></li>
                                <div className="divider"></div>
                                {loggedInUser.isHost === 'true' &&
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                }
                                {loggedInUser.isHost === 'true' &&
                                    <li><Link to="/myStays">My-Stays</Link></li>
                                }
                            </div>

                        }
                        <div className="divider"></div>

                        {/* <div className="divider"></div> */}
                        {/* <li>Host your home</li> */}
                        {/* <li>Host an experience</li> */}
                        {/* <li>Account</li> */}
                        {/* <li>Help</li> */}
                        {loggedInUser &&
                            <Link to="/">
                                <li onClick={() => logout()}>Log out</li>
                            </Link>}
                    </ul>
                </div>


)
)
}





