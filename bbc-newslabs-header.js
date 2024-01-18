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
      this.addEventListener = function (event, callback) {
        bus.addEventListener(event, callback)
      }
      this.removeEventListener = function (event, callback) {
        bus.removeEventListener(event, callback)
      }
      this.dispatchEvent = function (event, detail = {}) {
        bus.dispatchEvent(new CustomEvent(event, { detail }))
      }
    }
  }

  // Dynamic JS dependency-stack injection - https://stackoverflow.com/a/62969633/7656091
  bbc.addDependentScripts = async function (scriptsToAdd, immediate = false) {
    const s = document.createElement('script')
    for (var i = 0; i < scriptsToAdd.length; i++) {
      let r = await fetch(scriptsToAdd[i])
      s.text += await r.text()
    }
    if (immediate) {
      document.querySelector('head').appendChild(s)
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('body').appendChild(s)
      })
    }
  }

  // Usage: div.textContent = bbc.timeSince(new Date(document.lastModified)); - specific date object
  // or     div.textContent = bbc.timeSince(document.lastModified); - well-formed string that Date can recognise.
  bbc.timeSince = function (value) {
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 0 }
    ];
    let date;
    if (typeof (value) == 'string') {
      date = new Date(value);
    } else {
      date = value; // assume a date object has been passed
    }
    const seconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
    const interval = intervals.find(i => i.seconds < seconds);
    let count = Math.floor(seconds / interval.seconds);
    if (count == Infinity) count = seconds;
    //console.log({seconds, interval, count});
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
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
  // Here, order is important as Bootstrap depends on JQuery
  if (document.querySelector('html').classList.contains('newslabs-bootstrap')) {
    filesToAdd.push('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css')
    filesToAdd.push('https://code.jquery.com/jquery-3.5.1.slim.min.js')
    filesToAdd.push('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js')
  }

  // newslabs analyics

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
  class extends HTMLElement {
    cache = {
      matomo_ready: false,
    };
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
    left: 11px;
    top: 4px;
    width: 72px;
}
#app{
    padding: 0px 12px;
    border-right: 1px solid silver;
    font-weight: bold;
    overflow: hidden;
    display: flex;
    align-items: center;
}
#app:empty{
    display: none;
}
div.outer[test] #app:after{
    content: "TEST";
    border: 2px solid var(--nl-red);
    font-size: 0.65em;
    padding: 0 0.25em;
    margin-left: 0.8em;
    height: 65%;
    display: flex;
    align-items: center;
    line-height: 1em;
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
    _background-color: var(--nl-red);
    border-bottom: 4px solid var(--nl-red);
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
    _color: white;
}
span.buttons{
    position: relative;
}
button{
    background-color: white;
    height: 1.7em;
    display: inline-block;
    line-height: 1.5em;
    font-size: 12pt;
    padding: 0 1ch;
    margin-left: 1em;
    position: relative;
    top: -1px;
}
button[onclick]:hover{
    background-color: whitesmoke;
    cursor: pointer;
}
button[download]::before{
    content: "";
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiAKICAgICB2aWV3Qm94PSIwIDAgMjkuOTc4IDI5Ljk3OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgogICAgPHBhdGggZD0iTTI1LjQ2MiwxOS4xMDV2Ni44NDhINC41MTV2LTYuODQ4SDAuNDg5djguODYxYzAsMS4xMTEsMC45LDIuMDEyLDIuMDE2LDIuMDEyaDI0Ljk2N2MxLjExNSwwLDIuMDE2LTAuOSwyLjAxNi0yLjAxMgogICAgICAgIHYtOC44NjFIMjUuNDYyeiIvPgogICAgPHBhdGggZD0iTTE0LjYyLDE4LjQyNmwtNS43NjQtNi45NjVjMCwwLTAuODc3LTAuODI4LDAuMDc0LTAuODI4czMuMjQ4LDAsMy4yNDgsMHMwLTAuNTU3LDAtMS40MTZjMC0yLjQ0OSwwLTYuOTA2LDAtOC43MjMKICAgICAgICBjMCwwLTAuMTI5LTAuNDk0LDAuNjE1LTAuNDk0YzAuNzUsMCw0LjAzNSwwLDQuNTcyLDBjMC41MzYsMCwwLjUyNCwwLjQxNiwwLjUyNCwwLjQxNmMwLDEuNzYyLDAsNi4zNzMsMCw4Ljc0MgogICAgICAgIGMwLDAuNzY4LDAsMS4yNjYsMCwxLjI2NnMxLjg0MiwwLDIuOTk4LDBjMS4xNTQsMCwwLjI4NSwwLjg2NywwLjI4NSwwLjg2N3MtNC45MDQsNi41MS01LjU4OCw3LjE5MwogICAgICAgIEMxNS4wOTIsMTguOTc5LDE0LjYyLDE4LjQyNiwxNC42MiwxOC40MjZ6Ii8+CjwvZz4KPC9zdmc+Cg==");
    background-size: contain;
    display: inline-block;
    width: 2ch;
    height: 1.5ch;
    background-repeat: no-repeat;
    margin-right: 0.5ch;
    top: 1px;
    position: relative;
}
</style>
<div class=outer>
<div id="blocks" class="inner" title="This is a prototype application from BBC Research & Development">
<svg viewBox="0 0 84 24"xmlns="http://www.w3.org/2000/svg" aria-label="BBC logo" height="32px" width="32px" class="gel-icon gel-icon--legacy_blocks bbc-blocks--image"><path d="M84 0v24H60V0h24ZM54 0v24H30V0h24ZM24 0v24H0V0h24Zm49.102 5.106c-1.08 0-2.055.16-2.925.481a6.294 6.294 0 0 0-2.239 1.388 6.067 6.067 0 0 0-1.43 2.175c-.33.845-.495 1.792-.495 2.84 0 1.074.16 2.04.477 2.897a5.897 5.897 0 0 0 1.372 2.175c.597.592 1.327 1.045 2.191 1.36.864.314 1.836.472 2.916.472.812 0 1.588-.09 2.324-.269a7.832 7.832 0 0 0 1.944-.73v-2.573a7.234 7.234 0 0 1-3.868 1.092c-.915 0-1.693-.173-2.334-.518a3.45 3.45 0 0 1-1.468-1.509c-.336-.66-.505-1.458-.505-2.396s.175-1.734.524-2.388a3.55 3.55 0 0 1 1.506-1.499c.654-.345 1.445-.518 2.372-.518.673 0 1.315.09 1.925.268.61.18 1.175.442 1.696.787V6.013a7.892 7.892 0 0 0-1.858-.675 9.418 9.418 0 0 0-2.125-.232Zm-31.286.144H36.75v13.5h5.379c1.064 0 1.976-.157 2.735-.472.758-.315 1.343-.762 1.753-1.34.41-.58.615-1.272.615-2.078 0-.818-.211-1.513-.634-2.086-.422-.573-1.03-.991-1.826-1.256.575-.276 1.01-.65 1.303-1.123.294-.472.44-1.029.44-1.67 0-1.121-.41-1.98-1.23-2.578-.82-.598-1.976-.897-3.469-.897Zm-30 0H6.75v13.5h5.379c1.064 0 1.976-.157 2.735-.472.758-.315 1.343-.762 1.753-1.34.41-.58.615-1.272.615-2.078 0-.818-.211-1.513-.634-2.086-.422-.573-1.03-.991-1.826-1.256.575-.276 1.01-.65 1.303-1.123.294-.472.44-1.029.44-1.67 0-1.121-.41-1.98-1.23-2.578-.82-.598-1.976-.897-3.469-.897Zm30.092 7.666c1.677 0 2.515.617 2.515 1.85 0 .58-.22 1.023-.66 1.331-.441.309-1.072.463-1.891.463h-2.387v-3.644h2.423Zm-30 0c1.677 0 2.515.617 2.515 1.85 0 .58-.22 1.023-.66 1.331-.441.309-1.072.463-1.891.463H9.485v-3.644h2.423ZM41.56 7.44c1.457 0 2.185.535 2.185 1.605 0 .554-.187.985-.56 1.293-.373.309-.915.463-1.625.463h-2.074v-3.36h2.074Zm-30 0c1.457 0 2.185.535 2.185 1.605 0 .554-.187.985-.56 1.293-.373.309-.915.463-1.625.463H9.485v-3.36h2.074Z"></path></svg>
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
    }

    fetchError(resp) {
      if (!resp.ok) {
        throw Error(resp.statusText)
      }
      return resp
    }

    get parent() {
      return this.getRootNode().host
    }

    fmtUserinfo(user) {
        return `${user?.email}\n${user?.displayname}\n${user?.title}\n${user?.department}`;
    }

    connectedCallback() {

      if (window.location.protocol == 'https:') {
        this._discover_matomo_siteid();
        const portal_host = location.origin.includes('.newslabs.co') ? location.origin : 'https://apps.newslabs.co';
        fetch(`${portal_host}/whoami/`)
          .then(this.fetchError)
          .then(resp => resp.json())
          .then(user => {
            window.bbc.userinfo = user
            this.userid = user.userid
            const _url = `${portal_host}/generic-apis/whois/${user.mail}`;
            fetch(_url)
              .then(this.fetchError)
              .then(resp => resp.json())
              .then(json => {
                // console.info({ generic_whois: json })
                if (json.retval.status == 'failed') {
                  console.log({ whois_failed: json.retval.reason })
                  this.userinfo = this.fmtUserinfo(user)
                  return
                }
                window.bbc.userinfo.org = window.bbc.userinfo.org || {}
                let h = window.document.querySelector('bbc-newslabs-header')
                h.userid = json.retval.userid
                h.userinfo = this.fmtUserinfo(json.retval);

                if (json.retval.directorate) {
                  user.org.directorate = json.retval.directorate
                }

                if (json.retval.division) {
                  user.org.division = json.retval.division
                  user.division = json.retval.division
                }

                if (json.retval.department) {
                  user.department = json.retval.department
                  user.org.department = json.retval.department
                }

                if (json.retval.building) {
                  user.org.building = json.retval.building
                }

                if (json.retval.room) {
                  user.org.room = json.retval.room
                }

                if (json.retval.groups) {
                  user.groups = json.retval.groups
                }

                if (json.retval.title) {
                  user.title = json.retval.title
                }

                if (json.retval.costcentre) {
                  user.org.cost_code = json.retval.costcentre
                }

                if (json.retval.userid) {
                  user.userid = json.retval.userid
                }

                if (json.retval.displayname) {
                  user.displayname = json.retval.displayname
                }
                // this._enable_matomo(); // using the advanced user data returned from /generic-apis/whois (active directory)
              })
              .catch(err => {
                console.error(`A ${_url} error occured`, err);
                this.userinfo = this.fmtUserinfo(user)
                // this._enable_matomo(); // using the basic user data returned from /whois/ (cert|bbc-login)
              })
          })
          .catch(err => {
            console.error(`A ${portal_host}/whoami/ error occured`, err);
          })
      }

      if (this.hasAttribute('help')) {
        this._helpon()
      }
      if (this.hasAttribute('beta')) {
        this.shadowRoot.querySelector('.proto').style.display = 'inline-block'
      }
      if (window?.location?.hostname?.includes('localhost') || window?.location?.hostname?.includes('test')) {
        this.shadowRoot.querySelector('div.outer').setAttribute('test', 'test');
      }
      document.title = `BBC ${this.app}`;
      window.bbc.matomo = document.querySelector('bbc-newslabs-header');
    }

    async getMatomoInfo() {
      let waitCounter = 0;
      while (this.matomo_siteid === null || this.matomo_url === null || this.userinfo === null) {
        waitCounter++;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return {
        uslBase: this.matomo_url,
        siteId: this.matomo_siteid,
        userinfo: this.userinfo.replaceAll("\n", ", "),
        waitCounter,
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
      if (this?.helptext) {
        h.setAttribute('text', this.helptext)
      }
      if (this?.helptitle) {
        h.setAttribute('title', this.helptitle)
      }
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
      // console.log({ attributeChangedCallback: { ...arguments } })
      if (oldvalue != newvalue) {
        if (name == 'applink') {
          const app = this.shadowRoot.querySelector('#app')
          app.setAttribute('title', 'Open ' + newvalue)
          app.addEventListener('click', evt  {
            // support applink="${location.pathname}"
            let href = newvalue
            if (href.includes('${') && href.includes('}')) {
              href = eval("`" + href + "`")
            }
            window.location.href = href
          })
          this.shadowRoot.querySelector('div.outer').setAttribute(name, name)
        } else if (name === 'applinkcolor') {
          this.shadowRoot.querySelector('.outer').style = `--nl-red:${this.applinkcolor}`;
        } else if (name == 'app') {
          this.shadowRoot.getElementById('app').innerHTML = this.app
          document.title = `BBC ${this.app}`;
        } else if (name.slice(0, 4) == 'help') {
          this._helpon()
        } else if (name.includes('matomo_')) {
          this._enable_matomo()
        } else if (name == 'backgroundcolor') {
          this.shadowRoot.querySelector('.outer').style.backgroundColor = newvalue
        } else {
          const node = this.shadowRoot.getElementById(name)
          if (name != 'userinfo' && typeof (node) !== "undefined") node.innerHTML = newvalue
        }
        if (name == 'userid') {
          this.shadowRoot.getElementById('userinfo').style.display = 'inline-block'
        }
        if (name == 'userinfo') {
          this.shadowRoot.getElementById('userinfo').setAttribute('title', newvalue)
          this._enable_matomo()
        }
      }
    }

    get app() {
      let app = this.getAttribute('app')?.trim();
      if (app) return app;
      app = document.querySelector('meta[name=application-name]')?.getAttribute('content')?.trim();
      return app || '';
    }

    set app(v) { this.setAttribute('app', v) }

    get applink() { return this.getAttribute('applink') }
    set applink(v) { this.setAttribute('applink', v) }

    get applinkcolor() { return this.getAttribute('applinkcolor') }
    set applinkcolor(v) { this.setAttribute('applinkcolor', v) }

    get userid() { return this.getAttribute('userid') }
    set userid(v) { this.setAttribute('userid', v) }

    get userinfo() { return this.getAttribute('userinfo') }
    set userinfo(v) { this.setAttribute('userinfo', v) }

    get matomo_siteid() { return this.getAttribute('matomo_siteid') }
    set matomo_siteid(v) { this.setAttribute('matomo_siteid', v) }

    get matomo_env() { return this.getAttribute('matomo_env') }
    set matomo_env(v) { this.setAttribute('matomo_env', v) }

    get matomo_url() { return this.getAttribute('matomo_url') }
    set matomo_url(v) { this.setAttribute('matomo_url', v) }

    get matomo_ready() { return this.cache.matomo_ready || false }

    get backgroundcolor() { return this.getAttribute('backgroundcolor') }
    set backgroundcolor(v) { this.setAttribute('backgroundcolor', v) }

    get subtitle() { return this.getAttribute('subtitle') }
    set subtitle(v) { this.setAttribute('subtitle', v) }

    get help() { return this.getAttribute('help') }
    set help(v) { this.setAttribute('help', v) }

    get helptext() { return this.getAttribute('helptext') }
    set helptext(v) { this.setAttribute('helptext', v) }

    get helptitle() { return this.getAttribute('helptitle') }
    set helptitle(v) { this.setAttribute('helptitle', v) }

    static get observedAttributes() {
      return [
        'app',
        'applink',
        'applinkcolor',
        'subtitle',
        'userid',
        'userinfo',
        'matomo_siteid',
        'matomo_env',
        'matomo_url',
        'backgroundcolor',
      ]
    }

    async _discover_matomo_siteid() {
      // attempt to locate a pre-configured matomo_siteid in the appropriate Matomo env
      if (location.origin.toLowerCase().includes('localhost')) {
        this.matomo_siteid = -1;
        return
      }
      if (!location.origin.includes('.test.')) {
        this.matomo_url = 'https://newslabs-analytics.tools.bbc.co.uk';
        this.matomo_env = 'live';
      } else {
        this.matomo_url = 'https://newslabs-analytics.test.tools.bbc.co.uk';
        this.matomo_env = 'test';
      }
      const req_url = `${this.matomo_url}/matomo.php?newslabs.analytics&locationHref=${encodeURIComponent(location.href)}&documentTitle=${encodeURIComponent(this.app)}`;
      let retval;
      try {
        console.log(`fetch ${req_url}`);
        const req = await fetch(req_url);
        retval = await req.json();
        console.log({
          retval,
          current_siteid: this.matomo_siteid,
          current_userinfo: window?.bbc?.userinfo,
        });
        if (retval?.result?.status == 200) {
          if (this?.matomo_siteid) {
            console.warn(`200: matomo_siteid already configured`);
            if (this?.matomo_siteid != retval?.result?.matomo_siteid) {
              console.error(`matomo_siteids differ: html=${this?.matomo_siteid} api=${retval?.result?.matomo_siteid}. Performing override.`);
              this.matomo_siteid = retval?.result?.matomo_siteid;
            }
          } else {
            console.log(`200: set matomo_siteid=${retval?.result?.matomo_siteid}`);
            this.matomo_siteid = retval?.result?.matomo_siteid;
            // this._enable_matomo();
          }
        } else {
          console.error(`404: ${retval?.result?.error?.reason} this.matomo_siteid=${this?.matomo_siteid}`);
        }
      } catch (error) {
        console.error({ error });
      }
    }

    async _enable_matomo() {
      if (!this?.matomo_siteid) {
        console.log('_enable_matomo: skip - no matomo_siteid');
        return;
      }
      if (this.matomo_siteid == -1) {
        console.log("_enable_matomo: skip - matomo_siteid == -1 / 'localhost' in location.origin");
        return;
      }
      if (!this?.userinfo) {
        console.log('_enable_matomo: skip - no userinfo', this.userinfo);
        return;
      }
      if (document.querySelectorAll("script[src*='matomo.js']").length > 0) {
        const t = window?.Matomo?.getAsyncTracker(0);
        console.warn(`A Matomo tracker already exists or is in the process of construction!\n  ${t?.getTrackerUrl()}\n  ${t?.getUserId()}`);
        return;
      }
      console.log(`Enabling Matomo at ${this.matomo_url} siteId:${this.matomo_siteid} userId:${this.userinfo}`)
      let _paq = window._paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      _paq.push(['setTrackerUrl', this.matomo_url + '/matomo.php']);
      _paq.push(['setSiteId', this.matomo_siteid]);
      _paq.push(['setUserId', this.userinfo.replaceAll('\n', ' / ')]);
      let d = document,
        s = d.createElement('script'),
        s1 = d.getElementsByTagName('script')[0];
      s.type = 'text/javascript';
      s.async = true;
      s.src = this.matomo_url + '/matomo.js';
      s.addEventListener('load', e  {
        this.cache.matomo_ready = true;
      });
      s1.parentNode.insertBefore(s, s1);
    }
  }
)
