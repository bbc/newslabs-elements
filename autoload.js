
const loadComponent = (component) => {
  const s = document.createElement('script')
  s.src = `https://bbc.github.io/newslabs-elements/${component}.js`
  const n = document.querySelector('head script[src*="newslabs-elements/autoload.js"]')
  n.after(s)
}

loadComponent('bbc-newslabs-header')
loadComponent('bbc-newslabs-footer')
