' use strict';
/* global $ store api */
//eslint-disable-next-line no-unused-vars
const bookmarkList = ( function(){

  function formatBookmark(bookmark) {
      console.log('formatBookmark ran');
      // return `
      //   <li class="bookmark-entry">
      //     <div class="bookmark-item">
      //       <p class="bookmark-title"></p>
      //       <p class="${bookmark.rating}"><img src="${bookmark.rating}.png" alt="${rating}"></p>
      //     </div>
      //   </li>`
  }

  function buildBookmarkString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => formatBookmark(bookmark));
    return bookmarks.join('');
  }

  function render() {
    console.log('`render` ran');

    // Filter bookmark list if store prop `rating > 0` 
    if (store.minimum !== 0) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.minimum);
    }

    const bookmarkListString = buildBookmarkString(bookmarks);

    //insert the HTML into the DOM
    $('.bookmark-list').html(bookmarkListString);
   }

   //handle bookmark item being clicked on list
   function handleAddBookmarkClicked() {

     $('#bookmark-options').on('click', '.add-bookmark', event => {
       console.log('handleAddBookmarkClicked ran');
       render();
     });
  }
  
  function handleRatingClicked() {
     $('#bookmark-options').on('click', '.rate-bookmark', event => {
      console.log('handleRating ran');
      const id = getbookmarkIdFromElement(event.currentTarget);
       store.setRating(id);
       render();
     });
   }

  // this is fired once the "ADD" button is clicked from create panel
  function handleNewBookmarkSubmit() {
    console.log('handleNewBookmarkSubmit');
    $('#bookmark-form').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('.createTitle').val();
      $('.createTitle').val('');
      api.createBookbookmark(newBookmarkTitle, (newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      });
      render();
    });
  }

  function getbookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.bookmark-element')
      .data('bookmark-id');
  }
 
  function handleBookmarkClicked() {
    $('.bookmark-list').on('click', '.add-bookmark', event => {
      const id = getbookmarkIdFromElement(event.currentTarget);
      store.findAndToggleChecked(id);
      render();
    });
  }

  function handleBookmarkTitleClicked() {
    $('.bookmark-list').on('click', '.bookmark-title', event => {
      const id = editBookmarkTitle(event.currentTarget);
      store.findAndToggleChecked(id);
      render();
    });
  }

  function handleDeleteBookmarkClicked() {
    $('.bookmark-list').on('click', '.bookmark-delete', event => {
      // get the index of the bookmark in store.bookmarks
      const id = getbookmarkIdFromElement(event.currentTarget);
      // delete the bookmark
      store.findAndDelete(id);
      // render the updated shopping list
      render();
    });
  }

  
  
  function bindEventListeners() {
    handleAddBookmarkClicked();
    handleNewBookmarkSubmit();
    handleRatingClicked();
    handleBookmarkTitleClicked();
    handleDeleteBookmarkClicked();
   // handleEditBookmarkSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
