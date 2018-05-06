// Test for cookies

chrome.cookies.getAll({}, function(cookie) {
    console.log(cookie);
});
