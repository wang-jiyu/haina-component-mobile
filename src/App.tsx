import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'
import './App.css'


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          {renderRoutes(routes)}
        </Router>
      </div>
    )
  }
}
