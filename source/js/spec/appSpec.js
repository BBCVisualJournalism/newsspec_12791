define(['lib/news_special/bootstrap', 'utils'],  function (news, utils) {

    describe('app', function () {
        it('true is truthy', function () {
            expect(true).toBeTruthy();
        });
    });

    describe('Diacritics being removed correctly', function () {
        it('should replace all accented characters with their corresponding non-accented characters', function () {
            var accents = '';
            var noAccents = '';
            for (var i = 0; i < utils.defaultDiacriticsRemovalMap.length; i++) {
                accents += utils.defaultDiacriticsRemovalMap[i].letters;
                for (var j = 0; j < utils.defaultDiacriticsRemovalMap[i].letters.length; j++) {
                    noAccents += utils.defaultDiacriticsRemovalMap[i].base;
                }
            }
            console.log('accents', accents);
            console.log('noAccents', noAccents);
            expect(utils.removeDiacritics(accents)).toBe(noAccents);
        });
    });

});