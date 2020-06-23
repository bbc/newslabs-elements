customElements.define(
    'bbc-newslabs-header',
    class extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML=`
<style>
@import "https://bbc.github.io/newslabs-elements/core.css";
:host(bbc-newslabs-header) {
    position: fixed;
    width: 100px;
}
header{
    border-bottom: 1px solid silver;
    height: 40px;
    overflow: hidden;
    font-size: 20px;
    font-family: "Reith Sans";
    background: white;
    color: #404040;
    position: relative;
}
header div{
    display: table-cell;
    line-height: 40px;
}
div{
    white-space: nowrap;
}
div.blocks{
    width: 94px;
    border-right: 1px solid silver;
}
div.blocks svg{
    width: 105px;
    height: 20px;
    margin-top: 10px;
}
#app{
    vertical-align: top;
    border-right: 1px solid silver;
    padding: 2px 14px;
    font-weight: bold;
}
#app:empty{
    display: none;
}
header[applink] #app:hover{
    background: var(--nl-red);
    cursor: pointer;
    color: white;
}
#subtitle{
    font-weight: 100;
    vertical-align: top;
    padding: 3px 14px;
    font-size: 18px;
}
#userinfo{
    font-size: 15px;
    font-weight: 100;
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 3px 14px;
    border-left: 1px solid silver;
    background: white;
    display: none;
}
#userinfo svg{
    width: 20px;
    padding-top: 2px;
    vertical-align: top;
    padding-right: 12px;
}
@media screen and (max-width: 490px) {
    #userid{
        display: none !important;
    }
    #userinfo svg{
        padding-right: 0px;
    }
}
</style>
<header>
<div class=blocks>
<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1000px"
	 height="285.013px" viewBox="-400 -67.353 1000 285.013" enable-background="new -400 -67.353 1000 285.013" xml:space="preserve">
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
</svg></div>
<div id="app"></div>
<div id="subtitle"></div>
<div id="userinfo">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" xml:space="preserve">
    <circle cx="16" cy="16" r="6.1"></circle><path d="M16 0a16 16 0 0 0 0 32 16.1 16.1 0 0 0 8.6-2.7L22.1 24H9.9l-1.6 3.5A13.8 13.8 0 0 1 2 15.9a14 14 0 1 1 23.9 10l.9 1.9A16 16 0 0 0 16 0z"></path>
</svg><span id="userid"></span>
</div>
</header>
`
        window.bbc=window.bbc||{}
        bbc.onReith=function(onReithCB, offReithCB)
        {
            if (typeof(onReithCB)!=='function') {
                console.log('Usage: bbc.onReith(fn1, [fn2]) where fn1=onReithCallback, fn2=offReithCallback')
                return
            }
            let xhr=new XMLHttpRequest()
            let check='https://insight.newslabs.co/onReith/'
            xhr.timeout=5000
            xhr.open('HEAD', check, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState===4) {
                    if (xhr.status !==200) {
                        console.log('bbc.onReith: false')
                        if (typeof(offReithCB)==='function') {
                            offReithCB()
                        }
                    }
                    if (xhr.status===200) {
                        console.log('bbc.onReith: true')
                        onReithCB()
                    }
                }
            }
            xhr.send()
        }

        if (window.location.protocol=='https:') {
            fetch('/whoami/')
            .then(this.fetchError)
            .then(resp=>resp.json())
            .then(user=>{
                this.userid=user.userid
                this.userinfo=user.displayname + '\n' + user.department + '\n' + user.mail
                window.bbc.userinfo=user
                fetch('/generic-apis/whois/'+user.email)
                .then(this.fetchError)
                .then(resp=>resp.json())
                .then(json=>{
                    window.bbc.userinfo.org=window.bbc.userinfo.org||{}
                    this.userid=json.retval.userid
                    this.userinfo=json.retval.displayname + '\n' + json.retval.department + '\n' + json.retval.mail
                    if (json.retval.directorate) window.bbc.userinfo.org.directorate=json.retval.directorate
                    if (json.retval.building) window.bbc.userinfo.org.building=json.retval.building
                    if (json.retval.room) window.bbc.userinfo.org.room=json.retval.room
                    if (json.retval.groups) window.bbc.userinfo.groups=json.retval.groups
                    if (json.retval.title) window.bbc.userinfo.title=json.retval.title
                })
            })
            .catch(err=>{})
        }
    }

    fetchError(resp) {
        if (!resp.ok) {
            throw Error(resp.statusText)
        }
        return resp
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        if (oldvalue!=newvalue) {
            if (name=='applink') {
                const app=this.shadowRoot.querySelector('#app')
                app.setAttribute('title', 'Open ' + newvalue)
                app.addEventListener('click', evt=>{
                    window.location.href=newvalue
                })
                this.shadowRoot.querySelector('header').setAttribute(name, name)
            } else {
                const node=this.shadowRoot.getElementById(name)
                if (name!='userinfo' && typeof(node)!=="undefined") node.innerHTML=newvalue
            }
            if (name=='userid') {
                this.shadowRoot.getElementById('userinfo').style.display='inline-block'
            }
            if (name=='userinfo') {
                this.shadowRoot.getElementById('userinfo').setAttribute('title', newvalue)
            }
        }
    }

    get app() { return this.getAttribute('app') }
    set app(v) { this.setAttribute('app', v) }

    get applink() { return this.getAttribute('applink') }
    set applink(v) { this.setAttribute('applink', v) }

    get userid() { return this.getAttribute('userid') }
    set userid(v) { this.setAttribute('userid', v) }

    get userinfo() { return this.getAttribute('userinfo') }
    set userinfo(v) { this.setAttribute('userinfo', v) }

    get subtitle() { return this.getAttribute('subtitle') }
    set subtitle(v) { this.setAttribute('subtitle', v) }

    static get observedAttributes() { return [
        'app',
        'applink',
        'subtitle',
        'userid',
        'userinfo',
    ]}
})
