export default{
    rank_songs: {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
        params: (id) => {
            return {
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                tpl: 3,
                page: 'detail',
                type: 'top',
                topid: id,
                _: new Date().getTime()
            }
        },
        jsonp: 'jsonpCallback'
    },
    search:{
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
        params: (key) => {
            return {
                is_xml: 0,
                format: 'jsonp',
                key: key,
                g_tk: 5381,
                loginUin: 0,
                hostUin: 0,
                inCharset: 'utf8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'yqq',
                needNewCode: 0
            }
        },
        jsonp: 'jsonpCallback'
    },
    hotkey: {
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
        params: () => {
            return {
                g_tk: 5381,
                loginUin: 0,
                hostUin: 0,
                format: 'jsonp',
                inCharset: 'utf8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'yqq',
                needNewCode: 0
            }
        },
        jsonp: 'jsonpCallback'
    },
    rank_list: {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
        params: () => {
            return {
                format: 'jsonp',
                g_tk: 5381,
                uin: 0,
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _: new Date().getTime()
            }
        },
        jsonp: 'jsonpCallback'
    },
}