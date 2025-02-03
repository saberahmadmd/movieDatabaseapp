import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-item">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="titl-and-rating">
        <h1 className="movie-title m-0">{title}</h1>
        <p className="movie-rating mb-0 ms-1">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movies/${id}`} className="button-container">
        <button className="btn btn-outline-success" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
