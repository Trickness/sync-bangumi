var config = require('./config.js');
var manager = require('./utils/local-file-manager.js').manager;
var analyse_file = require('./utils/analyse-file-name.js').analyse_file_name;
var rssManager = require('./utils/analyse-rss.js');
global.dlr              = new (require('./utils/local-file-manager.js').downloader)();

var text = `http://localhost/test.xml`;

var rssManagerList = [];

var mgr = new manager('夏目友人帐',global.dlr,config.bangumi_filter[0]);
mgr.refreshRss();
//console.log(analyse_file('[澄空学园&华盟字幕社][10月新番] Sound!Euphonium2 吹响吧！悠风号2 第02话 MP4 1080p HEVC'));