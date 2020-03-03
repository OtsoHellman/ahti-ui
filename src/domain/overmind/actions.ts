import { DocumentNode } from 'graphql';

import { Feature } from '../api/generated/types.d';
import { Action, AsyncAction } from './';
import { CategoryFilter } from './state';
import HARBOR_QUERY from '../api/queries/harborQuery';
import FERRY_QUERY from '../api/queries/ferryQuery';
import ISLAND_QUERY from '../api/queries/islandQuery';
import FEATURE_QUERY from '../api/queries/featureQuery';
import graphQLClient from '../api/';

export const addCategoryFilter: Action<CategoryFilter> = (
  { state },
  categoryFilter
) => {
  if (
    !state.categoryFilters.map(filter => filter.id).includes(categoryFilter.id)
  ) {
    state.categoryFilters = [...state.categoryFilters, categoryFilter];
  }
};

export const removeFilter: Action<string> = ({ state }, filterId) => {
  if (filterId.startsWith('ahti:category')) {
    state.categoryFilters = state.categoryFilters.filter(
      categoryFilter => categoryFilter.id !== filterId
    );
  } else if (filterId.startsWith('ahti:tag')) {
    state.tagFilters = state.tagFilters.filter(
      tagFilter => tagFilter.id !== filterId
    );
  }
};

export const toggleMapView: Action = ({ state }) => {
  state.mapViewToggle = !state.mapViewToggle;
};

export const setFeatures: Action<Feature[]> = ({ state }, features) => {
  state.features = features;
};

const fetchFeatureData = async (query: DocumentNode, ahtiId: string) => {
  const { data } = await graphQLClient.query({
    query: query,
    variables: { ahtiId: ahtiId }
  });
  return data;
};

export const selectFeature: Action<Feature> = ({ state }, feature) => {
  state.selectedFeature = { ...feature };
};

export const clearSelectedFeature: Action = ({ state }) => {
  state.selectedFeature = null;
};

export const selectFeatureById: AsyncAction<string> = async (
  { state },
  ahtiId
) => {
  state.selectedFeature = (await fetchFeatureData(ISLAND_QUERY, ahtiId)).island;

  state.selectedFeature = (
    await fetchFeatureData(FEATURE_QUERY, ahtiId)
  ).feature;

};

export const selectHarbor: AsyncAction<string> = async ({ state }, ahtiId) => {
  state.selectedFeature = (await fetchFeatureData(HARBOR_QUERY, ahtiId)).harbor;
};

export const selectFerry: AsyncAction<string> = async ({ state }, ahtiId) => {
  state.selectedFeature = (await fetchFeatureData(FERRY_QUERY, ahtiId)).ferry;
};
