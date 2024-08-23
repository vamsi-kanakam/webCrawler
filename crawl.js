const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`);

    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
            return
        }
        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Non HTML response, contet type: ${contentType} on page ${currentURL}`);
            return
        }
        console.log(await resp.text())
    }
    catch(err){
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`);
    }

}


function getURLsFromHTML(htmlBody,baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const linkedElements = dom.window._document.querySelectorAll('a')

    for(const linkedElement of linkedElements){
        if(linkedElement.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${linkedElement.href}`);
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with relative url ${err.message}`);
            }
            }
        else{
            //absolute
            try{
                const urlObj = new URL(linkedElement.href);
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with absolute url ${err.message}`);
            }
        }
    }

    return urls
}


function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostpath.length>0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0,-1);
    }
    return hostpath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}