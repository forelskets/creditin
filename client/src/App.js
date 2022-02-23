import { Switch, Route } from 'react-router-dom';
import toastr from 'toastr'
import './assets/styles/toastr.min.css'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import FrontMain from './frontPage/frontMain';

import ApplyLoan from './user/ApplyLoan';
import AdminMain from './admin/AdminMain';
import AdminLogin from './admin/AdminLogin';

import UserMain from './user/UserMain';
import AdminServices from './admin/AdminServices';
import AdminApplication from './admin/AdminApplication';
import AdminDashBoard from './admin/AdminDashBoard';
import AdminBank from './admin/AdminBank';
import AdminOffer from './admin/AdminOffer';

toastr.options = {
  "positionClass": "toast-top-center",
}
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-up"  component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route path="/" exact component={FrontMain} />
        <Route path="/applyloan" component={ApplyLoan} />
        <Route path="/nav" component={UserMain} />
        <Route path="/admin" component={AdminMain} />
        <Route path="/adminLogin" component={AdminLogin} />
        <Route path="/adminOffer" component={AdminOffer} />
        <Route path="/adminServices" component={AdminServices} />
        <Route path="/bank" component={AdminBank} />
        <Route path="/adminDashboard" component={AdminDashBoard} />
        <Route path="/adminApplication" component={AdminApplication} />
        <Route path="/adminBank" component={AdminBank} />
      </Switch>
    </div>
  );
}

export default App;
