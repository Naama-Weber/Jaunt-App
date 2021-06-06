import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from '../cmps/Header'
// import {utilService} from '../services/utilService'

class _Dashboard extends Component {


    render() {
        // const { orders } = this.props
        return (
            <section className="dashboard-page">
                <Header/>
                <h2>Pending / Accepted</h2>
                <div className="divider"></div>

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
