import './index.css'

const CastDetails = props => {
  const {castdetails} = props
  const {character, originalName, profilePath, id} = castdetails
  return (
    <li key={`id || cast-${id}`} className="cast-item">
      <img
        className="cast-img"
        src={`https://image.tmdb.org/t/p/w500/${profilePath}`}
        alt={originalName}
      />
      <div className="cast-wrapper">
        <p className="charcter-name">{character}</p>
        <p className="original-name">{originalName}</p>
      </div>
    </li>
  )
}

export default CastDetails
