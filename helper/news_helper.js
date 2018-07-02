var request = require('request');
var cheerio = require('cheerio');

var GetNewsData = function () {
    return new Promise((resolve, reject) => {
        request('http://www.cricapi.com/news/', function (error, response,
            html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var newsData = []
                $('div.well').each(function (i, element) {
                    let item = {
                        "title": "",
                        "description": "",
                        "Last_update": ""
                    };

                    var content = $(this).text();
                    var item_arr = content !== null && typeof (content) === 'string' ? content.trim().split('\n') : []
                    if (item_arr && item_arr.length > 0) {
                        item.title = item_arr[0] ? item_arr[0].trim() : "";
                        item.description = item_arr[1] ? item_arr[1].trim() : "";
                        item.Last_update = item_arr[3] ? item_arr[3].trim().split('Last update:')[1] : "";
                    }
                    newsData.push(item);
                });
                resolve(newsData);
            }
        });
    }).catch((error) => {
        reject(null);
    });
};

module.exports = {
    getNewsData: GetNewsData
};