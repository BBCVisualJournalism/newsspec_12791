define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {

    var $randomCitySection;
    var $randomCityButton;
    var basePath;
    var cityArray;

    var init = function (baseDataPath) {
        $randomCitySection = news.$('.ns12791_randomCity');
        $randomCityButton = news.$('.ns12791_randomCityButton');

        basePath = baseDataPath;
        require([basePath + 'worldwide_city_list.js?callback=define'], function (worldwideCitiesList) {
            setupRandomCityButton(worldwideCitiesList.data);
        });

        news.pubsub.on('display-random-city-section', displayRandomCitySection);
        news.pubsub.on('random-city-button-clicked', selectRandomCity);
    };

    var setupRandomCityButton = function (cityArray) {
        $randomCityButton.on('click', function () {
            news.istats.log('newsspec-interaction', 'random-city-button-clicked');
            news.pubsub.emit('random-city-button-clicked', [cityArray]);
        });
    };

    var selectRandomCity = function (cityArray) {
        var randomCity = cityArray[Math.floor(Math.random() * cityArray.length)];
        var cityFileName = utils.normaliseText(randomCity) + '.js';
        news.pubsub.emit('user-submitted-city', [basePath, cityFileName]);
    };

    var displayRandomCitySection = function () {
        $randomCitySection.show();
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});
