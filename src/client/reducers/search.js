import {
  UPDATE_QUERY,
  TOGGLE_DATASET,
  FETCH_RESULTS,
  UPDATE_RESULTS,
  CLEAR_RESULTS,
  UPDATE_RESULTS_FILTER,
  SORT_RESULTS
} from '../actions';

export const INITIAL_STATE = {
  query: '',
  datasets: {
       bustadnamn: {
      titleEn: 'Bustadnamnregisteret (BNR)',
      titleFi: 'Bustadnamnregisteret (BNR)',
      shortTitle: 'BNR',
      timePeriod: '1950-1970',
      link: 'https://storymaps.arcgis.com/stories/563e56e4d3604a299626c8e3993d2332',
      selected: true
    },
    sognogfjordane: {
      titleEn: 'Stadnamn Sogn og Fjordane (SOF)',
      titleFi: 'Stadnamn Sogn og Fjordane (SOF)',
      shortTitle: 'SOF',
      timePeriod: '1930-',
      link: 'https://www.fylkesarkivet.no/stadnamn.380535.no.html',
      selected: false
    }
    ,
    tgn: {
      titleEn: 'The Getty Thesaurus of Geographic Names (TGN)',
      titleFi: 'The Getty Thesaurus of Geographic Names (TGN)',
      shortTitle: 'TGN',
      timePeriod: '?',
      link: 'http://www.getty.edu/research/tools/vocabularies/tgn/about.html',
      selected: false
    }
  },
  results: null,
  latestFilter: {
    id: '',
  },
  latestFilterValues: [],
  resultsFilter: {
    prefLabel: new Set(),
    modifier: new Set(),
    basicElement: new Set(),
    typeLabel: new Set(),
    broaderTypeLabel: new Set(),
    broaderAreaLabel: new Set(),
    collector: new Set(),
    collectionYear: new Set(),
    manifest: new Set(),
    source: new Set(),
  },
  sortBy: 'broaderAreaLabel',
  sortDirection: 'asc',
  groupBy: 'broaderTypeLabel',
  groupByLabel: 'Paikanlaji',
  textResultsFetching: false,
  spatialResultsFetching: false,
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return { ...state, query: action.query || '' };
    case TOGGLE_DATASET:
      return {
        ...state,
        suggestions: [],
        results: null,
        datasets: {
          ...state.datasets,
          [action.dataset]: {
            ...state.datasets[action.dataset],
            selected: state.datasets[action.dataset].selected ? false : true
          }
        }
      };
    case FETCH_RESULTS:
      return {
        ...state,
        [`${action.jenaIndex}ResultsFetching`]: true
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: null,
        fetchingResults: false,
        query: '',
        resultsFilter: {
          prefLabel: new Set(),
          modifier: new Set(),
          basicElement: new Set(),
          typeLabel: new Set(),
          broaderTypeLabel: new Set(),
          broaderAreaLabel: new Set(),
          collector: new Set(),
          collectionYear: new Set(),
          manifest: new Set(),
          source: new Set(),
        },
      };
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.results,
        [`${action.jenaIndex}ResultsFetching`]: false
      };
    case UPDATE_RESULTS_FILTER:
      return updateResultsFilter(state, action);
    case SORT_RESULTS:
      return {
        ...state,
        sortBy: action.options.sortBy,
        sortDirection: action.options.sortDirection,
      };
    default:
      return state;
  }
};

const updateResultsFilter = (state, action) => {
  const { property, value, latestValues } = action.filterObj;
  let nSet = state.resultsFilter[property];
  if (nSet.has(value)) {
    nSet.delete(value);
  } else {
    nSet.add(value);
  }
  const newFilter = {
    ...state.resultsFilter,
    [property]: nSet
  };
  return {
    ...state,
    resultsFilter: newFilter,
    latestFilter: {
      id: property,
    },
    latestFilterValues: latestValues
  };
};

export default search;
