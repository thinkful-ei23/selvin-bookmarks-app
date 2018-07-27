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
      <li class="bookmark-entry"  data-item-id="${bookmark.id}">
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

  function handleRatingClicked() {
     $('#bookmark-options').on('click', '.rate-bookmark', event => {
      console.log('handleRating ran');
      const id = getbookmarkIdFromElement(event.currentTarget);
       store.setRating(id);
       render();
     });
   }
   
   function handleAddBookmarkClicked() {
    $('.add-bookmark').on('click', event => {
     console.log('handleAddBookmarkClicked ran')  
     store.adding = true;
     render();
    });
  }

  
  function handleCancelBookmarkClicked() {

    $('.add-bookmark').on('click', '.cancel-bookmark', event => {
      console.log('handleCancelBookmarkClicked ran');
      store.adding = false;
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
      $('#create-bookmark').addClass('hidden');
      api.createBookmark(newBookmarkTitle, newBookmarkURL, newBookmarkDesc, newBookmarkRating, (newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      });
      render();
    });
  }
 
  function handleBookmarkClicked() {
    $('.bookmark-list').on('click', '.bookmark-entry', event => {
        const bmID = $(event.currentTarget).data('item-id');
        //const bmTitle = $(event.currentTarget).val();
        $('#bm-details').removeClass('hidden');
        //$('#bm-details h2').val($(event.currentTarget))
        console.log($(event.currentTarget));
        console.log(bmID);
        //console.log(bmTitle);
      //const id = getbookmarkIdFromElement(event.currentTarget);
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
    //console.log(`bookmarks: ${bookmarks}`);

    const bookmarkListString = generateBookmarkString(bookmarks);

    if (store.expanded === true) {
      const bookmarkExpandedString = `
      <div  class="show-detail">
        <header>
          <h2 class="title"></h2>
        </header>
        <p class="bookmark-detail"></p>
        <div class="detail-buttons">
          <button class="visit">Visit Site</button>
          <button class="remove">Remove</button>
        <div class="rating">
        </div>
      </div>`;
      $('#bm-details').html(bookmarkExpandedString);
    }
  
    if (store.adding === true) {
      const bookmarkAddingString = `
      <div>
        <form id="create-bookmark">
          <header>
            <h2>Create a Bookmark</h2>
          </header>  
          <fieldset>
            <div>
              <label for="bookmark-title">Title:</label>   
              <input type="text" name="bookmark-title" class="bookmark-title" placeholder=">e.g. Cat Videos...">
            </div>
            <div>
              <label for="bookmark-url">URL:</label>         
              <input type="text" name="bookmark-url" class="bookmark-url" placeholder=">Enter webpage URL"> 
            </div>
            <div>
              <label for="bookmark-desc">Description:</label>         
              <input type="textarea" name="bookmark-desc" class="bookmark-desc" placeholder=">Enter description.">
              <label for="bookmark-rating">Rating</label> 
              <select id="bookmark-rating" name="bookmark-rating" class="bookmark-rating">
                <option value=0 class="valx">no filter</option>
                <option value=5 class="val5">5 stars</option>
                <option value=4 class="val4">4 stars</option>
                <option value=3 class="val3">3 stars</option>
                <option value=2 class="val2">2 stars</option>
                <option value=1 class="val1">1 star</option>
                <option value=0 class="val3">0 stars</option>
              </select>
            </div>
            <div>  
              <button type="submit" class="add-bookmark">ADD</button>
              <button type="reset" class="cancel-bookmark">CANCEL</button>  
            </div>
          </fieldset>
        </form> 
      </div>`;

      $('#add-bm').html(bookmarkAddingString);
    }

    //insert the HTML into the DOM
    $('.bookmark-list').html(bookmarkListString);
   }

  function bindEventListeners() {
    handleAddBookmarkClicked();
    handleNewBookmarkSubmit();
    handleRatingClicked();
    //handleBookmarkTitleClicked();
    handleDeleteBookmarkClicked();
    handleCancelBookmarkClicked();
    handleBookmarkClicked();

   // handleEditBookmarkSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
