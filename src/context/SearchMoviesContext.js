import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMoviesContext

/**
 * import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMoviesContext
 */
