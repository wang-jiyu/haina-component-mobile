import Home from '../views/home'
import ScrollCall from '../views/scrollcall/ScrollCall'
export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/scrollcall',
    component: ScrollCall,
    exact: true
  }

]
