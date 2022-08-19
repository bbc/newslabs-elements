(function () {

  const loadComponent = (component) => {
    const n = document.querySelector('head script[src*="newslabs-elements/autoload.js"]')
    const s = document.createElement('script')
    s.src = `https://bbc.github.io/newslabs-elements/${component}.js`
    s.setAttribute('component', component)
    if (n.src.indexOf('debug') > -1) {
      s.setAttribute('debug', true)
      console.log(`loadComponent: ${s.src}`)
    }
    n.after(s)
  }
  
  loadComponent('bbc-newslabs-header')
  loadComponent('bbc-newslabs-footer')

})()
