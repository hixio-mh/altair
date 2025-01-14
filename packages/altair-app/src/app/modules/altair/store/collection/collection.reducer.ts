import { Action } from '@ngrx/store';

import * as collectionActions from '../../store/collection/collection.action';
import { ExportWindowState } from '../state.interfaces';

export type SortByOptions = 'a-z' | 'z-a' | 'newest' | 'oldest';

export interface State {
  list: IQueryCollection[];
  activeCollection: any;
  sortBy: SortByOptions;
}

export interface IQuery extends ExportWindowState {
  id?: number;
  created_at?: number;
  updated_at?: number;
}

export interface IQueryCollection {
  id?: number;
  title: string;
  description?: string;
  queries: any[];
  collections?: IQueryCollection[];

  created_at?: number;
  updated_at?: number;
}

export interface ExportCollectionState extends IQueryCollection {
  version: 1;
  type: 'collection';
}

export const getInitialState = (): State => {
  return {
    list: [],
    activeCollection: null,
    sortBy: 'newest',
  };
};

export function collectionReducer(state = getInitialState(), action: collectionActions.Action): State {
  switch (action.type) {
    case collectionActions.SET_COLLECTIONS:
      return { ...state, list: action.payload.collections };
    case collectionActions.SET_ACTIVE_COLLECTION:
      return { ...state, activeCollection: action.payload.collection };
    case collectionActions.SORT_COLLECTIONS:
      return { ...state, sortBy: action.payload.sortBy };
    default:
      return state;
  }
}
