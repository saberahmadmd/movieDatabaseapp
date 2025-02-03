import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import CastDetails from '../CastDetails'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class CastGrid extends Component {
  state = {
    status: diffStates.inProgress,
    castData: [],
  }

  componentDidMount = async () => {
    const {movieId} = this.props
    const MOVIE_ID = movieId
    const API_KEY = '6705266e964c3b5139a4240fb66a7015'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`,
      )
      const responseCast = await response.json()

      const updatedData = responseCast.cast.map(each => ({
        character: each.character,
        knownForDepartment: each.known_for_department,
        originalName: each.original_name,
        profilePath: each.profile_path,
        id: each.id,
      }))

      this.setState({status: diffStates.success, castData: updatedData})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {castData} = this.state
    return (
      <div className="castContainer">
        <ul className="cast-list-container">
          {castData.map(eachData => (
            <CastDetails key={eachData.id} castdetails={eachData} />
          ))}
        </ul>
      </div>
    )
  }

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      default:
        return <p>Failed to load data. Please try again later.</p>
    }
  }

  render() {
    return <div className="cast-container">{this.renderDiffrentViews()}</div>
  }
}

export default CastGrid
