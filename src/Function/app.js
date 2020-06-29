const puppeteer = require('puppeteer');

const genre = async (idGenre) => {
    const browser = await puppeteer.launch({
        args:["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36');

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image') {
            req.abort();
        }
        else {
            req.continue();
        }
    });

    await page.goto('https://music.youtube.com/moods_and_genres');
    const getBd = await page.evaluate(async (idGenre) => {
        const data = await fetch("https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30", {
            "headers": {
                "accept": "*/*",
                "accept-language": "es-419,es;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-goog-visitor-id": "CgthOTdKeTRVU2xYWSi6g-X3BQ%3D%3D",
                "x-youtube-ad-signals": "dt=1593393597976&flash=0&frm&u_tz=-300&u_his=4&u_java&u_h=490&u_w=400&u_ah=490&u_aw=400&u_cd=24&u_nplug&u_nmime&bc=31&bih=490&biw=400&brdim=0%2C0%2C0%2C0%2C400%2C0%2C400%2C490%2C400%2C490&vis=1&wgl=true&ca_type=image",
                "x-youtube-client-name": "67",
                "x-youtube-client-version": "0.1",
                "x-youtube-device": "cbr=Chrome&cbrver=83.0.4103.116&ceng=WebKit&cengver=537.36&cos=Windows&cosver=10.0",
                "x-youtube-page-cl": "317646540",
                "x-youtube-page-label": "youtube.music.web.client_20200622_00_RC00",
                "x-youtube-time-zone": "America/Chicago",
                "x-youtube-utc-offset": "-300"
            },
            "referrer": "https://music.youtube.com/explore",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "{\"context\":{\"client\":{\"clientName\":\"WEB_REMIX\",\"clientVersion\":\"0.1\",\"hl\":\"es-419\",\"gl\":\"PE\",\"experimentIds\":[],\"experimentsToken\":\"\",\"browserName\":\"Chrome\",\"browserVersion\":\"83.0.4103.116\",\"osName\":\"Windows\",\"osVersion\":\"10.0\",\"utcOffsetMinutes\":-300,\"locationInfo\":{\"locationPermissionAuthorizationStatus\":\"LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED\"},\"musicAppInfo\":{\"musicActivityMasterSwitch\":\"MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE\",\"musicLocationMasterSwitch\":\"MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE\",\"pwaInstallabilityStatus\":\"PWA_INSTALLABILITY_STATUS_UNKNOWN\"}},\"capabilities\":{},\"request\":{\"internalExperimentFlags\":[{\"key\":\"force_music_enable_outertube_music_queue\",\"value\":\"true\"},{\"key\":\"force_music_enable_outertube_search_suggestions\",\"value\":\"true\"},{\"key\":\"force_music_enable_outertube_tastebuilder_browse\",\"value\":\"true\"},{\"key\":\"force_music_enable_outertube_playlist_detail_browse\",\"value\":\"true\"},{\"key\":\"force_music_enable_outertube_album_detail_browse\",\"value\":\"true\"}],\"sessionIndex\":{}},\"clickTracking\":{\"clickTrackingParams\":\"CMwBELihBRgAIhMIi_To2-2l6gIVkjuzAB2ZNw1U\"},\"activePlayers\":{},\"user\":{\"enableSafetyMode\":false}},\"browseId\":\"FEmusic_moods_and_genres_category\",\"params\":\""+idGenre+"\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        const info = await data.json()
        return info
    },idGenre)
    /* const title = getBd.header.musicHeaderRenderer.title.runs[0].text
    const contents = getBd.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents
    const realInfo = {
        idGenre,
        title,
        contents
    } */
    await browser.close();
    /* return realInfo */
    return getBd
}

module.exports = genre;