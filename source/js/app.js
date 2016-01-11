define([
    'lib/news_special/bootstrap',
    'userInput',
    'mediator/screenSizeMediator',
    'mediator/resultsMediator',
    'view/topTracksResultsView',
    'view/twinTownResultsView',
    'shareTools',
    'randomCity'
], function (news, userInput, screenSizeMediator, resultsMediator, topTracksResultsView, twinTownResultsView, shareTools, randomCity) {

    var $main = news.$('.main');
    $main.removeClass('ns_no-js');

    var locale = $main.attr('id').replace('locale_', '');
    // use english datapath for hausa/swahili/somali
    switch (locale) {
    case 'ha':
    case 'sw':
    case 'so':
        locale = 'en';
    }
    var baseDataPath = 'http://newsimg.bbc.co.uk/news/special/2015/newsspec_12791_data/data/' + locale + '/';

    // initialise modules
    userInput.init(baseDataPath);
    screenSizeMediator.init();
    resultsMediator.init();
    topTracksResultsView.init();
    twinTownResultsView.init();
    shareTools.init();
    randomCity.init(baseDataPath);

    news.sendMessageToremoveLoadingImage();
});