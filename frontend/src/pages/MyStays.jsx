import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from '../cmps/Header'
import { socketService } from '../services/socketService'
import { loadUser } from '../store/actions/userActions'

class _MyStays extends Component {


    componentDidMount() {
        this.props.loadUser(this.props.loggedInUser._id)
        console.log(this.props.loggedInUser)
    }

    render() {
        const { houses } = this.props.loggedInUser
        console.log(houses);
        return (
            <section className="my-stays-page">
                <Header />
                <h2>My-Houses</h2>
                <div className="divider"></div>
                <div className="table-box">
                    <table className="houses-table">
                        <tr className="head-row">
                            <th>name</th><th>country</th><th>address</th><th>price</th><th>capacity</th><th>summary</th>
                        </tr>
                        {houses.map((house, idx) => {
                            return (
                                <tr className="data row" key={house.name}>
                                    <td>{house.name}</td>
                                    <td>{house.country}</td>
                                    <td>{house.address}</td>
                                    <td>{house.price}</td>
                                    <td>{house.capacity}</td>
                                    <td>{house.summary}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadUser
}

export const MyStays = connect(mapStateToProps, mapDispatchToProps)(_MyStays)