import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadStays } from '../store/actions/stayActions.js'
import { setDates, setGuestAmount, setLocation } from '../store/actions/orderActions.js'
import { StayList } from '../cmps/StayList'
import { NavBar } from '../cmps/NavBar.jsx'
import { LoaderCmp } from '../cmps/LoaderCmp'
import { stayService } from '../services/stayService.js'
import { socketService } from '../services/socketService.js'
import { loadUser } from '../store/actions/userActions'

class _StayApp extends Component {
    state = {
        filterBy: {
            location: '',
        },
        isModalShown: false,
        x: 0,
        y: 0,
        isLoading: true
    }
    async componentDidMount() {
        const { loggedInUser } = this.props
        if (loggedInUser) {
            this.props.loadUser(this.props.loggedInUser._id)
        }
        socketService.setup()
        const filterBy = this.getFilterBy();
        await this.props.loadStays(filterBy)
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1500);
    }

    componentDidUpdate(prevProps, prevState) {
        const currLocation = this.getFilterBy().location
        let search = prevProps.location.search;
        let params = new URLSearchParams(search);
        let prevLocation = params.get('loc');
        if (currLocation !== prevLocation) {
            this.props.loadStays(this.getFilterBy())
        }
    }

    // componentWillUnmount() {
    //     socketService.terminate()
    // }


    getFilterBy = () => {
        let search = this.props.location.search;
        let params = new URLSearchParams(search);
        let location = params.get('loc');
        const filterBy = { location }
        return filterBy
    }

    loadStays = (filterBy) => {
        this.props.loadStays(filterBy)
    }

    render() {
        const { stays, order, setDates, setGuestAmount, setLocation } = this.props
        if (this.state.isLoading) return (
            <section style={{minHeight:'100vh'}}>
                <NavBar order={order} setDates={setDates} setGuestAmount={setGuestAmount} setLocation={setLocation} />
                <LoaderCmp />
            </section>
        )
        if (!stays || stays === []) return <div>load</div>
        const loc = this.getFilterBy().location
        return (
            <section className="stay-app">

                <NavBar order={order} setDates={setDates} setGuestAmount={setGuestAmount} setLocation={setLocation} />
                {!loc && <h1 className="headline-explore">Explore all stays</h1>}
                {loc &&
                    <h1 className="headline-explore">Stays in {loc}</h1>
                }
                <StayList stays={stays} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        stays: state.stayModule.stays,
        order: state.orderModule.currOrder

    }
}
const mapDispatchToProps = {
    loadStays,
    setDates,
    setGuestAmount,
    setLocation,
    loadUser
}

export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
