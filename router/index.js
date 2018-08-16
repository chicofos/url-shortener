var url = require('../url');

module.exports = function(express){

    var router = express.Router();

    router.route('/shorten')
        .post((req,res) => {
            url.SaveURL(req, (err, shorted) => {
                if(err) {
                    res.send({'shortUrl': err});
                    return;
                }
                res.send({'shortUrl': shorted});
            });
        });

    router.route('/')
        .get((req,res) => {
            res.render('index');
        });

    router.route('/:encoded_id')
        .get((req,res) => {
            url.FindURL(req, (err, url) => {
                if(err) res.end(err);
                res.redirect(url);
            });
        });

    return router;
}