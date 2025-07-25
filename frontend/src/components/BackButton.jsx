import { FaArrowAltCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
        <FaArrowAltCircleLeft /> Back
    </Link>
  )
}
