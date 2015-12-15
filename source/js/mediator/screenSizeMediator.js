define(['lib/news_special/bootstrap'], function (news) {

    var scrollTimeout;

    var init = function () {
        //listener for the scroll listener from the parent postmessage
        if (window.addEventListener) {
            window.addEventListener('resize', handleWindowResize, true);
        }
        else {
            window.attachEvent('resize', handleWindowResize, true);
        }
    };

    var handleWindowResize = function (e) {
        if (scrollTimeout) {
            // clear the timeout, if one is pending
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
        scrollTimeout = setTimeout(function () {
            news.pubsub.emit('optimisedWindowResize');
        }, 100);
    };

    var publicApi = {
        init: init
    };

    return publicApi;

});