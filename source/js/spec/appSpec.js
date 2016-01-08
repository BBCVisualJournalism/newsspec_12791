define(['lib/news_special/bootstrap', 'app', 'utils'],  function (news, app, utils) {

    beforeEach(function () {
        news.$('body').append('<div class="main">some fixture data <div id="main">test em!</div></div>');
    });

    afterEach(function () {
        //news.$('.main').remove();
    });

    describe('app', function () {
        it('', function () {
            expect(true).toBeTruthy();
        });
    });

    describe('Diacritics being removed correctly', function () {
        it('should replace all accented characters with their corresponding non-accented characters', function () {
            var accents = 'Dïjkštrå',
                noAccents = 'Dijkstra';
            expect(utils.removeDiacritics(accents)).toBe(noAccents);
        });
    });

});