import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp'
import MainPage from './MainPage'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



  export class App extends Component{
      render(){
          return(
              <>
              <ToastContainer />
              <Router>
                    <Switch>
                        <Route exact path="/" component={SignUp} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/freetv" component={MainPage} />
                    </Switch>
              </Router>
            </>
          )
      }
  } 

  export default App
