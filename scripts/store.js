'use strict';
/* global bookmark */

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

    const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setRating = function(id) {
    console.log('setRating func ran');
  };

  const findAndUpdate = function(id, newData) {
    //this.bookmarks = 
  };
  
  return {
    bookmarks: [],
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,    
  };
  
}());
