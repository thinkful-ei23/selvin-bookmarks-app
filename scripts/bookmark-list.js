' use strict';
/* global $ store api */
const bookmarkList = ( function(){
  //EVENT handlers

//ADD functions
  function handleAddBmButtonClick() {
    $('.add-bookmark').on('click', event => {
     console.log('handleAddBmButtonClick ran')  
     store.adding = true;
     $('#create-bm').addClass('openForm');
     render();
    });
  }
  function handleAddBmPanelSubmit() {
    //console.log('handleAddBmPanelSubmit listener'); 
    $('#create-bm').on('click', '.add-bookmark', event => {  
     // console.log(`$('#create-bm').on('submit', event =>`);           
      event.stopPropagation();    
      event.preventDefault();
      const newBmTitle = $('.title').val();
      const newBmURL = $('.url').val();
      const newBmDesc = $('.desc').val();
      const newBmRating = $('.rating').val();
      api.createBookmark(newBmTitle, newBmURL, newBmDesc, newBmRating, (newEntry) => {
        store.addBookmark(newEntry);
      
      store.adding = false;
      $('#create-bm').removeClass('openForm');

      render();
      });
    });
  }
  
  function handleBmPanelCloseClick() {
    $('#bm-detail-panel').on('click', '.bm-panel-close', event => {
      console.log('handleBmPanelCloseClick ran')
      store.expanded = null;
      $('#bm-detail-panel').removeClass('openForm');
      render();
    });    
  }
//DISPLAY functions
  function handleBmListClick() {
    $('.bm-list').on('click', '.bm-entry', event => {
      console.log('handleBmListClick ran')
        const bmID = $(event.currentTarget).data('item-id');
        //console.log(bmID);
        store.expanded = bmID;
        //console.log(store);
        //$('#bm-detail-panel').html(getDetailPanelData(store.findById(bmID)));
      render();
    });

    $('.bm-list').on('click', '.bm-delete', event => {
      event.stopPropagation(); 
      console.log('handleBmDeleteClick ran');
      // get the index of the bookmark in store.bookmarks
      //console.log('event.currentTarget: ' + event.currentTarget);
      const bmID = $(event.currentTarget).closest('li').data('item-id');
      //console.log('bmID: ' + bmID);
      store.findAndDelete(bmID);
      api.deleteBookmark(bmID); 
      render();
    });
  }

//UPDATE functions
  function handleBmTitleClick() {
    $('.bm-list').on('dblclick', '.title', event => {
      const id = editBookmark(event.currentTarget);
      store.findAndToggleChecked(id);
      render();
    });
  }

//CANCEL function
  function handleBmCancelClick() {
  $('#create-bm').on('click', '.cancel-bookmark', event => {
      console.log('handleBmCancelClick ran');
      store.adding = false;
      $('#create-bm').removeClass('openForm');
      render();
    });
 }

 //DELETE function
 function handleBmDeleteClick() {
  $('#bm-detail-panel').on('click', '.remove', event => {
    console.log('handleBmDeleteClick ran');
    // get the index of the bookmark in store.bookmarks
    //console.log('event.currentTarget: ' + event.currentTarget);
    const id = $('.bm-panel-entry').data('item-id');
    //console.log('id: ' + id);
    store.findAndDelete(id);
    api.deleteBookmark(id); 
    store.expanded = null;
    $('#bm-detail-panel').removeClass('openForm');
    render();
  });
}

//FILTER functions

function handleFilterClicked() {
  $('#filter-bookmark').change(function(){
   // console.log('Filter rating: ' + $(this).val());  
   // console.log('handleFilterClicked ran');
    store.minimum = ($(this).val());
   // console.log('store.minimum: ' + store.minimum); 
    render();
  });
}
function handleBmRatingClick() {
  $('.bm-list').on('click', '.one', event => {
    console.log('handleRating ran');
    event.stopPropagation();   
    //console.log('event.currentTarget: ' + event.currentTarget);
    const bmID = $(event.currentTarget).closest('li').data('item-id');
    //console.log('bmID: ' + bmID);
    store.findAndUpdateRating(bmID, 1);
    render();
  });
  $('.bm-list').on('click', '.two', event => {
    event.stopPropagation();    
    const bmID = $(event.currentTarget).closest('li').data('item-id');
    store.findAndUpdateRating(bmID, 2);
    render();
  });
  $('.bm-list').on('click', '.three', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('li').data('item-id');
    store.findAndUpdateRating(bmID, 3);
    render();
  });
  $('.bm-list').on('click', '.four', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('li').data('item-id');
    store.findAndUpdateRating(bmID, 4);
    render();
  });
  $('.bm-list').on('click', '.five', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('li').data('item-id');
    store.findAndUpdateRating(bmID, 5);
    render();
  });
}
function handlePanelRatingClick() {
  $('#bm-detail-panel').on('click', '.one', event => {
    console.log('handleRating ran');
    event.stopPropagation();   
    console.log('event.currentTarget: ' + event.currentTarget);
    const bmID = $(event.currentTarget).closest('div').data('item-id');
    console.log('bmID: ' + bmID);
    store.findAndUpdateRating(bmID, 1);
    render();
  });
  $('#bm-detail-panel').on('click', '.two', event => {
    event.stopPropagation();    
    const bmID = $(event.currentTarget).closest('div').data('item-id');
    store.findAndUpdateRating(bmID, 2);
    render();
  });
  $('#bm-detail-panel').on('click', '.three', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('div').data('item-id');
    store.findAndUpdateRating(bmID, 3);
    render();
  });
  $('#bm-detail-panel').on('click', '.four', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('div').data('item-id');
    store.findAndUpdateRating(bmID, 4);
    render();
  });
  $('#bm-detail-panel').on('click', '.five', event => {
    event.stopPropagation();   
    const bmID = $(event.currentTarget).closest('div').data('item-id');
    store.findAndUpdateRating(bmID, 5);
    render();
  });
}

