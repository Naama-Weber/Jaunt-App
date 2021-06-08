import { ImgCarousel } from '../cmps/ImgCarousel'
import { Link } from 'react-router-dom'
import { TxtLength } from './TxtLength'

export function StayPreview({ stay }) {
    return (
        <div>
            <article className="stay-preview fs16 flex column">
                <ImgCarousel stay={stay} />
                <Link to={`/stay/${stay._id}`} className="primary-btn">
                    <span className="stay-rate align-center fs14 flex">
                        <i className='fa fa-star'></i>
                        <span className="reviews-rate">{stay.reviews[0].rate}</span>
                        {stay.reviews.length === 1 && <span className="reviews-amount">({stay.reviews.length} review)</span>}
                        {stay.reviews.length > 1 && <span className="reviews-amount">({stay.reviews.length} reviews)</span>}
                    </span>
                    <div className="stay-name fs16"><TxtLength text={stay.name} /> </div>
                    <p className="stay-summery fs16">{`${stay.capacity} guests`} </p>
                    <p className="stay-price fs16">
                        <span><b>${stay.price}</b></span>
                        <span> / night</span>
                    </p>
                    <span className="save-btn"><i className='fa fa-heart-o'></i></span>
                </Link>
            </article>
        </div>
    )
}