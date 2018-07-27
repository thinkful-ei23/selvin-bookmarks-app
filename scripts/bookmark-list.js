' use strict';
/* global $ store api */
//eslint-disable-next-line no-unused-vars
const bookmarkList = ( function(){

  function formatBookmark(bookmark) {
      console.log('formatBookmark ran');
      return `
        <li class="bookmark-entry">
          <div class="bookmark-item">
            <p class="bookmark-title">${bookmark.title}</p>
            <p class="${bookmark.minimum}"><img src="${bookmark.minimum}.png" alt=""></p>
          </div>
        </li>`
  }

  function generateBookmarkString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => formatBookmark(bookmark));
    return bookmarks.join('');
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
      api.createBookmark(newBookmarkTitle, (newBookmark) => {
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

  function render() {
    console.log('`render` ran');
    console.log(`store.bookmarks: ${store.bookmarks}`);
    console.log(`store.minimum: ${store.minimum}`);
    // Filter bookmark list if store prop `rating > 0` 
    let bookmarks = store.bookmarks;
    if (store.minimum !== 0) {
      bookmarks.filter(bookmark => bookmark.rating >= store.minimum);
    }
    console.log(`bookmarks: ${bookmarks}`);

    const bookmarkListString = generateBookmarkString(bookmarks);

    //insert the HTML into the DOM
    $('.bookmark-list').html(bookmarkListString);
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
