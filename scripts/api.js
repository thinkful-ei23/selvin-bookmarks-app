'use strict';
/* global $*/

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/selvin/bookmarks';

  const getBookmarks = function(callback) {
    console.log ('getBookmarks ran');
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createBookmark = function(title, url, desc, rating, callback) {
    const newBookmark = {
        title: title,
        url: url,
        desc: desc,
        rating: rating
    };
    const strJSON = JSON.stringify(newBookmark);
    console.log(`strJSON: ${strJSON}`);
    // With ajax()
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: strJSON,
      success: callback
    });
  };

  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

   return {
    getBookmarks,
    createBookmark,  
    updateBookmark,
  };
}());