# webCrawler
Just a simple web crawler using javascript & node

##Prerequisites
Need to install nvm during the run time or before.
- Can check the docs form here[https://github.com/nvm-sh/nvm]

required steps:
1. Install the script.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```
2. Load the nvm
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

To test the functions during development we can use a testing tool called *`jest`*.

```
npm install --save-dev jest
```

Test it using 
```
npm test
```

To get URL's from HTML we need a dependency called *`jsdom`*.
```
npm install jsdom
```
