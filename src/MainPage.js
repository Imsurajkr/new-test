import React from 'react';
import './MainPage.css' 
import { toast } from 'react-toastify';


class MainPage extends React.Component{


    constructor(props){
      super(props);
      const token = localStorage.getItem('token');
      const loginData = localStorage.getItem('loginData')
      
      if(token ===null || loginData === null){
        toast.warn("Unauthorized Access Denied")

          props.history.push("/")
      }
    
      
    }

    changeChannel = (content) => {
        document.getElementById('screen').src=content;
        
    }

    logout = () => {
      
      if(window.confirm("You will be logged out")){
      localStorage.removeItem('token');
      
      toast.success("Logged Out Successfully")
      this.props.history.push("/")
    }
    }
    

    

    
    render(){
      
      return(
          <div>
  <div className="television">
            

  <div className="television__top">
    <div className="television__antenna television__antenna--left"></div>
    <div className="television__antenna television__antenna--right"></div>
    <div className="television__antenna__base"></div>
  </div>
  <div className="television__center">
    <div className="television__screen">
      <iframe id="screen" src="https://www.youtube.com/embed/cmX0_an5U5E?autoplay=1&info=0&controls=0" frameBorder="0" allowFullScreen allow="autoplay"></iframe>
    </div>
    <div className="television__channels-wrapper">
      <ul className="television__channels">
          
        <li className="television__channel"><a title="Cricket" onClick={()=>this.changeChannel("https://www.youtube.com/embed/AFEZzf9_EHk?autoplay=1&info=0&controls=0")} ></a></li>
        <li className="television__channel"><a onClick={()=>this.changeChannel("https://www.youtube.com/embed/DGzBufpSO1w?autoplay=1&info=0&controls=0")} title="Movie"></a></li>
        <li className="television__channel"><a onClick={()=>this.changeChannel("https://www.youtube.com/embed/8jF5RmI2YNU?autoplay=1&info=0&controls=0")} title="Song"></a></li>
        <li className="television__channel"><a onClick={()=>this.changeChannel("https://www.youtube.com/embed/gS4FmPRcLxs?autoplay=1&info=0&controls=0")} title="Devotional"></a></li>
        <li className="television__channel"><a onClick={()=>this.changeChannel("https://www.youtube.com/embed/cye_wdFVDOM?autoplay=1&info=0&controls=0")} title="News"></a></li>
        <li className="television__channel"><a onClick={()=>this.changeChannel("https://www.youtube.com/embed/SbiCsAcdQ9E?autoplay=1&info=0&controls=0")} title="Cartoon"></a></li>
        
      </ul>
     <img src= {require("./power_off.png")} title="Logout" onClick={this.logout} />
    </div>
  </div>
  <div className="television__base">
    <div className="television__foot television__foot--left"></div>
    <div className="television__foot television__foot--right"></div>
  </div>
</div>
</div>

        )
      
    }

}
export default MainPage
