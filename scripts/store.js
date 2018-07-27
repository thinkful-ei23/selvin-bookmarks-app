'use strict';
/* global bookmark */

// eslint-disable-next-line no-unused-vars
const store = (function(){

  const bookmarks = []; 
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

  const minimum = 0;
  const adding = false;
  const expanded = null;

  const findAndUpdate = function(id, newData) {
    //this.bookmarks = 
  };


  return {

    bookmarks,
    minimum,
    adding,
    expanded,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    setRating,    
  };
  
}());