// ERROR HANDLING functions
//Utility functions

function handleErrorMessage (errmsg) {
  if (errmsg && errmsg.length > 0) {
    if ($('input.title').val() === '') {
      $('input.title').css({'color':'red', 'font-weight':'bold'});
      $('input.title').attr('placeholder', 'Title is required')
    } else {
      if ($('input.url').val() === '') {
        $('input.url').css({'color':'red', 'font-weight':'bold'});
        $('input.url').attr('placeholder', 'URL is required')
      } else {
        $('.errmsg').html(`<p class="errmsg">${errmsg}</p>`);
      }
    }
    //console.log("$('input.title').val(): " + $('input.title').val());
  } else {
    $('.errmsg').html('');
  }
}

  function formatBmListEntry(bookmark) {
    console.log('formatBmListEntry ran');
   // console.log(`bookmark: ${bookmark}`);
    const rating = bookmark.rating;
    const bmRating = getBmRating(rating);
    //console.log(`bmRating: ${bmRating}`);
    if (store.expanded == bookmark.id) {
      return `
      <li class="bm-entry border" tabindex="0" data-item-id="${bookmark.id}">
        <div class="bm-item">
          <div title="delete bookmark" class="bm-delete" tabindex="0">x</div>
          <p class="title" tabindex="0">${bookmark.title}</p>
          <p class="bm-rating-class" data-item-id="${bookmark.id}">${bmRating}</p>
        </div>
      </li>`

    } else {
      return `
      <li class="bm-entry" tabindex="0" data-item-id="${bookmark.id}">
        <div class="bm-item">
          <div title="delete bookmark" class="bm-delete" tabindex="0">x</div>
          <p class="title" tabindex="0">${bookmark.title}</p>
          <p class="bm-rating-class" data-item-id="${bookmark.id}">${bmRating}</p>
        </div>
      </li>`

    }
  }
 
  function getDetailPanelData(bookmark) {
    console.log('getDetailPanelData ran');
   // console.log(`bookmark: ${bookmark}`);
    //console.log(`bmRating: ${bmRating}`);
    return `
      <div  class="show-detail openForm dblBorder">
        <header>
          <button class="remove">Remove</button>        
          <h2 class="bm-panel-title">${bookmark.title}</h2>
        </header>
        <p class="bm-panel-entry" data-item-id="${bookmark.id}">${bookmark.desc}</p>
        <div class="detail-buttons">
          <button class="visit"><a href="${bookmark.url}"  target="_blank">Visit Site</a></button>
          <button class="bm-panel-close" tabindex="0" >close</button>
        <div class="rating" data-item-id="${bookmark.id}">${getBmRating(bookmark.rating)}</div>
      </div>`;
  }
//UPDATE functions

