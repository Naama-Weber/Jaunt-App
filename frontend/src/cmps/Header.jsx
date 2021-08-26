import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserModal } from './UserModal'
import { resetOrder } from '../store/actions/orderActions'
import { onLogout } from '../store/actions/userActions'
import { AddHomeModal } from "./AddHomeModal";

class _Header extends Component {
    state = {
        isUserModalShown: false,
        isModalOpen: false
    }

    // async componentDidMount(){
    //     const { isUserModalShown } = this.state
    //     this.setState({isUserModalShown:false})
    //     console.log(isUserModalShown);
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.isUserModalShown !== this.state.isUserModalShown) {
    //       console.log('pokemons state has changed.')
    //     }
    //   }

    toggleModal = () => {
        const { isModalOpen } = this.state
        this.setState({ isModalOpen: !isModalOpen })
        console.log(isModalOpen);
    }

    // openUserModal() {
    //     this.setState({ isUserModalShown: true })
    // }

    // closeUserModal() {

    //     this.setState({ isUserModalShown: false })
    // }

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
        const { isUserModalShown, isModalOpen } = this.state
        return <header className="flex space-between align-center">
            <div onClick={() => { this.goToHomepage() }} className="logo-container flex space-between">
                <NavLink exact to="/">
                    <i className="fab fa-airbnb fs34"></i>
                    <span className="fs30" role="img" aria-label="logo">jaunt</span>
                </NavLink>
            </div>
            <section className="header-nav flex fs16">
                <NavLink to="/stay" >Explore</NavLink>
                {loggedInUser ?
                <NavLink to="/add" >Become a Host</NavLink> : 
                <NavLink to="/login" >Become a Host</NavLink>
                }
                {/* <span className="hover" onClick={() => this.toggleModal()}>Become a Host</span>
                <AddHomeModal isOpen={isModalOpen} toggle={this.toggleModal}>
                    <h1>test</h1>
                    <p>Other text that describes what is happening</p>
                    <button onClick={() => this.toggleModal(false)}>toggle</button>
                </AddHomeModal> */}
                {/* <div>Become a Host</div> */}

                <section />
            </section>
            <section>
                <button className="login-btn flex space-between align-center" onClick={() => this.toggleModal()} >
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
                    {
                        isModalOpen &&
                        <UserModal orders={orders} loggedInUser={loggedInUser} logout={this.logout} toggleModal={this.toggleModal} isUserModalShown={isUserModalShown} />
                    }
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