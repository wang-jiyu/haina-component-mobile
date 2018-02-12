import Imported from 'react-imported-component'
const Home = Imported(() => import('../views/home'))
const ScrollCall = Imported(() => import('../views/scrollcall/ScrollCall'))
import ScrollExample from '../views/ScrollExample'
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
  },
  {
    path: '/bubble',
    component: ScrollExample,
    exact: true
  }

]
