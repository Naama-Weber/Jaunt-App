import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadWishlist } from '../store/actions/wishlistActions'
import { loadUser } from '../store/actions/userActions'
import { Header } from '../cmps/Header.jsx'
import { Link } from 'react-router-dom'
import trips from '../assets/img/trips.jpg'

class _WishList extends Component {

    async componentDidMount() {
    }


    render() {
        const { wishlist } = this.props.loggedInUser
        console.log(wishlist);
        if (!wishlist) return <div>There's nothing to see here</div>
        return (
            <section className="wishlist-page">
                <Header />
                <h2>Wishlist</h2>
                <div className="divider"></div>
                <div className="wishlist-container grid">
                     {wishlist.map(wish =>
                <Link to={`/stay/${wish._id}`} className="primary-btn">
                        <article className="flex column">
                            <img src={wish.imgUrls[0]} alt="stay" />
                            <span className="remove"><i class="fs20 fas fa-trash"></i></span>
                            <section className="wishlist-details">
                                <h2 className="country fs26">{wish.loc.country}</h2>
                                <div className="divider"></div>
                                <div className="fs14 description flex space-between align-center">
                                    <div className="img-container flex">
                                        <img className="small" src={wish.imgUrls[0]} alt="stay" />
                                    </div>
                                    <div className="flex">{wish.name}</div>
                                    <span className="arrow flex  fs30">›</span>
                                </div>
                            </section>
                        </article>
                    </Link>
                    )}
                </div>
                <img src={trips} alt="trips" /> 
            </section>

        )
    }
}

const mapStateToProps = state => {
    return {
        // wishlist: state.userModule.wishlist,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadWishlist,
    loadUser

}

export const WishList = connect(mapStateToProps, mapDispatchToProps)(_WishList)