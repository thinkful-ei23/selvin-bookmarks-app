'use strict';
/* global bookmark */

// eslint-disable-next-line no-unused-vars
const store = (function(){

  const bookmarks = [{id: "cjld4zmde00080k2rkk52bkzj", title: "NASA 4K Video: Jeff’s Earth From Space - A View From The International Space Station / ISS UHD", url: "https://www.youtube.com/watch?v=hj9H8eVKlzQ", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing…mpor incididunt ut labore et dolore magna aliqua.", rating: 5}
  ,{id: "cjld4zypp000a0k2rksahf0w6", title: "Cats vs Cucumbers Compilation", url: "https://www.youtube.com/watch?v=ZG2UW2nYBQQ", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing…mpor incididunt ut labore et dolore magna aliqua.", rating: 4}
  ,{id: "cjld509o3000c0k2r6sycm6f4", title: "TRY NOT TO LAUGH WITH PETS Compilation 2018", url: "https://www.youtube.com/watch?v=CjlPCbo40JU", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing…mpor incididunt ut labore et dolore magna aliqua.", rating: 2}
  ,{id: "cjld50pp7000d0k2r9jlmhhil", title: "Cats High On Catnip Compilation [Funny] (TOP 10 VIDEOS)", url: "https://www.youtube.com/watch?v=-0bIsDGTHOo", desc: "", rating: 1}
  ,{id: "cjld514o2000e0k2r1ziuqxwb", title: "Fourth of July Intel Shooting Star Drone Light Show", url: "https://www.youtube.com/watch?v=-0bIsDGTHOo", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing…mpor incididunt ut labore et dolore magna aliqua.", rating: 3}
]; 
  const addBookmark = function(bookmark) {
    this.bookmarks.unshift(bookmark);
  };

  const findById = function(id) {
    console.log('store.findById ran');
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

    const findAndDelete = function(id) {
      console.log('store.findAndDelete ran');
      console.log('this.bookmarks before: ' + this.bookmarks); 
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
      console.log('this.bookmarks after: ' + this.bookmarks); 
  };

  const minimum = 0;
  const adding = false;
  const expanded = null;
  const selectedBm = false;
  const findAndUpdateRating = function(id, rating) {

    this.bookmarks.find(bookmark => bookmark.id === id).rating = rating;
  };


  return {

    bookmarks,
    minimum,
    adding,
    expanded,
    selectedBm,
    addBookmark,
    findById,
    findAndDelete, 
    findAndUpdateRating,  
  };
  
}());
