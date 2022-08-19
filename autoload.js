
window.BBC = window.BBC || {}
window.BBC.NE = window.BBC.NE || {}

BBC.NE.loadComponent = (component) => {
  const s = document.createElement('script')
  s.src = `https://bbc.github.io/newslabs-elements/${component}.js`
  const n = document.querySelector('head script[src*="newslabs-elements/autoload.js"]')
  n.after(s)
}

BBC.NE.loadComponent('bbc-newslabs-header')
BBC.NE.loadComponent('bbc-newslabs-footer')
