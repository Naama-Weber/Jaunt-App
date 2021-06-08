import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from '../cmps/Header.jsx'
import { utilService } from '../services/utilService'
import trips from '../assets/img/trips.jpg'

class _Trips extends Component {


    render() {
        const { orders } = this.props
        return (
            <section className="trips-page">
                <Header />
                <h2>Trips</h2>
                <div className="divider"></div>
                <div className="orders-container grid">
                    {orders.map(order =>
                        <article className="flex column">
                            <img src={order.stay.imgUrls[0]} alt="stay" />
                            <section className="order-details">
                                <div className="dates fs16">{utilService.formatTime(order.startDate)} - {utilService.formatTime(order.endDate)}</div>
                                <h2 className="country fs26">{order.stay.country}</h2>
                                <div className="divider"></div>
                                <div className="fs14 description flex space-between align-center">
                                    <div className="img-container flex">
                                        <img src={order.stay.imgUrls[0]} alt="stay" />
                                    </div>
                                    <div className="flex">{order.stay.name}</div>
                                    <span className="arrow flex  fs30">›</span>
                                </div>
                            </section>
                        </article>
                    )}
                </div>
                <img src={trips} alt="trips" />
            </section>

        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.userModule.orders,
        loggedInUser: state.userModule.loggedInUser
    }
}

export const Trips = connect(mapStateToProps, null)(_Trips)
