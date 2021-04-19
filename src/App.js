import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Dashboard from './containers/dashboard'
import NewForm from './components/newForm'
import ListForms from './components/listForms'

import './App.css'

const App = props => {

    const routes = (
        <Switch>
            <Route path='/listForms' exact component={ListForms} />
            <Route path='/:formId' exact component={NewForm} />
            <Route path='/' exact component={Dashboard} />
            <Redirect to='/' />
        </Switch>
    )
    return <Router>{routes}</Router>
}

export default App
