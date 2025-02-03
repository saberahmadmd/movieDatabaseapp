import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {IoMdClose, IoMdMenu} from 'react-icons/io'
import {MdHome, MdSchedule} from 'react-icons/md'
import {RxArrowTopRight} from 'react-icons/rx'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const [isShowMenu, setToggle] = useState(false)
  const toggleMenuBtn = () => {
    setToggle(prev => !prev)
  }

  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value
        const onChangeHandler = event => onChangeSearchInput(event.target.value)
        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="search-bar-container">
            <input
              className="seach-bar"
              type="search"
              value={searchInput}
              onChange={onChangeHandler}
            />
            <button
              type="button"
              className="search-button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1 className="logo-name">movieDB</h1>
        </Link>
        <div className="nav-items-lg">
          <Link to="/" className="link">
            <p className="item-lg">Popular</p>
          </Link>
          <Link to="/top-rated" className="link">
            <p className="item-lg">Top Rated</p>
          </Link>
          <Link to="/upcoming" className="link">
            <p className="item-lg">Upcoming</p>
          </Link>
        </div>
        {renderSearchBar()}

        {!isShowMenu ? (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdMenu className="icon" />
          </button>
        ) : (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdClose className="icon" />
          </button>
        )}
      </nav>

      {isShowMenu ? (
        <div className="menu-div">
          <div className="nav-items-sm">
            <Link to="/" className="route-link">
              <MdHome className="route-icon" />
              <p className="item">Popular</p>
            </Link>
            <Link to="/top-rated" className="route-link">
              <RxArrowTopRight className="route-icon" />
              <p className="item">Top Rated</p>
            </Link>
            <Link to="/upcoming" className="route-link">
              <MdSchedule className="route-icon" />
              <p className="item">Upcoming</p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default withRouter(NavBar)
