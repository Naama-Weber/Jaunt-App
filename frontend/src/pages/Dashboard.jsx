import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../cmps/Alert'
import { Header } from '../cmps/Header'
import { utilService } from '../services/utilService'
import dashboard from '../assets/img/dashboard.png'
import { socketService } from '../services/socketService'
import { loadUser } from '../store/actions/userActions'

class _Dashboard extends Component {
    state = {
        reqStatus: 'pending'
    }

    componentDidMount() {
        socketService.emit('topic', this.props.loggedInUser._id)
        socketService.on('load orders', () => this.props.loadUser(this.props.loggedInUser._id))

    }

    componentWillUnmount() {
        socketService.off('load orders')
    }


    acceptedOrders = () => {
        this.state.reqStatus === 'pending' ? this.setState({ reqStatus: 'accepted' }) : this.setState({ reqStatus: 'pending' })
    }

    render() {
        const { incomingOrders } = this.props.loggedInUser
        const acceptedOrders = [
            {
                name: "Jo Michelle",
                img: "https://res.cloudinary.com/dyz2f5gzh/image/upload/v1623042712/Jaunt%20Demo%20Data/boy2_tkk09n.jpg",
                desc: "1 guest ·  22/04/2021-24/04/2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "Megan Brooks",
                img: "https://res.cloudinary.com/dyz2f5gzh/image/upload/v1623042039/Jaunt%20Demo%20Data/megan_gluepb.jpg",
                desc: "2 guest ·  26/04/2021-30/04/2021 · Apartamento reformado para",
                status: "accepted"
            },
            {
                name: "Amanda Levin",
                img: "https://res.cloudinary.com/dyz2f5gzh/image/upload/v1623042124/Jaunt%20Demo%20Data/girl_lnm8jz.webp",
                desc: "2 guest ·  01/05/2021-10/05/2021 · Lovely duplex near the market",
                status: "accepted"
            },
            {
                name: "Arnold Ben Harush",
                img: "https://res.cloudinary.com/dyz2f5gzh/image/upload/v1623042627/Jaunt%20Demo%20Data/boy_ebfvdi.jpg",
                desc: "2 guest ·  05/05/2021-10/05/2021 · Lovely duplex near the market",
                status: "accepted"
            },

        ]
        return (
            <section className="dashboard-page">
                <Header />
                <h2>Pending / Accepted</h2>
                <section className="host-container flex">
                    <section className="all-reservations flex column">
                        <div className="new-reservations">
                            {incomingOrders.map((order, idx) =>
                                <div className="res-card flex" key={idx}>
                                    <div className="res-img"><img src={order.guest.img} alt={order.stay.name} /> </div>
                                    <div className="txt">
                                        <div className="name">Request by: {order.guest.fullName}</div>
                                        <div className="expire">Expires in 12 hours</div>
                                        <div className="desc">{order.guestAmount.adults} guests · {order.stay.name}</div>
                                        {/* · {utilService.formatTime(order.startDate) + '-' + utilService.formatTime(order.endDate)} */}
                                    </div>
                                    {this.state.reqStatus === 'pending' &&
                                        <div className="status pending" onClick={() => this.acceptedOrders()}>{this.state.reqStatus}</div>
                                    }
                                    {this.state.reqStatus === 'accepted' &&
                                        <div className="status" onClick={() => this.acceptedOrders()}>{this.state.reqStatus}
                                            <Alert text="Order accepted" />
                                            {/* {setTimeout(<Alert text="Order accepted" />, 3000)} */}

                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                        <div className="old-reservations">
                            {acceptedOrders.map((order, idx) =>
                                <div className="res-card flex" key={idx}>
                                    <div className="res-img"><img src={order.img} alt={order.name} /> </div>
                                    <div className="txt">
                                        <div className="name">Request by: {order.name}</div>
                                        <div className="expire">Expired</div>
                                        <div className="desc">{order.desc}</div>
                                    </div>
                                    <div className="status">{order.status}</div>
                                    <div className="v-img flex"> <img src="http://homeseek-app.herokuapp.com/img/checkmark.0fe4b53e.svg" alt="v-img" /> </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="summary">
                        <div className="title">Hosting summary</div>
                        <div className="details flex space-between">
                            <div className="txt">
                                <p className="head">Fantastic job!</p>
                                <div className="main">
                                    <p>Guests love what you're doing.</p>
                                    <p>Keep up the great work!</p>
                                </div>
                            </div>
                            <div className="v-img"> <img src="http://homeseek-app.herokuapp.com/img/checkmark.0fe4b53e.svg" alt="v-img" /> </div>
                        </div>
                        <div className="earnings-container">
                            <div className="earnings  flex space-between">
                                <div >June earnings</div>
                                <div className="green">$2,650</div>
                            </div>
                            <div className="views flex space-between">
                                <div>60-day views</div>
                                <div className="green">820</div>
                            </div>
                        </div>
                        <div className="reviews">
                            <div className="earnings flex space-between">
                                <div >Overall rating</div>
                                <div className="green flex"><i className="fa fa-star "></i> <span>4.9</span> </div>
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

const mapDispatchToProps = {
    loadUser
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
