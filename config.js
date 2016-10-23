exports.config_torrent_dir  = './torrent';
exports.config_out_dir      = './www-data';     // do not add '/' 
exports.config_log_file     = './log.txt';

exports.bangumi_filter = [];

exports.bangumi_filter.push({
    'index' : [
        'publisher',
        'none',
        'title',
        'episode',
        'subtitle',
        'bit-rate',
        'formate'
    ],
    'value' : {
        'publisher' : 'c.c動漫',
        'subtitle'  : 'BIG5',
        'bit-rate'  : '720P',
        'formate'  : 'MP4'
    },
    'config' : {
//        'episode-start' : 1,
//        'episode-end'   : 12,
        'episode-date-start' : new Date('2016-1-1') 
    }
});