import VueSwappableCard from './components/VueSwappableCard'

const install = (Vue) => {
  Vue.component('vue-swappable-card', VueSwappableCard)
}

export default install
export {
  VueSwappableCard,
}

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
