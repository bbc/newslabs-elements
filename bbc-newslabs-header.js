(function () {

    // Mobile friendly page
    if (document.querySelectorAll('meta[name=viewport]').length == 0) {
        const m = document.createElement('meta')
        m.name = 'viewport'
        m.content = 'width=device-width, initial-scale=1'
        document.querySelector('head').appendChild(m)
    }

    window.bbc = window.bbc || {}

    // An Event Bus.
    // Used to send messages between distinct components on a page, regardless of component technology used.
    // - https://pineco.de/creating-a-javascript-event-bus/ (general concept)
    // - https://stackoverflow.com/a/34418446/7656091 : private data (bus inside the constructor method), and public methods (also inside the constructor, but prefixed with this.)
    bbc.EventBus = new class {
        constructor() {
            const bus = document.createElement('Newslabs-EventBus')
            this.addEventListener = function(event, callback) {
                bus.addEventListener(event, callback)
            }
            this.removeEventListener = function(event, callback) {
                bus.removeEventListener(event, callback)
            }
            this.dispatchEvent = function(event, detail = {}) {
                bus.dispatchEvent(new CustomEvent(event, {detail}))
            }
        }
    }

    // Dynamic JS dependency-stack injection - https://stackoverflow.com/a/62969633/7656091
    bbc.addDependentScripts = async function (scriptsToAdd) {
        const s = document.createElement('script')
        for (var i = 0; i < scriptsToAdd.length; i++) {
            let r = await fetch(scriptsToAdd[i])
            s.text += await r.text()
        }
        window.addEventListener('load', function (event) {
            document.querySelector('body').appendChild(s)
        })
    }

    // Checks if we can see Reith - i.e. ZScaler is on or a VPN is up
    bbc.onReith = function (onReithCB, offReithCB) {
        if (typeof (onReithCB) !== 'function') {
            console.log('Usage: bbc.onReith(fn1, [fn2]) where fn1=onReithCallback, fn2=offReithCallback')
            return
        }
        let xhr = new XMLHttpRequest()
        let check = 'https://onreith.labs.jupiter.bbc.co.uk/'
        xhr.timeout = 5000
        xhr.open('HEAD', check, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    console.log('bbc.onReith: false')
                    if (typeof (offReithCB) === 'function') {
                        offReithCB()
                    }
                }
                if (xhr.status === 200) {
                    console.log('bbc.onReith: true')
                    onReithCB()
                }
            }
        }
        xhr.send()
    }

    // add selected core files to all pages
    let filesToAdd = []

    // Optional bootstrap. To activate, add this class to the html node: <html class=newslabs-bootstrap> 
    // Here, order is important as BS depends on JQ
    if (document.querySelector('html').classList.contains('newslabs-bootstrap')) {
        filesToAdd.push('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css')
        filesToAdd.push('https://code.jquery.com/jquery-3.5.1.slim.min.js')
        filesToAdd.push('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js')
    }

    // Our own additions. css and js files are supported, creating <link rel=stylesheet> or <script> as appropriate.
    filesToAdd.push('https://bbc.github.io/newslabs-elements/core.css')

    let jsToAdd = []

    const firstCSSNode = document.querySelector('link[rel=stylesheet]')
    let firstCSS = false

    filesToAdd.forEach(url => {
        let n = -1
        let x = url.split('.')
        let ext = x[x.length - 1]
        if (ext == 'css') n = document.querySelectorAll('link[href*="' + url + '"]').length
        if (ext == 'js') n = document.querySelectorAll('script[src*="' + url + '"]').length
        if (n == 0) {
            let e = null
            if (ext == 'css') {
                e = document.createElement('link')
                e.rel = 'stylesheet'
                e.href = url
                if (firstCSS === false) {
                    if (firstCSSNode !== null) {
                        firstCSS = firstCSSNode.parentNode.insertBefore(e, firstCSSNode)
                    } else {
                        firstCSS = document.querySelector('head').appendChild(e)
                    }
                } else {
                    firstCSS.after(e)
                }
            }
            if (ext == 'js') {
                jsToAdd.push(url)
            }
        }
    })

    bbc.addDependentScripts(jsToAdd)
})()

