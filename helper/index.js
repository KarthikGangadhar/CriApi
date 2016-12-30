'use strict';

exports.register = function (server, options, next) {
    // require('../endpoints/get_scores.js')(server,options);
    require('../endpoints/news.js')(server,options);
    require('../endpoints/get_score_by_id.js')(server,options);
    require('../endpoints/commentry.js')(server,options);
    require('../endpoints/newsById.js')(server,options);
    require('../endpoints/matches.js')(server, options);
    require('../endpoints/cricket.js')(server, options);
    require('../endpoints/cricketScore.js')(server, options);    
    require('../endpoints/playerStats.js')(server, options);    
    require('../endpoints/matchCalendar.js')(server, options);    
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