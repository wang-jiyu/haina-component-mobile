import Imported from 'react-imported-component'

const ClassDetail = Imported(() => import('views/ClassDetail'))
const ClassList = Imported(() => import('views/ClassList'))
const Clinic = Imported(() => import('views/Clinic'))
const ClinicRestult = Imported(() => import('views/ClinicRestult'))
const StockMarket = Imported(() => import('views/StockMarket'))
const RedClassList = Imported(() => import('views/RedClassList'))
export default [
  {
    path: '/',
    component: ClassList,
    exact: true
  }

]
