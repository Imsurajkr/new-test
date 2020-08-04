import React from 'react';
import './SignUp.scss';

import {  toast } from 'react-toastify';



function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) { //Use timestamp until depleted
      r = (d + r) % 16 || 0;
      d = Math.floor(d / 16);
    } else { //Use microseconds since page-load if supported
      r = (d2 + r) % 16 || 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r && 0x3 || 0x8)).toString(16);
  });
}

class SignUp extends React.Component {

    

    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email : '',
            password : '',
            showingForm: 'login' 
        }
        
        
    }

    submitHandler = (event) => {
        
      event.preventDefault();
        if(this.state.email.match(/[^@]+@[^\.]+\..+/)===null){
          return toast.error("Enter a valid email")
        }
        if(localStorage.getItem('loginData')===null){
        localStorage.setItem('loginData',JSON.stringify(this.state));
        }
        else{
            localStorage.removeItem('loginData');
            localStorage.setItem('loginData',JSON.stringify(this.state));

        }
        toast.success("Signed Up Successfully")
        this.setState({
          first_name: '',
          last_name: '',
          email : '',
          password : '',
          showingForm: 'login' 
      })
        
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam] : val});
    }

   
    

    loginHandler = (event) => {
      event.preventDefault();
      
      if(this.state.email.match(/[^@]+@[^\.]+\..+/)===null){
        return toast.error("Enter a valid email")
      }
      if(localStorage.getItem('loginData')===null){
        toast.info("Please Create An Account to Login")
        this.setState({showingForm:'signup',password:''}); 
      }
      else{
      var userdata = JSON.parse(localStorage.getItem('loginData'));
      
      const { email, password }= this.state;
      if(email=== userdata.email && password===userdata.password){

        if(localStorage.getItem('token')!==null){
          localStorage.removeItem('token');
        }
      var token= generateUUID();
      localStorage.setItem('token',token);
      
      
      toast.success("Logged In Successfully")
      toast("Happy Watching")
      this.props.history.push("/freetv");

      }
      else{
        toast.error("Invalid Credentials")
      }
    }
    }

    

    signupForm=()=>{
      return(
        <div id="signup">   
        <form onSubmit={this.submitHandler}>
                <h1>Sign Up for Free!!</h1>
                
                
                <div className="top-row">
                  <div className="field-wrap">
                    
                    <input type="text" placeholder="First Name*" value={this.state.first_name} onChange={this.changeHandler} name="first_name"  required autoComplete="off"  />
                  </div>
              
                  <div className="field-wrap">
                    
                    <input type="text" placeholder="Last Name*" value={this.state.last_name} onChange={this.changeHandler} name="last_name"  required autoComplete="off"  />
                  </div>
                </div>
      
                <div className="field-wrap">
                  
                  <input type="email" placeholder="Email*" name="email" value={this.state.email} onChange={this.changeHandler}  required autoComplete="off"  />
                </div>
                
                <div className="field-wrap">
                  <input type="password" placeholder="Password*" value={this.state.password} onChange={this.changeHandler}  name="password" required autoComplete="off"  />
                </div>
                
                <button type="submit"  className="button button-block" > Get Started </button>
                
      </form>
              </div>
        )
    }
    

    loginForm=()=>{
      return(
        <div id="login" onSubmit={this.loginHandler}>   
        <form >
                <h1>Welcome</h1>
                
                
                  <div className="field-wrap">
      
                  <input type="email" id="emailId" placeholder="Email*" name="email" value={this.state.email} onChange={this.changeHandler} required autoComplete="off"/>
                </div>
                
                <div className="field-wrap">
                  <input type="password" id="pass" placeholder="Password*" name="password" value={this.state.password} onChange={this.changeHandler} required autoComplete="off"/>
                </div>
                
                
                <button type="submit" className="button button-block"  >Log In</button>
                
                </form>
              </div>
        )
      
    }

    componentDidMount(){
      if(localStorage.getItem('token')!==null){
        toast.success("Welcome Back")
        toast("Enjoy Watching!!")
        this.props.history.push("/freetv")
        
      }
      

    }


    showSignUpForm=()=>{
      if(localStorage.getItem('loginData')!==null){
        toast.warn("You already have an account")
      }
      else{
          this.setState({
            showingForm:'signup'
          })
      }
    }
     
    render(){
        
      
      
        return (
            <div className="form">
      
      <ul className="tab-group">
        <li className={`tab ${this.state.showingForm === 'login' ? 'active' : null}`} id="log"><a  onClick={ () => this.setState({showingForm: 'login'})} >Log In</a></li>
        <li className={`tab ${this.state.showingForm === 'signup' ? 'active' : null}`} id="sign" ><a id="signlink" onClick={this.showSignUpForm} >Sign Up</a></li>

      </ul>
      
      <div className="">
        { this.state.showingForm === 'signup' ? this.signupForm() : this.loginForm()} 
      </div>
      
    </div>
      
);
        }
    }


export default SignUp