exports.config_torrent_dir  = './torrent';
exports.config_out_dir      = './www-data';
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
        'publisher' : 'c.c动漫',
        'subtitle'  : 'GB'
    },
    'config' : {
//        'episode-start' : 1,
//        'episode-end'   : 12,
        'episode-date-start' : new Date('2016-10-15') 
    }
});