import { ImgCarousel } from '../cmps/ImgCarousel'
import { Link } from 'react-router-dom'
import { TxtLength } from './TxtLength'
import Alert from '../cmps/Alert'

export function StayPreview({ stay, loggedInUser, addToWish }) {
    
    
    function add(stay,userId,ev) {
        ev.preventDefault()
        ev.stopPropagation();
         addToWish(stay,userId)      
    }
    

    return (
        <div>
            <article className="stay-preview fs16 flex column">
                <ImgCarousel stay={stay} />
                <Link to={`/stay/${stay._id}`} className="primary-btn">
                    <div className="stay-rate align-center space-between fs14 flex">
                        <span className="left">
                            <i className='fa fa-star'></i>
                            <span className="reviews-rate">{stay.reviews[0].rate}</span>
                            {stay.reviews.length === 1 && <span className="reviews-amount">({stay.reviews.length} review)</span>}
                            {stay.reviews.length > 1 && <span className="reviews-amount">({stay.reviews.length} reviews)</span>}
                        </span>{ }
                        {
                            loggedInUser&&
                            <span onClick={(ev) => add(stay,loggedInUser._id,ev)} className="save-btn right flex"><i className="far fa-heart"> </i></span>
                        }
                    </div>
                    <div className="stay-name fs16"><TxtLength text={stay.name} /> </div>
                    <p className="stay-summery fs16">{`${stay.capacity} guests`} </p>
                    <p className="stay-price fs16">
                        <span><b>${stay.price}</b></span>
                        <span> / night</span>
                    </p>
                </Link>
            </article>
        </div>
    )
}