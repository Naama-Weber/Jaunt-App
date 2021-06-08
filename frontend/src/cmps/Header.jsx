import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserModal } from './UserModal'
import { resetOrder } from '../store/actions/orderActions'
import { onLogout } from '../store/actions/userActions'

class _Header extends Component {
    state = {
        isUserModalShown: false
    }

    toggleUserModal() {
        const { isUserModalShown } = this.state
        this.setState({ isUserModalShown: !isUserModalShown })
    }

    goToHomepage = () => {
        const emptyOrder = {
            location: '',
            startDate: '',
            endDate: '',
            guestAmount: { adults: 0, children: 0, infants: 0 }
        }
        this.props.resetOrder(emptyOrder)
    }

    logout = () => {
        this.props.onLogout()
        this.setState({ isUserModalShown: false })
    }

    render() {
        const { loggedInUser, orders } = this.props;
        const { isUserModalShown } = this.state
        return <header className="flex space-between align-center">
                <div onClick={() => { this.goToHomepage() }} className="logo-container flex space-between">
                    <NavLink exact to="/">
                        <i className="fab fa-airbnb fs34"></i>
                        <span className="fs30" role="img" aria-label="logo">jaunt</span>
                    </NavLink>
                </div>
            <section className="header-nav flex fs14">
                <NavLink to="/stay" >Explore</NavLink>
                <div>Become a Host</div>
                <section />
            </section>
                <section>
                    <button className="login-btn flex space-between align-center" onClick={() => { this.toggleUserModal() }}>
                        <i className="fas fa-bars fs16"></i>
                        {loggedInUser &&
                            <div className="flex">
                                <img className="user-img justify-center" src={loggedInUser.img} alt="user profile" />
                            </div>}
                        {!loggedInUser &&
                            <i className="fas fa-user-circle fs30"></i>
                        }
                    </button>
                    <div className="user-container">
                        {/* {loggedInUser && <span>
                            Hello {loggedInUser.fullName}
                        </span>} */}
                        {isUserModalShown && <UserModal orders={orders} loggedInUser={loggedInUser} logout={this.logout} />}
                    </div>

                </section>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        orders: state.userModule.orders
    }
}
const mapDispatchToProps = {
    resetOrder,
    onLogout
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)