var Url = require('../models/url')
var base58 = require('../encoder/base58');
var config = require('../config');

exports.SaveURL = (req, callback) => {

  var longUrl = req.body.url;
  var shortUrl = '';

    if(longUrl == "") {
        callback('No URL provided');
    } else{
        Url.findOne({long_url: longUrl}, (err, doc) => {
            if (doc){
              shortUrl = config.webhost + base58.encode(doc._id);
              callback(null,shortUrl);
            } 
            else {
                var newUrl = Url({ long_url: longUrl });
        
                newUrl.save((err) =>{
                    if (err) callback(err);
        
                    shortUrl = config.webhost + base58.encode(newUrl._id);
                    callback(null, shortUrl);
                });
            }
          });
    }


}

exports.FindURL = (req,callback) => {

    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);

    Url.findOne({_id: id}, (err, doc) => {
        doc != null ? callback(null, doc.long_url) : callback(null, config.webhost);
    });
}