function editBookmarK(title) {
  console.log(`editBookmarK ran`);
  const updateData = {
    title: title,
    url: url,
    desc: desc,
    rating: rating
  };
}


 
   //RENDERING 

  function render() {
    // console.log('render ran');
    // console.log('store.bookmarks: ' + store.bookmarks);
    // console.log('store.minimum: ' + store.minimum);
    // console.log('store.adding: ' + store.adding);
    // build ADD Panel first if needed
    if (store.expanded!== null) {
      //console.log();
      $('#bm-detail-panel').html(getDetailPanelData(store.findById(store.expanded)));
    } else {
      $('#bm-detail-panel').html('');
    }

    if (store.adding === true) {
      const newBmCreatePanelString = `
          <header
            <h2>Create a Bookmark</h2>
          </header>  
          <fieldset>
            <div>  
              <input type="text" name="title" class="title" placeholder="Enter Title e.g. Cat Videos..."/>
            </div>
            <div>       
              <input type="text" name="url" class="url" placeholder="Enter webpage URL"/> 
            </div>
            <div>     
              <textarea name="desc" class="desc" placeholder="Enter description."></textarea>
              <div><label for="rating">Rating</label> 
              <select id="rating" name="rating" class="rating">
                <option value=5 class="val5">5 hearts</option>
                <option value=4 class="val4">4 hearts</option>
                <option value=3 class="val3">3 hearts</option>
                <option value=2 class="val2">2 hearts</option>
                <option value=1 class="val1">1 heart</option>
              </select>
              </div>
            </div>
            <div> 
              <button type="reset" class="cancel-bookmark">CANCEL</button>  
              <button type="submit" class="add-bookmark">ADD</button> 
            </div>
          </fieldset>`;   

      $('#create-bm').html(newBmCreatePanelString).addClass('openForm');
    } else {
      $('#create-bm').html('');
    }

    //Filter bookmark list if store filter`rating > 0` 
    //console.log('store.bookmarks.length = ' + store.bookmarks.length);

    let bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.minimum);

    //console.log('after filter bookmarks.length = ' + bookmarks.length);
    //console.log(`bookmarks: ${bookmarks}`);
    let bmListString = 'No bookmarks to display';
    if (bookmarks.length > 0) {
      bmListString = buildBmListString(bookmarks);
     // console.log("built the list string for all the bookmarks: " + typeof(bookmarks) + " | " + bmListString);
    }
    //insert the HTML into the DOM
    $('.bm-list').html(bmListString);
   }
   function buildBmListString(bookmarks) {
    const BmListString = bookmarks.map((bookmark) => formatBmListEntry(bookmark));
    return BmListString.join('');
  }
  function getBmRating(rating){
    // returns 5 hearts combo of black/white
    // console.log(`getBmRating ran`);
    // console.log(`rating: ${rating}`);
    let bmRating = '';
    switch(rating) {
      case 1:
        bmRating = `
          <span class="one bheart"></span>
          <span class="two wheart"></span>
          <span class="three wheart"></span>
          <span class="four wheart"></span>
          <span class="five wheart"></span>`;
        break;
      case 2:
      bmRating = `
        <span class="one bheart"></span>
        <span class="two bheart"></span>
        <span class="three wheart"></span>
        <span class="four wheart"></span>
        <span class="five heart"></span>`;
      break;
      case 3:
      bmRating = `
        <span class="one bheart"></span>
        <span class="two bheart"></span>
        <span class="three bheart"></span>
        <span class="four wheart"></span>
        <span class="five wheart"></span>`;
      break;
      case 4:
      bmRating = `
        <span class="one bheart"></span>
        <span class="two bheart"></span>
        <span class="three bheart"></span>
        <span class="four bheart"></span>
        <span class="five wheart"></span>`;
      break;
      case 5:
      bmRating = `
        <span class="one bheart"></span>
        <span class="two bheart"></span>
        <span class="three bheart"></span>
        <span class="four bheart"></span>
        <span class="five bheart"></span>`;
      break;
      default:        
      bmRating = `
        <span class="one bheart"></span>
        <span class="two wheart"></span>
        <span class="three wheart"></span>
        <span class="four wheart"></span>
        <span class="five wheart"></span>`;
    }
    //console.log(`prior to return - bmRating: ${bmRating}`);
    return bmRating;
  }


  function bindEventListeners() {
    handleAddBmButtonClick();
    handleAddBmPanelSubmit();
    handleBmPanelCloseClick();
    handleFilterClicked();
    handleErrorMessage();
    //handleBmTitleClick();
    handleBmDeleteClick();
    handleBmCancelClick();
    handleBmListClick();
    handleBmRatingClick();
    handlePanelRatingClick();
   // handleEditBookmarkSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
    handleErrorMessage,
  };
}());
