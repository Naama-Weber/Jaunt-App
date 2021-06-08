import { ImgCarousel } from '../cmps/ImgCarousel'
import { Link } from 'react-router-dom'
import { TxtLength } from './TxtLength'

export function StayPreview({ stay }) {
    return (
        <div>
            <article className="stay-preview fs16 flex column">
                <ImgCarousel stay={stay} />
                <Link to={`/stay/${stay._id}`} className="primary-btn">
                    <span className="stay-rate flex">
                        <i className='fa fa-star'></i>
                        <span>{stay.reviews[0].rate}</span>
                        {stay.reviews.length === 1 && <span className="reviews-amount">({stay.reviews.length} review)</span>}
                        {stay.reviews.length > 1 && <span className="reviews-amount">({stay.reviews.length} reviews)</span>}
                    </span>
                    <div className="stay-name"><TxtLength text={stay.name} /> </div>
                    <p className="stay-summery">{`${stay.capacity} guests`} </p>
                    <p className="stay-price">
                        <span><b>${stay.price}</b></span>
                        <span> / night</span>
                    </p>
                    <span className="save-btn"><i className='fa fa-heart-o'></i></span>
                </Link>
            </article>
        </div>
    )
}