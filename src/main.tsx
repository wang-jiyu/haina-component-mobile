import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import AppContainer from 'react-hot-loader'

export class Root {
  public constructor() {
      this.init();
  }

  private init() {
      ReactDOM.render(
          <AppContainer>
              <App/>
          </AppContainer>,
          document.getElementById('example')
      );
  }

}


new Root();

// if (module.hot) {
//   module.hot.accept('./App', () => render(App))
// }