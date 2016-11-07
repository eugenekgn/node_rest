'use strict';

const assignIdsToCollection = (baseCollection, assignToCollection, fieldBaseCollection = 'id', fieldAssignedCollection = 'id') => {
  baseCollection.forEach((item, index) => {
    assignToCollection[index][fieldAssignedCollection] = item[fieldBaseCollection];
  });
};

export default {
  assignIdsToCollection
};