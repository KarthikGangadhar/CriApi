'use strict';

exports.register = function (server, options, next) {
    require('../endpoints/get_all_scores.js')(server,options);
    require('../endpoints/get_news.js')(server,options);
    require('../endpoints/get_score_by_id.js')(server,options);
    require('../endpoints/get_commentry.js')(server,options);
    next();
};

exports.register.attributes = {
    pkg: {
        'name': 'cric api',
        'version': '1.0.0',
        'description': 'Endpoints for Cric API plugin',
        'main': 'index.js'
    }
};