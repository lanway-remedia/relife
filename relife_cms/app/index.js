/**
 * @author Nam NH
 * Bootstrap file of react app
 */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import createStore from './redux'
import Root from './containers/Root'

var moment = require('moment')
import 'moment/locale/ja'
moment.locale('ja-JP')

const store = createStore()

render(<Root store={store} />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const newStore = createStore()
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={newStore} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
