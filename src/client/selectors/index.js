import { createSelector } from 'reselect';
import _ from 'lodash';

// https://redux.js.org/recipes/computing-derived-data

const getResultsFilter = (state) => state.resultsFilter;
const getResults = (state) => state.results;
const getSortBy = (state) => state.sortBy;
const getSortDirection = (state) => state.sortDirection;

export const getVisibleResults = createSelector(
  [ getResults, getResultsFilter, getSortBy, getSortDirection ],
  (results, resultsFilter, sortBy, sortDirection) => {
    const filteredResults =  results.filter(filterVisibleResult(resultsFilter));
    return _.orderBy(filteredResults, sortBy, sortDirection);
  }
);

const filterVisibleResult = resultsFilter => (resultObj) => {
  for (const property in resultsFilter) {
    const filterValues = resultsFilter[property];
    if (filterValues.has(resultObj[property])) {
      return false;
    }
  }
  return true;
};

export const getVisibleValues = createSelector(
  [ getResults, getResultsFilter ],
  (visibleResults, resultsFilter) => {
    let prefLabel = [];
    let modifier = [];
    let basicElement = [];
    let typeLabel = [];
    let broaderTypeLabel = [];
    let broaderAreaLabel = [];
    let collector = [];
    let collectionYear = [];
    let source = [];
    for (const result of visibleResults) {
      prefLabel.push({ prefLabel: result.prefLabel, selected: !resultsFilter.prefLabel.has(result.prefLabel) });
      modifier.push({ value: result.modifier, selected: !resultsFilter.modifier.has(result.modifier) });
      basicElement.push({ value: result.basicElement, selected: !resultsFilter.basicElement.has(result.basicElement) });
      typeLabel.push({ value: result.typeLabel, selected: !resultsFilter.typeLabel.has(result.typeLabel) });
      broaderTypeLabel.push({ value: result.broaderTypeLabel, selected: !resultsFilter.broaderTypeLabel.has(result.broaderTypeLabel) });
      broaderAreaLabel.push({ value: result.broaderAreaLabel, selected: !resultsFilter.broaderAreaLabel.has(result.broaderAreaLabel) });
      collector.push({ value: result.collector, selected: !resultsFilter.collector.has(result.collector) });
      collectionYear.push({ value: result.collectionYear, selected: !resultsFilter.collectionYear.has(result.collectionYear) });
      source.push({ value: result.source, selected: !resultsFilter.source.has(result.source) });
    }
    return {
      prefLabel: _.sortBy(_.uniqBy(prefLabel, 'prefLabel'), 'prefLabel'),
      modifier: _.sortBy(_.uniqBy(modifier, 'value'), 'value'),
      basicElement: _.sortBy(_.uniqBy(basicElement, 'value'), 'value'),
      typeLabel: _.sortBy(_.uniqBy(typeLabel, 'value'), 'value'),
      broaderTypeLabel: _.sortBy(_.uniqBy(broaderTypeLabel, 'value'), 'value'),
      broaderAreaLabel:  _.sortBy(_.uniqBy(broaderAreaLabel, 'value'), 'value'),
      collector: _.sortBy(_.uniqBy(collector, 'value'), 'value'),
      collectionYear: _.sortBy(_.uniqBy(collectionYear, 'value'), 'value'),
      source:  _.sortBy(_.uniqBy(source, 'value'), 'value'),
    };
  }
);
