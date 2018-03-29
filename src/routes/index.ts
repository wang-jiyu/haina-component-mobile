import Imported from 'react-imported-component'
const Home = Imported(() => import('../views/home'))
const ScrollCall = Imported(() => import('../views/scrollcall/ScrollCall'))
import ScrollExample from '../views/ScrollExample'
import Navbar from '../views/navbar'
import ToastExample from '../views/toastExample'
import DialogExample from '../views/dialogExample';
import ModalExample from '../views/modalExample';
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
  },
  {
    path: '/navbar',
    component: Navbar,
    exact: true
  },
  {
    path:'/toast',
    component:ToastExample,
    exact:true
  },
  {
    path:'/dialog',
    component:DialogExample,
    exact:true
  },
  {
    path:'/model',
    component:ModalExample,
    exact:true
  }

]
