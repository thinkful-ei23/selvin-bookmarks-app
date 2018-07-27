' use strict';
/* global $ store api */
//eslint-disable-next-line no-unused-vars
const bookmarkList = ( function(){

  function formatBookmark(bookmark) {
    console.log('formatBookmark ran');
   // console.log(`bookmark: ${bookmark}`);
    const rating = bookmark.rating;
    const bookmarkRating = getBookmarkRating(rating);
    //console.log(`bookmarkRating: ${bookmarkRating}`);
    return `
      <li class="bookmark-entry">
        <div class="bookmark-item">
          <p class="bookmark-title">${bookmark.title}</p>
          <p class="bookmark-rating-class">${bookmarkRating}</p>
        </div>
      </li>`
  }
  
  function getBookmarkRating(rating){
    // returns 5 hearts combo of black/white
   // console.log(`getBookmarkRating ran`);
   // console.log(`rating: ${rating}`);
    let bookmarkRating = '';
    switch(rating) {
      case 0:
      bookmarkRating = `
      <span class="wheart"></span>
      <span class="wheart"></span>
      <span class="wheart"></span>
      <span class="wheart"></span>
      <span class="wheart"></span>`;
        break;
      case 1:
        bookmarkRating = `
          <span class="bheart"></span>
          <span class="wheart"></span>
          <span class="wheart"></span>
          <span class="wheart"></span>
          <span class="wheart"></span>`;
        break;
      case 2:
      bookmarkRating = `
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>`;
      break;
      case 3:
      bookmarkRating = `
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>`;
      break;
      case 4:
      bookmarkRating = `
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="wheart"></span>`;
      break;
      case 5:
      bookmarkRating = `
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>
        <span class="bheart"></span>`;
      break;
      default:        
      bookmarkRating = `
        <span class="wheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>
        <span class="wheart"></span>`;
    }
    //console.log(`prior to return - bookmarkRating: ${bookmarkRating}`);
    return bookmarkRating;
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

    $('#create-bookmark').submit(function (event) {
      event.preventDefault();
      console.log('handleNewBookmarkSubmit');
      const newBookmarkTitle = $('.bookmark-title').val();
      const newBookmarkURL = $('.bookmark-url').val();
      const newBookmarkDesc = $('.bookmark-desc').val();
      const newBookmarkRating = $('.bookmark-rating').val();
     // console.log(`newBookmarkTitle: ${newBookmarkTitle}`);
     // console.log(`newBookmarkURL: ${newBookmarkURL}`);
     //console.log(`newBookmarkDesc: ${newBookmarkDesc}`);
      //console.log(`newBookmarkRating: ${newBookmarkRating}`);
      $('.bookmark-title').val('');
      $('.bookmark-url').val('');
      $('.bookmark-desc').val('');
      $('.bookmark-rating').val('');
      api.createBookmark(newBookmarkTitle, newBookmarkURL, newBookmarkDesc, newBookmarkRating, (newBookmark) => {
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

  function editBookmarkTitle(title) {
    console.log(`editBookmarkTitle ran`);
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
    //console.log(`store.bookmarks: ${store.bookmarks}`);
    //console.log(`store.minimum: ${store.minimum}`);
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
