'use strict';
/* global cuid */

const bookmark = (function(){
  const validateTitle = function(title) {
    if (!title) throw new TypeError('Bookmark title must not be blank');
  };

  const addBookmark = function(name) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,
    };
  };

  return {
    validateTitle,
    addBookmark,
  };
  
}());
