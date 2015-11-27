define(['lib/news_special/bootstrap'], function (news) {

    /*
     * Declare Variables
    */
    // var scrollAnimSupport = true;
    var scrollTimeout;
    

    var init = function () {


        /*
         * Set Variables
        */
        
        /*
         * Event Listeners
        */
        // news.pubsub.on('user-submitted-country', handleCountrySelected);

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