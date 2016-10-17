var spawn = require('child_process').spawn;
var config = require('../config.js');

class downloader {
    constructor(){
        this.download_list = Array()
    }
    remove_download_item(item){
        for (let i = 0; i < this.download_list.length; ++i){
            if (this.download_list[i] === item){
                this.download_list.splice(i, 1);        // remove from 
            }
        }
    }
    download_from_torrent_url(torrent_url){
        var dlr = spawn('aria2c',[torrent_url,'--follow-torrent=true',`--dir=${config.config_out_dir}`,`--log=${config.config_log_file}`])
        dlr.on('exit',(code, signal) => {
            if (code !== 0){
                console.log(`Error with CODE=${code}, SIGNAL=${signal}`)
            }
            this.remove_download_item(dlr);
        })
    }
}

exports.downloader = downloader;