'use strict';
/* global $*/

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/selvin-bookmarks-app';
  const addBookmark = function(title, url, desc, rating, callback) {
    const newBookmark = {
        title: title,
        url: url,
        desc: desc,
        rating: rating
    };
    const strJSON = JSON.stringify(newBookmark);
    // With ajax()
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: strJSON,
      success: callback
    });
  };
  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };
  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };
  return {
    addBookmark,
    getBookmarks,
    updateBookmark,
  };
}());