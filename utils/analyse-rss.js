var xmldom = require('xmldom');

var analyse_rss_acg_rip = (d) => {
    let doc = new xmldom.DOMParser().parseFromString(d);
    let items = doc.getElementsByTagName('item');
    var result = []
    for (let i = 0; i < items.length; ++i){
        let t = {
            'title' : items[i].getElementsByTagName('title')[0].firstChild.data,
            'description' : items[i].getElementsByTagName('description')[0].firstChild.data,
            'pubDate' : new Date(items[i].getElementsByTagName('pubDate')[0].firstChild.data),
            'torrentUrl' : items[0].getElementsByTagName('enclosure')[0].getAttribute('url')
        }
        result[i] = t;
    }
    return result;
}

exports.analyse_rss_acg_rip = analyse_rss_acg_rip;