customElements.define(
    'bbc-newslabs-header',
    class extends HTMLElement
{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<style>
@import "https://bbc.github.io/newslabs-elements/core.css";
:host(bbc-newslabs-header) {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 999999;
}
div.outer{
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid silver;
    background: #fff;
    font-size: 20px;
    color: #404040;
}
div.outer div{
    white-space: nowrap;
}
#blocks{
    width: 94px;
    min-width: 94px;
    text-align: center;
    border-right: 1px solid silver;
    position: relative;
}
#blocks svg{
    position: absolute;
    left: 12px;
    top: 10px;
}
#app{
    padding: 0px 12px;
    border-right: 1px solid silver;
    font-weight: bold;
    overflow: hidden;
}
#app:empty{
    display: none;
}
div.outer[applink] #app:hover{
    background: linear-gradient(0deg, var(--nl-red) 4px, transparent 0px);
    cursor: pointer;
}
#subtitle{
    padding: 0px 12px;
    flex-grow: 1;
    font-size: 18px;
    font-weight: 400;
    overflow: hidden;
}
#userinfo{
    font-size: 15px;
    font-weight: 100;
    padding: 0px 10px;
    border-left: 1px solid silver;
    display: none;
}
#userinfo svg{
    margin-top: 10px;
    vertical-align: top;
    margin-right: 10px;
}
@media screen and (max-width: 490px) {
    #userid{
        display: none !important;
    }
    #userinfo svg{
        padding-right: 0px;
    }
}
div.proto{
    display: none;
    padding: 22px 0em 0em;
    background: var(--nl-red);
    color: white;
    font-weight: bold;
    transform: rotate(-45deg);
    transform-origin: bottom right;
    width: 7em;
    top: -13px;
    position: absolute;
    left: -37px;
    text-align: center;
    z-index: -1;
    height: 50px;
    font-family: sans-serif;
}
#help{
    padding: 10px 11px 0;
    cursor: pointer;
    border-left: 1px solid silver;
    display: none;
}
#help[active]{
    display: unset;
}
#help:hover{
    background-color: var(--nl-red);
}
#help[active][text]{
    padding-top: 0px;
    font-size: 18px;
}
#help[active][text] svg{
    display: none;
}
#help[active][text]:before{
    content: attr(text);
}
#help[active][text]:hover{
    color: white;
}
</style>
<div class=outer>
<div id=blocks class=inner>
<svg version="1.1"
xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
height="20px" viewBox="-400 -67.353 1000 285.013" enable-background="new -400 -67.353 1000 285.013" xml:space="preserve">
<rect style="opacity:1;fill:white;fill-opacity:1;stroke:#3757c4;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
id="rect835" width="176.7767" height="224.98853" x="-336.66287" y="-37.579075" />
<rect style="opacity:1;fill:white;fill-opacity:1;stroke:#3757c4;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
id="rect837" width="171.10472" height="224.0432" x="15.94516" y="-39.469738" />
<rect style="opacity:1;fill:white;fill-opacity:1;stroke:#3757c4;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
id="rect839" width="209.86325" height="221.2072" x="335.46667" y="-34.743092" />
<path d="M141.817,116.848c0,30.971-38.541,29.133-38.541,29.133h-38.54V90.018h38.54
C142.939,89.752,141.817,116.848,141.817,116.848 M64.736,4.67h29.368c30.496,1.611,29.345,24.316,29.345,24.316
c0,28.216-33.721,28.676-33.721,28.676H64.736V4.67z M134.688,68.667c0,0,26.38-11.241,26.145-41.057
c0,0,4.012-48.864-60.729-54.824H28.266v204.849h82.344c0,0,68.802,0.205,68.802-57.799
C179.411,119.836,181.038,80.363,134.688,68.667 M-51.227-67.353h302.453V217.66H-51.227V-67.353z M-206.959,116.848
c0,30.971-38.541,29.133-38.541,29.133h-38.543V90.018h38.543C-205.834,89.752-206.959,116.848-206.959,116.848 M-284.043,4.67
h29.374c30.497,1.611,29.343,24.316,29.343,24.316c0,28.216-33.719,28.676-33.719,28.676h-24.998V4.67z M-214.085,68.667
c0,0,26.384-11.241,26.147-41.057c0,0,4.009-48.864-60.732-54.824h-71.841v204.849h82.349c0,0,68.801,0.205,68.801-57.799
C-169.361,119.836-167.74,80.363-214.085,68.667 M-400-67.353h302.453V217.66H-400V-67.353z M538.301-12.528v37.846
c0,0-36.942-22.702-77.764-23.159c0,0-76.161-1.495-79.594,73.005c0,0-2.751,68.513,78.676,72.417c0,0,34.165,4.115,80.514-25.441
v39.195c0,0-62.173,36.939-134.197,8.488c0,0-60.545-22.109-62.851-94.659c0,0-2.518-74.619,78.23-99.389
c0,0,21.563-8.255,60.313-4.586C481.629-28.812,504.789-26.521,538.301-12.528 M297.547,217.66H600V-67.353H297.547V217.66z"/>
</svg>
</div>
<div id=app class=inner>${this.app}</div>
<div id=subtitle class=inner></div>
<div id=help title="Help" class=inner>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
	<title>
		help
	</title>
    <circle cx="10" cy="10" r="8" fill="white"></circle>
	<path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm1 16H9v-2h2zm2.71-7.6a2.63 2.63 0 0 1-.34.74 3.06 3.06 0 0 1-.48.55l-.54.48c-.21.18-.41.35-.59.52a3 3 0 0 0-.47.56A2.49 2.49 0 0 0 11 12a4.12 4.12 0 0 0-.11 1H9.08a8.68 8.68 0 0 1 .08-1.25 3.54 3.54 0 0 1 .24-.9 2.81 2.81 0 0 1 .41-.68 4.63 4.63 0 0 1 .58-.58l.51-.44a3 3 0 0 0 .44-.45 1.92 1.92 0 0 0 .3-.54 2.13 2.13 0 0 0 .11-.72 1.94 1.94 0 0 0-.18-.86 1.79 1.79 0 0 0-.43-.58 1.69 1.69 0 0 0-.54-.32 1.55 1.55 0 0 0-.5-.1 1.77 1.77 0 0 0-1.53.68 3 3 0 0 0-.49 1.82H6.16a4.84 4.84 0 0 1 .28-1.68 3.57 3.57 0 0 1 .8-1.29 3.62 3.62 0 0 1 1.27-.83A4.52 4.52 0 0 1 10.18 4a4.42 4.42 0 0 1 1.43.23 3.48 3.48 0 0 1 1.16.65 3 3 0 0 1 .78 1.06 3.49 3.49 0 0 1 .28 1.44 3.63 3.63 0 0 1-.12 1.02z"/>
