import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route path="*" component={NotFound} />
    <Redirect to="/bad-path" component={NotFound} />
  </Switch>
)

export default App
