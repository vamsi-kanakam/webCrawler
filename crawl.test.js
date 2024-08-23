const {normalizeURL,getURLsFromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')


// Test for normalize urls
test('normalizeURL strip protocol',()=> {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash',()=> {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip Capitals',()=> {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


// Tests for getURLsFromHTML

test('getURLsFromHTML Absolute url',()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Relative url',()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Invalid url',()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid url
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})
