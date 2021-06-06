import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadStays } from '../store/actions/stayActions.js'
import { setDates, setGuestAmount,setLocation } from '../store/actions/orderActions.js'
import { StayList } from '../cmps/StayList'
import { NavBar } from '../cmps/NavBar.jsx'
import { stayService } from '../services/stayService.js'

class _StayApp extends Component {
    state = {
        filterBy: {
            location: '',
        },
        isModalShown: false,
        x: 0,
        y: 0
    }
    componentDidMount() {
        const filterBy = this.getFilterBy();
        this.props.loadStays(filterBy)
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
        const loc = this.getFilterBy().location
        if (!stays) return <div>Loading...</div>
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
        stays: state.stayModule.stays,
        order: state.orderModule.currOrder

    }
}
const mapDispatchToProps = {
    loadStays,
    setDates,
    setGuestAmount,
    setLocation
}

export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
