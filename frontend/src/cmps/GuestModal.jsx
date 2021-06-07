export function GuestModal({ isModalShown, updateGuestsAmount, guestAmount }) {

    return (
        isModalShown &&
        <div className="guests-modal flex column">
            <div className="adults flex space-between">
                <div className="txt flex column">
                    <p>Adults</p>
                    <p>Ages 13 or above</p>
                </div>
                <div className="btns flex space-between align-center">
                    <button onClick={(ev)=>{ updateGuestsAmount('adults', -1, ev)}}><i className="fas fa-minus"></i></button>
                    <span>{guestAmount.adults}</span>
                    <button onClick={(ev)=>{ updateGuestsAmount('adults', 1, ev)}}><i className="fas fa-plus"></i></button>
                </div>
            </div>
            
            <div className="children flex space-between">
                <div className="txt flex column">
                    <p>Children</p>
                    <p>Ages 2–12</p>
                </div>
                <div className="btns flex space-between align-center">
                <button onClick={(ev)=>{ updateGuestsAmount('children', -1, ev)}}><i className="fas fa-minus"></i></button>
                    <span>{guestAmount.children}</span>
                    <button onClick={(ev)=>{ updateGuestsAmount('children', 1, ev)}}><i className="fas fa-plus"></i></button>
                </div>
            </div>

            <div className="infants flex space-between">
                <div className="txt flex column">
                    <p>Infants</p>
                    <p>Under 2</p>
                </div>
                <div className="btns flex space-between align-center">
                <button onClick={(ev)=>{ updateGuestsAmount('infants', -1, ev)}}><i className="fas fa-minus"></i></button>
                    <span>{guestAmount.infants}</span>
                    <button onClick={(ev)=>{ updateGuestsAmount('infants', 1, ev)}}><i className="fas fa-plus"></i></button>
                </div>
                </div>
        </div>
    )
}





