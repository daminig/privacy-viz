// Test for cookies

chrome.cookies.get({url: "propublica.org", name:"_gid"}, function(cookie) {
    console.log(cookie);
	alert(cookie.name + " found, value: " + cookie.value);
});
