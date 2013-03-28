YUI.add('date-tests', function(Y) {

    //Helper function to normalize timezone dependent hours.
    var getHours = function(date, pad) {
        pad = (pad === false) ? false : true;
        var h = date.getHours();
        if (h > 12) {
            h = (h - 12);
        }
        if (h === 0) {
            h = 12;
        }
        if (h < 10 & pad) {
            h = '0' + h;
        }
        return h;
    };

    // Set up the page
    var LANG = Y.Lang,
        ASSERT = Y.Assert,
        ARRAYASSERT = Y.ArrayAssert;

    var testParse = new Y.Test.Case({
        name: "Date Parse Tests",

        testUndefined: function() {
            var date = Y.Date.parse();
            ASSERT.isNull(date, "Expected null.");
        },

        testNull: function() {
            var date = Y.Date.parse(null);
            ASSERT.isTrue(LANG.isDate(date), "Expected date.");
        },

        testParse: function() {
            var date, parsed;

            date = new Date("December 17, 1995 03:24:00");
            parsed = Y.Date.parse("December 17, 1995 03:24:00");
            ASSERT.isTrue(LANG.isDate(parsed), "Parsing date string. Expected date.");
            ASSERT.areEqual(+date, +parsed, "Parsing date string. Dates should have matched.");

            date = new Date();
            parsed = Y.Date.parse(date);
            ASSERT.isTrue(LANG.isDate(parsed), "Parsing date object. Expected date.");
            ASSERT.areEqual(+date, +parsed, "Parsing date object. Dates should have matched.");

            date = new Date(819199440000);
            parsed = Y.Date.parse(819199440000);
            ASSERT.isTrue(LANG.isDate(parsed), "Parsing numeric timestamp. Expected date.");
            ASSERT.areEqual(+date, +parsed, "Parsing numeric timestamp. Dates should have matched.");

            parsed = Y.Date.parse('819199440000');
            ASSERT.isTrue(LANG.isDate(parsed), "Parsing string timestamp. Expected date.");
            ASSERT.areEqual(+date, +parsed, "Parsing string timestamp. Dates should have matched.");
        }
    });

    var testFormat = new Y.Test.Case({
        name: "Date Format Tests",

        testUndefined: function() {
            var output = Y.Date.format();
            ASSERT.areSame("", output, "Expected empty string.");
        },

        testNull: function() {
            var output = Y.Date.format(null);
            ASSERT.areSame("", output, "Expected empty string.");
        },

        testFormats: function() {
            var date = new Date(819199440000),
                output;

            //Must set this here because other tests are "resetting" the default lang.
            Y.Intl.setLang("datatype-date-format", "en-US");

            output = Y.Date.format(date);
            ASSERT.areSame("1995-12-17", output, "Expected default format (%F)");

            output = Y.Date.format(date, {format:"%D"});
            ASSERT.areSame("12/17/95", output, "Expected %D format.");

            output = Y.Date.format(date, {format:"%R"});
            ASSERT.areSame(getHours(date) + ":24", output, "Expected %R format.");

            output = Y.Date.format(date, {format:"%C"});
            ASSERT.areSame(19, parseInt(output, 10), 'Expected %C format.');

            output = Y.Date.format(date, {format:"%g"});
            ASSERT.areSame(95, parseInt(output, 10), 'Expected %g format.');

            output = Y.Date.format(date, {format:"%G"});
            ASSERT.areSame(1995, parseInt(output, 10), 'Expected %G format.');

            output = Y.Date.format(date, {format:"%j"});
            ASSERT.areSame(351, parseInt(output, 10), 'Expected %j format.');

            output = Y.Date.format(date, {format:"%l"});
            ASSERT.areSame(getHours(date, false), parseInt(output, 10), 'Expected %l format.');


            output = Y.Date.format(date, {format:"%s"});
            ASSERT.areSame(819199440, parseInt(output, 10), 'Expected %s format.');

            output = Y.Date.format(date, {format:"%u"});
            ASSERT.areSame(7, parseInt(output, 10), 'Expected %u format.');

            output = Y.Date.format(date, {format:"%U"});
            ASSERT.areSame(51, parseInt(output, 10), 'Expected %U format.');


            output = Y.Date.format(date, {format:"%V"});
            ASSERT.areSame(50, parseInt(output, 10), 'Expected %V format.');

            output = Y.Date.format(date, {format:"%W"});
            ASSERT.areSame(50, parseInt(output, 10), 'Expected %W format.');

            output = Y.Date.format(date, {format:"%Z"});
            var tz = date.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
            ASSERT.areSame(tz, output, 'Expected %Z format.');

            output = Y.Date.format(date, {format:"%"});
            ASSERT.areSame('%', output, 'Expected % format.');

            output = Y.Date.format(date, {format:"%a %A"});
            ASSERT.areSame("Sun Sunday", output, "Expected %a %A format.");

            output = Y.Date.format(date, {format:"%b %B"});
            ASSERT.areSame("Dec December", output, "Expected %b %B format.");

            output = Y.Date.format(date, {format:"%r"});
            ASSERT.areSame(getHours(date) + ":24:00 AM", output, "Expected %r format.");

            output = Y.Date.format(date, {format:"%P"});
            ASSERT.areSame('am', output, 'Expected %P format.');

        }
    });

    var testFormatUS = new Y.Test.Case({
        name: "Date Format U.S. Tests",

        testUS: function() {
            ASSERT.isNotNull(dateUS, "Expected U.S. Date to be loaded.");

            var date = new Date(819199440000),
                output;

            output = dateUS.format(date);
            ASSERT.areSame("1995-12-17", output, "Expected default format (%F).");

            output = dateUS.format(date, {format:"%a %A"});
            ASSERT.areSame("Sun Sunday", output, "Expected %a %A format.");

            output = dateUS.format(date, {format:"%b %B"});
            ASSERT.areSame("Dec December", output, "Expected %b %B format.");

            output = dateUS.format(date, {format:"%x"});
            ASSERT.areSame("12/17/95", output, "Expected %x format.");

            output = dateUS.format(date, {format:"%r"});
            ASSERT.areSame(getHours(date) + ":24:00 AM", output, "Expected %r format.");
        }
    });

    var testFormatFR = new Y.Test.Case({
        name: "Date Format French Tests",

        testFrench: function() {
            ASSERT.isNotNull(dateFR, "Expected French Date to be loaded.");

            var date = new Date(819199440000),
                output;

            output = dateFR.format(date);
            ASSERT.areSame("1995-12-17", output, "Expected default format (%F).");

            output = dateFR.format(date, {format:"%a %A"});
            ASSERT.areSame("dim. dimanche", output, "Expected %a %A format.");

            output = dateFR.format(date, {format:"%b %B"});
            ASSERT.areSame("déc. décembre", output, "Expected %b %B format.");

            output = dateFR.format(date, {format:"%x"});
            ASSERT.areSame("17/12/95", output, "Expected %x format.");

            output = dateFR.format(date, {format:"%r"});
            ASSERT.areSame(getHours(date) + ":24:00 AM", output, "Expected %r format.");
        }
    });

    var testFormatKR = new Y.Test.Case({
        name: "Date Format Korean Tests",

        testKorean: function() {
            ASSERT.isNotNull(dateKR, "Expected Korean Date to be loaded.");

            var date = new Date(819199440000),
                output;

            output = dateKR.format(date);
            ASSERT.areSame("1995-12-17", output, "Expected default format (%F).");

            output = dateKR.format(date, {format:"%a %A"});
            ASSERT.areSame("일 일요일", output, "Expected %a %A format.");

            output = dateKR.format(date, {format:"%b %B"});
            ASSERT.areSame("12월 12월", output, "Expected %b %B format.");

            output = dateKR.format(date, {format:"%x"});
            ASSERT.areSame("95. 12. 17.", output, "Expected %x format.");

            output = dateKR.format(date, {format:"%r"});
            ASSERT.areSame(getHours(date) + ":24:00 오전", output, "Expected %r format.");
        }
    });

    var testFormatIN = new Y.Test.Case({
        name: "Date Format Punjabi Tests",

        testPunjabi: function() {

            // provide data in Punjabi for India
            Y.Intl.add("datatype-date-format", "pa-IN", {
                    "a":["ਐਤ.","ਸੋਮ.","ਮੰਗਲ.","ਬੁਧ.","ਵੀਰ.","ਸ਼ੁਕਰ.","ਸ਼ਨੀ."],
                    "A":["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨੀਚਰਵਾਰ"],
                    "b":["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ"],
                    "B":["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ"],
                    "c":"%a, %Y %b %d %l:%M:%S %p %Z",
                    "p":["ਸਵੇਰੇ","ਸ਼ਾਮ"],
                    "P":["ਸਵੇਰੇ","ਸ਼ਾਮ"],
                    "x":"%d/%m/%Y",
                    "X":"%l:%M:%S %p"
                });
            // switch to Punjabi
            Y.Intl.setLang("datatype-date-format", "pa-IN");

            var dateIN = Y.Date;

            ASSERT.isNotNull(dateIN, "Expected Punjabi Date to be loaded.");

            var date = new Date(819199440000),
                output;

            output = dateIN.format(date);
            ASSERT.areSame("1995-12-17", output, "Expected default format (%F).");

            output = dateIN.format(date, {format:"%a %A"});
            ASSERT.areSame("ਐਤ. ਐਤਵਾਰ", output, "Expected %a %A format.");

            output = dateIN.format(date, {format:"%b %B"});
            ASSERT.areSame("ਦਸੰਬਰ ਦਸੰਬਰ", output, "Expected %b %B format.");

            output = dateIN.format(date, {format:"%x"});
            ASSERT.areSame("17/12/1995", output, "Expected %x format.");

            output = dateIN.format(date, {format:"%r"});
            ASSERT.areSame(getHours(date) + ":24:00 ਸਵੇਰੇ", output, "Expected %r format.");
        }
    });

    var testParserWithFormat = new Y.Test.Case({
        testParsing: function () {
            var values = [
                ["01/02/2003","%d/%m/%Y", 2003,1,1],
                ["01/Mar/2003","%d/%b/%Y",2003,2,1],
                ["01/March/2003","%d/%B/%Y",2003,2,1],
                ["01 - 02 - 2003","%d - %m - %Y",2003,1,1],
                ["01 - Mar - 2003","%d - %b - %Y",2003,2,1],
                ["01 - March - 2003","%d - %B - %Y",2003,2,1],
                ["Sat, March 01, 2003", "%a, %B %d, %Y",2003,2,1],
                ["Saturday, March 01, 2003", "%A, %B %d, %Y",2003,2,1],
                [new Date(2013, 2, 27, 17, 56, 13).toString(),"%a %b %d %Y %T GMT%z", 2013, 2, 27, 17, 56, 13]
            ];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                ASSERT.areSame(
                    (new Date(v[2] || 0, v[3] || 0, v[4] || 0,v[5] || 0,v[6] || 0,v[7] || 0,v[8] || 0)).getTime(),
                    Y.Date.parse(v[0], v[1]).getTime(),
                    v[0] + ', ' + v[1]
                );
            }
        },
        testParsingFR:function () {
            var values = [
                ["01/02/2003","%d/%m/%Y", 2003,1,1],
                ["01/mars/2003","%d/%b/%Y", 2003,2,1],
                ["01/mars/2003","%d/%B/%Y", 2003,2,1],
                ["01 - 02 - 2003","%d - %m - %Y", 2003,1,1],
                ["01 - mars - 2003","%d - %b - %Y", 2003,2,1],
                ["01 - mars - 2003","%d - %B - %Y", 2003,2,1],
                ["sam., mars 01, 2003", "%a, %B %d, %Y", 2003,2,1],
                ["samedi, mars 01, 2003", "%A, %B %d, %Y", 2003,2,1]
            ];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                ASSERT.areSame(
                    (new Date(v[2] || 0, v[3] || 0, v[4] || 0,v[5] || 0,v[6] || 0,v[7] || 0,v[8] || 0)).getTime(),
                    dateFR.parse(v[0], v[1]).getTime(),
                    v[0] + ', ' + v[1]
                );
            }
        }
    });

    var testFormatAvailable = new Y.Test.Case({
        name: "Date Format Available Format Tests",

        testAvailable: function() {

            var available = Y.Intl.getAvailableLangs("datatype-date-format");

            ASSERT.isArray(available, "Expected getAvailableLangs to return array.");
            Y.assert(available.length > 30, "Expected at least 30 available languages.");
            Y.assert(Y.Array.indexOf(available, "ar-JO") >= 0, "Expected ar-JO to be available.");
            Y.assert(Y.Array.indexOf(available, "de-DE") >= 0, "Expected de-DE to be available.");
            Y.assert(Y.Array.indexOf(available, "en-US") >= 0, "Expected en-US to be available.");
            Y.assert(Y.Array.indexOf(available, "th-TH") >= 0, "Expected th-TH to be available.");
            Y.assert(Y.Array.indexOf(available, "zh-Hant-TW") >= 0, "Expected zh-Hant-TW to be available.");

        }
    });

    var suite = new Y.Test.Suite("Date");
    suite.add(testParse);
    suite.add(testFormatUS);
    suite.add(testFormatFR);
    suite.add(testFormatKR);
    suite.add(testFormatIN);
    suite.add(testFormatAvailable);
    suite.add(testFormat);
    suite.add(testParserWithFormat);

    Y.Test.Runner.add(suite);

});
