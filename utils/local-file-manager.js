var https = require('https');
var spawn = require('child_process').spawn;
var config = require('../config.js');
var analyse_file_name   = require('./analyse-file-name.js').analyse_file_name;
var rssManager= require('./analyse-rss.js');
var url = 'https://acg.rip/.xml?term=';

var indexOf = (array, key) => {
    for (let i = 0; i < array.length; ++i){
        if (array[i] === key)
            return i;
    }
    return -1;
}

class statusManager {
    constructor(bangumi_name,dlr,filter){
        this.bangumi_name = bangumi_name;
        this.bangumi_newest_date = new Date('2016-1-1');
        this.bangumi_newest_episode = 0;
        this.downloader = dlr;
        this.rssUrl = url + encodeURI(this.bangumi_name);
        this.filter = filter;
    }
    isDownloadable(date,episode){
        if (date > this.bangumi_newest_date && episode > this.bangumi_newest_episode){
            return true;
        }else{
            return false;
        }
    }
    addFilter(key,value){
        this.filter.value.set(key,value);
    }
    deleteFilter(key){
        this.filter.value.delete(key);
    }
    analyseRss(d){
        let rssList = rssManager.analyse_rss_acg_rip(d.toString());
        var rssListFilted = [];
        for(let v of rssList){
            let details = analyse_file_name(v.title);
            var match = true;
            for (let i = 0; i < Math.min(this.filter.index.length,details.params.length); ++i){
                if (this.filter.value[this.filter.index[i]] !== undefined){
                    if (this.filter.value[this.filter.index[i]] !== details.params[i]){
                        match = false;
                        break;
                    }
                }
            }
            let episode = parseInt(details.params[indexOf(this.filter.index,'episode')]);
            if(isNaN(episode))
                episode = 0;
            if (this.filter.config['episode-start'] !== undefined && this.filter.config['episode-start'] >= 0) {
                if(episode < this.filter.config['episode-start']){
                    match = false;
                }
            }
            if (this.filter.config['episode-end'] !== undefined && this.filter.config['episode-end'] >= 1) {
                if(episode > this.filter.config['episode-end']){
                    match = false;
                }
            }
            if (this.filter.config['episode-date-start'] !== undefined) {
                if(v.pubDate < this.filter.config['episode-date-start'] || v.pubDate < this.bangumi_newest_date){
                    match = false;
                }
            }
            if(match === true){
                rssListFilted.push(v);
            }
        }
        let nd = this.bangumi_newest_date;
        let od = this.bangumi_newest_date;
        let len = rssListFilted.length;
        for (let i = 0; i < len; ++i){
            let tmp = rssListFilted.pop();
            if(tmp.pubDate > od){
                rssListFilted.push(tmp);
            }
            if(tmp.pubDate > nd){
                nd = tmp.pubDate;
            }
        }
        this.bangumi_newest_date = nd;
        this.download(rssListFilted);
    }
    refreshRss(){
        console.log(this.rssUrl);
        https.get(this.rssUrl, (res) => {
        //https.get('http://localhost/test.xml', (res) => {
            res.on('data', (d) => {
                this.analyseRss(d);
                let oneSecond = 1000 * 30; // one second = 0.5 min
                setTimeout(() => {
                    this.refreshRss();
                }, oneSecond);
            });
        }).on('error', (e) => {
            console.log(e);
        });
    }
    download(rssList){
        rssList.forEach((v) => {
            this.downloader.download_from_torrent_url(v.torrentUrl);
        },this);
    }
}

class downloader {
    constructor(){
        this.download_list = Array();
    }
    remove_download_item(item){
        for (let i = 0; i < this.download_list.length; ++i){
            if (this.download_list[i] === item){
                this.download_list.splice(i, 1);        // remove from 
            }
        }
    }
    download_from_torrent_url(torrent_url){ // ,'--follow-torrent=true'
        var dlr = spawn('aria2c',[torrent_url ,'--follow-torrent=true',`--dir=${config.config_out_dir}`,`--log=${config.config_log_file}`])
        this.download_list.push(dlr);
        dlr.on('exit',(code, signal) => {
            if (code !== 0){
                console.log(`Error with CODE=${code}, SIGNAL=${signal}`);
            }
            this.remove_download_item(dlr);
        });
    }
}

exports.downloader  = downloader;
exports.manager     = statusManager;
