'use strict';
/* global $*/

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/selvin/bookmarks';

  const getBookmarks = function(callback) {
    //console.log ('getBookmarks ran');
    $.getJSON({
      url: `${BASE_URL}`, 
      success: callback,
      error: function(xhr){
      console.log("Error! " + xhr.responseText);
      //if (xhr.responseText === '{"message":"Attributes `title` and `url` required"}') {
      store.errmsg = xhr.responseText.slice(22, 59 );  
      //}
      }
    });
  };

  const createBookmark = function(title, url, desc, rating, callback) {
    const newBm = {
        title: title,
        url: url,
        desc: desc,
        rating: rating
    };
    const strJSON = JSON.stringify(newBm);
    console.log(`strJSON: ${strJSON}`);
    // With ajax()
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: strJSON,
      success:  callback,
      error: function(xhr){
        if  (xhr.status === 0){
          console.log('store.errmsg: ' + store.errmsg);   
          store.errmsg = 'Title must be provided!';  
          bookmarkList.handleErrorMessage('Title must be provided!');
          //$('#create-bm').prepend(`<p style="color:red;font-weight:bold;">'Title must be provided!'</p>`);
          //callback;
        
        } else {
          if (xhr.status === 400) {
            store.errmsg = xhr.responseText.slice(22, 49 );  
            //$('#create-bm').prepend(`<p style="color:red;font-weight:bold;">${store.errmsg}</p>`);
            console.log('store.errmsg: ' + store.errmsg);    
          } else {
            console.log("Error! " + xhr.status + " | " + xhr.responseText);
            store.errmsg = xhr.responseText.slice(22, 49 ); 
            bookmarkList.handleErrorMessage(store.errmsg);           
            //$('#create-bm').prepend(`<p class="errmsg">${store.errmsg}</p>`);
          }
        }      
        console.log("Error! " + xhr.status + " | " + xhr.responseText);
        store.errmsg = xhr.responseText.slice(22, 49 ); 
        bookmarkList.handleErrorMessage(store.errmsg); 
      }
    });
  };

  const updateBookmark = function(id, updateData, callback) {
  $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: function(xhr){
        console.log("Error! " + xhr.responseText);
        //if (xhr.responseText === '{"message":"Attributes `title` and `url` required"}') {
        //  store.errmsg = xhr.responseText.slice(22, 59 );  
        //}
      }
    });
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      error: function(xhr){
        console.log("Error! " + xhr.responseText);
        // if (xhr.responseText === '{"message":"Attributes `title` and `url` required"}') {
         store.errmsg = xhr.responseText.slice(22, 59 );  
        // }
      }
    });
  };

   return {
    getBookmarks,
    createBookmark,  
    updateBookmark,
    deleteBookmark,
  };
}());