</svg>
</div>
<div id=userinfo class=inner>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="20px" viewBox="0 0 32 32" xml:space="preserve">
<circle cx="16" cy="16" r="6.1"></circle><path d="M16 0a16 16 0 0 0 0 32 16.1 16.1 0 0 0 8.6-2.7L22.1 24H9.9l-1.6 3.5A13.8 13.8 0 0 1 2 15.9a14 14 0 1 1 23.9 10l.9 1.9A16 16 0 0 0 16 0z"></path>
</svg><span id="userid"></span>
</div>
</div>
<div class="proto">BETA</div>
`
        if (window.location.protocol == 'https:') {
            fetch('/whoami/')
                .then(this.fetchError)
                .then(resp => resp.json())
                .then(user => {
                    this.userid = user.userid
                    this.userinfo = user.displayname + '\n' + user.department + '\n' + user.mail
                    window.bbc.userinfo = user
                    fetch('/generic-apis/whois/' + user.mail)
                        .then(this.fetchError)
                        .then(resp => resp.json())
                        .then(json => {
                            window.bbc.userinfo.org = window.bbc.userinfo.org || {}
                            let h = window.document.querySelector('bbc-newslabs-header')
                            h.userid = json.retval.userid
                            h.userinfo = json.retval.displayname + '\n' + json.retval.department + '\n' + json.retval.mail
                            if (json.retval.directorate) window.bbc.userinfo.org.directorate = json.retval.directorate
                            if (json.retval.building) window.bbc.userinfo.org.building = json.retval.building
                            if (json.retval.room) window.bbc.userinfo.org.room = json.retval.room
                            if (json.retval.groups) window.bbc.userinfo.groups = json.retval.groups
                            if (json.retval.title) window.bbc.userinfo.title = json.retval.title
                        })
                })
                .catch(err => { })
        }

    }

    fetchError(resp) {
        if (!resp.ok) {
            throw Error(resp.statusText)
        }
        return resp
    }

    connectedCallback() {
        if (this.hasAttribute('help')) {
            this._helpon()
        }
        if (this.hasAttribute('beta')) {
            this.shadowRoot.querySelector('.proto').style.display='inline-block'
        }
    }

    _helpon() {
        if (this.help.length < 3) return
        const h = this.shadowRoot.getElementById('help')
        h.setAttribute('active', 'active')
        h.addEventListener('click', evt => {
            if (this.help[0] == '#') {
                window.location.hash = this.help
            }
            else {
                window.location.href = this.help
            }
        })
        if (!this.helptext || this.helptext.length < 1) return
        h.setAttribute('text', this.helptext)
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        if (oldvalue != newvalue) {
            if (name == 'applink') {
                const app = this.shadowRoot.querySelector('#app')
                app.setAttribute('title', 'Open ' + newvalue)
                app.addEventListener('click', evt => {
                    window.location.href = newvalue
                })
                this.shadowRoot.querySelector('div.outer').setAttribute(name, name)
            } else if (name == 'app') {
                this.shadowRoot.getElementById('app').innerHTML = this.app
            } else if (name.slice(0,4) == 'help') {
                _helpon()
            } else {
                const node = this.shadowRoot.getElementById(name)
                if (name != 'userinfo' && typeof (node) !== "undefined") node.innerHTML = newvalue
            }
            if (name == 'userid') {
                this.shadowRoot.getElementById('userinfo').style.display = 'inline-block'
            }
            if (name == 'userinfo') {
                this.shadowRoot.getElementById('userinfo').setAttribute('title', newvalue)
            }
        }
    }

    get app() {
        let app, meta
        if ((app=this.getAttribute('app'))) return app
        if ((meta=document.querySelector('meta[name=application-name]')) && (app=meta.getAttribute('content'))) return app
        return ""
    }

    set app(v) { this.setAttribute('app', v) }

    get applink() { return this.getAttribute('applink') }
    set applink(v) { this.setAttribute('applink', v) }

    get userid() { return this.getAttribute('userid') }
    set userid(v) { this.setAttribute('userid', v) }

    get userinfo() { return this.getAttribute('userinfo') }
    set userinfo(v) { this.setAttribute('userinfo', v) }

    get subtitle() { return this.getAttribute('subtitle') }
    set subtitle(v) { this.setAttribute('subtitle', v) }

    get help() { return this.getAttribute('help') }
    set help(v) { this.setAttribute('help', v) }

    get helptext() { return this.getAttribute('helptext') }
    set helptext(v) { this.setAttribute('helptext', v) }

    static get observedAttributes() {
        return [
            'app',
            'applink',
            'subtitle',
            'userid',
            'userinfo',
        ]
    }
})
