define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {
    
    // declare variables
    var $twinTownResult;
    var $twinTownCityName;
    var $twinTownMilesAway;
    var $twinTownKmAway;
    var $tracksInCommonNumber;
    var $tracksInCommonList;
    var $twinTownFound;
    var $noTwinTown;

    var init = function () {
        // set variables
        $twinTownResult = news.$('.ns12791_twinTownResult');
        $twinTownCityName = news.$('.ns12791_twinTownCityName');
        $twinTownCountryName = news.$('.ns12791_twinTownCountryName');
        $twinTownMilesAway = news.$('#ns12791_twinTownDistance_miles');
        $twinTownKmAway = news.$('#ns12791_twinTownDistance_km');
        $tracksInCommonNumber = news.$('#ns12791_tracksInCommon_number');
        $tracksInCommonList = news.$('.ns12791_tracksInCommon_list');
        $twinTownFound = news.$('.ns12791_twinTownFound');
        $noTwinTown = news.$('.ns12791_noTwinTown');

        // event listeners
        news.pubsub.on('display-twin-town-results', displayResults);
    };

    var updateCityName = function (twinTownString) {
        $twinTownCityName.text(utils.getCityFromString(twinTownString));
        $twinTownCountryName.text(utils.getCountryFromString(twinTownString));
    };

    var updateDistance = function (milesAway) {
        var kmAway = Math.round(milesAway / 0.6214);
        $twinTownMilesAway.text(milesAway.toLocaleString());
        $twinTownKmAway.text(kmAway.toLocaleString());
    };

    var updateTracksInCommon = function (commonTracksArray) {
        $tracksInCommonNumber.text(commonTracksArray.length);
        $tracksInCommonList.empty();
        news.$.each(commonTracksArray, function (index, value) {
            var li = $('<li>').text(value).appendTo($tracksInCommonList);
        });
    };

    var noTwinTown = function () {
        $twinTownFound.hide();
        $noTwinTown.show();
    };

    var twinTownFound = function (twinTownData) {
        updateCityName(twinTownData.name);
        updateDistance(twinTownData.distanceMiles);
        updateTracksInCommon(twinTownData.commonTracksList);
        $noTwinTown.hide();
        $twinTownFound.show();
    }

    var displayResults = function (twinTownData) {
        if (twinTownData) {
            twinTownFound(twinTownData);
        } else {
            noTwinTown();
        }
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});