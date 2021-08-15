import { StayPreview } from '../cmps/StayPreview.jsx'

export function StayList({ stays,loggedInUser,addToWishlist }) {
    return (
        <section className="stay-list card-grid">
            {stays.map((stay) => <StayPreview key={stay._id} stay={stay} loggedInUser={loggedInUser} addToWishlist={addToWishlist}/>)}
        </section>
    )
}