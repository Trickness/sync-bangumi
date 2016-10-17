var https = require('http')
var xmldom = require('xmldom')
var name = encodeURI("一拳")
var analyse_rss_acg_rip = require('./utils/analyse-rss.js').analyse_rss_acr_rip
var analyse_file_name   = require('./utils/analyse-file-name.js').analyse_file_name
var downloader          = new (require('./utils/local-file-manager.js').downloader)()

var text = `http://localhost/test.xml`;

var respons_callback = (d) => {
    //console.log(analyse_rss_acg_rip(d.toString()))
    //console.log(analyse_file_name('[诸神字幕组][排球少年!!乌野高中VS白鸟泽学园高中][第三季][02][1080P][简繁日字幕][MKV]'))

    downloader.download_from_torrent_url('https://acg.rip/t/167633.torrent')
    //console.log(downloader);
}

console.log(text);

https.get(text, (res) => {
    res.on('data', respons_callback)
}).on('error', (e) => {
    console.log(e);
});