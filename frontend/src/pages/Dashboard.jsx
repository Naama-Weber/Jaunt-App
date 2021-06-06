import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from '../cmps/Header'
// import {utilService} from '../services/utilService'
import dashboard from '../assets/img/dashboard.png'

class _Dashboard extends Component {


    render() {
        const orders = [
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "yotam",
                img: "https://source.unsplash.com/random/100x100/?face",
                expire: "12 hours",
                desc: "1 guest · Mar 26, 2021 - Mar 27, 2021 · Apartamento reformado para",
                status: "accepted"
            },
        ]
        return (
            <section className="dashboard-page">
                <Header />
                <h2>Pending / Accepted</h2>
                <section className="host-container flex">
                    <div className="reservations">
                        {orders.map((order, idx) =>
                            <div className="res-card flex" key={idx}>
                                <div className="res-img"><img src={order.img} alt={order.name} /> </div>
                                <div className="txt">
                                    <div className="name">Request by: {order.name}</div>
                                    <div className="expire">Expires in {order.expire}</div>
                                    <div className="desc">{order.desc}</div>
                                </div>
                                <div className="status">{order.status}</div>
                            </div>
                        )}
                    </div>
                    <div className="summary">
                        <div className="title">Hosting summary</div>
                        <div className="details flex space-between">
                            <div className="txt">
                                <p className="head">Fantastic job !</p>
                                <div className="main">
                                    <p>Guests love what you're doing.</p>
                                    <p>keep up the great work !</p>
                                </div>
                                <p className="bottom">View details</p>
                            </div>
                            {/* to edit img source */}
                            <div className="v-img"> <img src="http://homeseek-app.herokuapp.com/img/checkmark.0fe4b53e.svg" alt="v-img" /> </div>
                        </div>
                        <div className="earnings-container">
                            <div className="earnings  flex space-between">
                                <div >November earnings</div>
                                <div className="green">2650$</div>
                            </div>
                            <div className="views flex space-between">
                                <div>30-day views</div>
                                <div className="green">751</div>
                            </div>
                        </div>
                        <div className="reviews">
                            <div className="earnings flex space-between">
                                <div >Overall rating</div>
                                <div className="green">4.9 󰀄</div>
                            </div>
                            <div className="views flex space-between">
                                <div>Total reviews
                           </div>
                                <div className="green">751</div>
                            </div>
                        </div>
                        <div className="dashboard flex align-center justify-center">
                            <img src={dashboard} alt={dashboard} />
                        </div>
                    </div>
                </section>
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

export const Dashboard = connect(mapStateToProps, null)(_Dashboard)
