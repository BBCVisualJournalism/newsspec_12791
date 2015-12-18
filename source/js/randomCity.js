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
    };

    var setupRandomCityButton = function (cityArray) {
        $randomCityButton.on('click', function () {
            var randomCity = getRandomCity(cityArray);
            var cityFileName = utils.normaliseText(randomCity) + '.js';
            news.pubsub.emit('user-submitted-city', [basePath, cityFileName]);
        });
    };

    var getRandomCity = function (cityArray) {
        return cityArray[Math.floor(Math.random() * cityArray.length)];
    };

    var displayRandomCitySection = function () {
        $randomCitySection.show();
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});
