import React from 'react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Button from '@material-ui/core/Button';

export function Reviews({ reviews }) {

    return (
        <section id="any" className="reviews-container details-container flex column ">
            <div className="value-rate flex space-between ">
                <span className="stay-rate flex align-center">
                    <i className='fa fa-star fs18'></i>
                    {reviews.length === 1 && <span className="reviews-amount fs22">{reviews.length} review</span>}
                    {reviews.length > 1 && <span className="reviews-amount fs22">{reviews.length} reviews</span>}
                </span>
            </div>
            <div className="user-reviews flex space-between">

                {reviews.map(review =>
                    <article className="flex column" key={review.id}>
                        <div className="review-by flex align-center">
                            <img className="host-img" src={review.by.imgUrl} alt="host"/>
                            <h4 className="review-name">{review.by.fullname}</h4>
                            {/* <p className="review-date"></p> */}
                        </div>
                        <div className="review-parameters flex column">
                            <p className="review-txt">{review.txt}</p>
                        </div>
                    </article>
                )}
            </div>
            <div className="add-review-container">
                <h3>Add a review</h3>
                <div className="details-container grid">
                    <div className="stars-container flex">
                        <article className="review-ctg flex align-center">
                            <h4>Cleanliness</h4>
                            <Rate />
                        </article>
                        <article className="review-ctg flex align-center">
                            <h4>Accuracy</h4>
                            <Rate />
                        </article>
                        <article className="review-ctg flex align-center">
                            <h4>Communication</h4>
                            <Rate />
                        </article>
                        <article className="review-ctg flex align-center">
                            <h4>Location</h4>
                            <Rate />
                        </article>
                        <article className="review-ctg flex align-center">
                            <h4>Check-in</h4>
                            <Rate />
                        </article>
                        <article className="review-ctg flex align-center">
                            <h4>Value</h4>
                            <Rate />
                        </article>
                    </div>
                    <textarea name="add-review" cols="30" rows="10"></textarea>
                </div>
                    <Button variant="contained" color="secondary">Add review</Button>
            </div>
        </section>

    )
}
