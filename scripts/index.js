'use strict';
/* global $ shoppingList, store, api */

$(document).ready(function() {
    console.log('ready!');
    bookmarkList.bindEventListeners();
    bookmarkList.render();
    api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});
