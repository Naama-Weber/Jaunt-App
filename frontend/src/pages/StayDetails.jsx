import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from '../cmps/NavBar'
import { StayMap } from '../cmps/StayMap'
import { SelectDates } from '../cmps/SelectDates'
import { Amenities } from '../cmps/Amenities'
import { Reviews } from '../cmps/Reviews'
import { StayMainInfo } from '../cmps/StayMainInfo.jsx'
import { setStay } from '../store/actions/stayActions'
import { setLocation, setDates, setGuestAmount } from '../store/actions/orderActions'
import { addOrder } from '../store/actions/userActions'
import { CheckAvailability } from '../cmps/CheckAvailability'
import { StayDesc } from '../cmps/StayDesc'
import Alert from '../cmps/Alert'
import { socketService } from '../services/socketService'

class _StayDetails extends Component {
  state = {
    isSecondClick: false,
    startDate: '',
    endDate: '',
    isModalShown: false,
    isChargeShown: false,
    x: 0,
    y: 0
  }

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  async componentDidMount() {
    await this.props.setStay(this.props.match.params.id)
    socketService.emit('topic', this.props.stay.host._id)
  }

  componentWillUnmount() {
    socketService.off('topic')
  }
  

  handleChange = ({ target }) => {
    const { name, value } = target
    const { filterBy } = this.state
    this.setState({
      filterBy: { ...filterBy, [name]: value },
      [name]: value,
      [name]: value
    })
  }

  getAmenitiesIcons = (txt) => {
    switch (txt) {
      case 'TV': return 'fa fa-tv'
      case 'Wifi': return 'fa fa-wifi'
      case 'Kitchen': return 'fa fa-cutlery'
      case 'Smoking allowed': return 'fas fa-smoking'
      case 'Pets allowed': return 'fas fa-paw'
      case 'Parking': return 'fas fa-parking'
      case 'Room service': return 'fas fa-concierge-bell'
      case 'Transportation': return 'fas fa-bus'
      case 'Refrigerator': return 'fas fa-refrigerator'
      case 'Coffee': return 'fas fa-coffee'
      case 'Air conditioning': return 'fas fa-snowflake'
      case 'Bathtub': return 'fas fa-bath'
      case 'Backyard': return 'fas fa-leaf'
      default:
    }
  }

  toggleModal = () => {
    const { isModalShown } = this.state
    this.setState({ isModalShown: !isModalShown })
  }

  changeBtn = () => {
    const { isChargeShown, isSecondClick, x, y } = this.state
    const style = { backgroundPosition: `calc((100 - ${x}) * 1%) calc((100 - ${y}) * 1%)` }
    if (!isChargeShown && !isSecondClick) {
      return <button className="check-btn fs16"
        onMouseMove={this.handleMouseMove}
        style={style}
        onClick={(ev)=> this.toggleCharge(ev)}>
        Check Availability
        </button>
    }  if (isChargeShown && !isSecondClick) {
      return (
        <button className="check-btn fs16"
          onMouseMove={this.handleMouseMove}
          style={style}
          onClick={this.toggleCharge}>
          Reserve
        </button>
      )
    } else if(!isChargeShown && isSecondClick){
      return (
        <span className="reserved-btn fs16">
          Reserved
        </span>
      )
    }

  }

  toggleCharge = (ev) => {
    ev.preventDefault()
    const { isChargeShown,isSecondClick } = this.state
    if (!isChargeShown&&!isSecondClick) {
      this.setState({ isChargeShown: true })
      return
    }
      const updatedOrder = { ...this.props.order }
      updatedOrder.location = this.props.stay.loc.address
      updatedOrder.stay = this.props.stay
      updatedOrder.guest = this.props.loggedInUser
      this.props.setLocation(updatedOrder)
      this.props.addOrder(updatedOrder, this.props.stay.host._id, this.props.loggedInUser._id)
      this.setState({ isSecondClick: true , isChargeShown: false })
    
  }

  getGuestsNum = () => {
    const { adults, children, infants } = this.props.order.guestAmount
    return adults + children + infants
  }

  setDates = (dates) => {
    const [updatedStartDate, updatedEndDate] = dates;
    this.setState({ startDate: updatedStartDate, endDate: updatedEndDate })
    const updatedOrder = { ...this.props.order }
    updatedOrder.startDate = updatedStartDate
    updatedOrder.endDate = updatedEndDate
    this.props.setDates(updatedOrder)
  }

  updateGuestsAmount = (typeOfGuest, diff, ev) => {
    // need to handle case when num is < 0
    ev.stopPropagation();
    ev.preventDefault();
    const updatedOrder = { ...this.props.order }
    updatedOrder.guestAmount[typeOfGuest] += diff
    this.props.setGuestAmount(updatedOrder)
  }

  getTotalDays = (end, start) => {
    if (!end || !start) return
    const diff = end.getTime() - start.getTime()
    const totalDays = diff / (1000 * 60 * 60 * 24)
    return totalDays
  }

  render() {
    const { stay, order, setLocation } = this.props
    const { startDate, endDate,isSecondClick } = this.state
    if (!stay) return <div>loading</div>
    return (
      <section className="stay-details-container main-container">
        <NavBar order={order} setLocation={setLocation} setGuestAmount={this.props.setGuestAmount} setDates={this.props.setDates} startDate={startDate} endDate={endDate} />
        <section className="desc-page">
          <StayMainInfo stay={stay} />
          <section className="description flex">
            <div className="stay-description">
              <StayDesc stay={stay} />
              <div className="divider"></div>
              <section className="details-container">
                <h2>Amenities</h2>
                <Amenities amenities={stay.amenities} getAmenitiesIcons={this.getAmenitiesIcons} />
              </section>
              <div className="divider"></div>
              <section className="details-container">
                <h2>Select dates</h2>
                <SelectDates startDate={startDate} endDate={endDate} setDates={this.setDates} />
              </section>
            </div>
            {isSecondClick && 
            <Alert text="Order has booked successfully, check it on trips page!"/>}
            <CheckAvailability state={this.state} props={this.props} getGuestsNum={this.getGuestsNum} toggleModal={this.toggleModal} toggleCharge={this.toggleCharge} updateGuestsAmount={this.updateGuestsAmount} handleMouseMove={this.handleMouseMove} setDates={this.setDates} changeBtn={this.changeBtn} getTotalDays={this.getTotalDays} />
          </section>
        </section>
        <div className="divider"></div>
        <Reviews reviews={stay.reviews} />
        <div className="divider"></div>
        <section className="map-container">
          <StayMap stay={stay} />
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    stay: state.stayModule.currStay,
    order: state.orderModule.currOrder,
    orders: state.userModule.orders,
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
  setStay,
  setLocation,
  setDates,
  setGuestAmount,
  addOrder
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)