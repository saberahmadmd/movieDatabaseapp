import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'
import CastGrid from '../CastGrid'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    status: diffStates.inProgress,
    movieDetailsData: {},
  }

  componentDidMount() {
    this.fetchMovieData()
  }

  fetchMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const MOVIE_ID = id
    const API_KEY = '6705266e964c3b5139a4240fb66a7015'
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch movie data')
      }
      const responseData = await response.json()

      const updatedData = {
        adult: responseData.adult,
        backdropPath: responseData.backdrop_path,
        genreIds: responseData.genre_ids,
        id: responseData.id,
        originalLanguage: responseData.original_language,
        originalTitle: responseData.original_title,
        overview: responseData.overview,
        popularity: responseData.popularity,
        posterPath: responseData.poster_path,
        releaseDate: responseData.release_date,
        title: responseData.title,
        video: responseData.video,
        runtime: responseData.runtime,
        voteAverage: responseData.vote_average,
        voteCount: responseData.vote_count,
        tagline: responseData.tagline,
        genres: responseData.genres,
      }

      this.setState({
        status: diffStates.success,
        movieDetailsData: updatedData,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({status: diffStates.fail})
    }
  }

  renderSuccessView = () => {
    const {movieDetailsData} = this.state
    const {
      title,
      tagline,
      overview,
      backdropPath,
      posterPath,
      releaseDate,
      originalLanguage,
      voteAverage,
      runtime,
      genres,
    } = movieDetailsData

    const imgUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`
    const imgUrlLg = `https://image.tmdb.org/t/p/w500/${posterPath}`

    return (
      <>
        <div className="specific-container">
          <img className="specific-img-sm" src={imgUrl} alt="specific-img" />
          <img className="specific-img-lg" src={imgUrlLg} alt="specific-img" />
          <div className="content-container">
            <h1 className="movie-name">{title}</h1>
            <p className="tag-line">{tagline}</p>
            <p className="description">{overview}</p>
            <div className="wrapper">
              <p className="movie-rating">IMDB {voteAverage?.toFixed(1)}</p>
              <p className="movie-rating">{runtime} min</p>
              <p className="date">{releaseDate?.split('-')[0]}</p>
              <p className="language">{originalLanguage?.toUpperCase()}</p>
            </div>
            <div className="genre-wrapper">
              {genres && genres.length > 0 ? (
                genres.map(genre => (
                  <p key={genre.id} className="genre-name">
                    {genre.name}
                  </p>
                ))
              ) : (
                <p>No genres available</p>
              )}
            </div>
          </div>
        </div>
        <div className="casts-container">
          <h1 className="cast">Cast</h1>
          <CastGrid movieId={movieDetailsData.id} />
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderErrorView = () => (
    <div className="error-container">
      <p>Something went wrong. Please try again later.</p>
    </div>
  )

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    const {movieDetailsData} = this.state
    console.log(movieDetailsData)
    return (
      <div className="movie-details-container">
        <NavBar />
        {this.renderDiffrentViews()}
      </div>
    )
  }
}

export default MovieDetails
