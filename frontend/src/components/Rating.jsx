import { FaStar,FaStarHalfAlt,FaRegStar } from "react-icons/fa"
const Rating = ({ rating , text }) => {
return (
   <div className="rating">
    {[1,2,3,4,5].map((star) => (
        <span key={star}>
            {rating >= star ? (
                <FaStar color="#f8e825" />
            ) : rating >= star - 0.5 ? (
                <FaStarHalfAlt color="#f8e825" />
            ) : (
                <FaRegStar color="#f8e825" />
            )}
        </span>
    ))}
    <span>{text && text}</span>
    </div>



)
}
export default Rating;