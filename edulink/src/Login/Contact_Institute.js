import React,{useState} from 'react'
import addmorebtn from '../assets/addmore_btn.png';
import "react-datepicker/dist/react-datepicker.css";

export default function Contact_Institute({onNext}) {

  const [Email, setEmail] = useState("");
  const [Helpline, setHelpline] = useState("");
  const [OfficialWebsite, setOfficialWebsite] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Linkedin, setLinkedin] = useState("");
 

  const addMoreInformation = (e)=>{

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(Institute.length);

    // if(Institute){

      document.getElementById("Email").textContent = "Provide email for students to contact:";
      document.getElementById("Helpline").textContent = "Helpline Number (if any):";
      document.getElementById("OfficialWebsite").textContent = "Official Website (if any):";
      document.getElementById("Facebook").textContent = "Facebook:";
      document.getElementById("Instagram").textContent = "Instagram:";
      document.getElementById("Linkedin").textContent = "Linkedin:";


      if(Email.length <= 0  ){
        var inst = document.getElementById("Email");
        inst.style.color = 'red';
        inst.textContent = 'Please write Email correctly';
        return;
        
      }
    //   else if(Helpline.length <= 10){
    //     var inst = document.getElementById("Helpline");
    //     inst.style.color = 'red';
    //     inst.textContent = 'Please write Helpline Number correctly';
    //     return;

    //   }
    //   else if(OfficialWebsite.length <= 10){
    //     var inst = document.getElementById("OfficialWebsite");
    //     inst.style.color = 'red';
    //     inst.textContent = 'Please write Official Website Number correctly';
    //     return;

    //   }

    else{
    onNext({ Email, Helpline, OfficialWebsite,Facebook,Instagram,Linkedin });

    }

  };
  return (
   <div className='sign'>
      <div><h1> Sign Up</h1><br></br></div>

    
      <div className='information'>
      <div><h2> Contact information</h2><br></br></div>
      <form onSubmit={handleSubmit}>

      <label id="Email" htmlFor="Email">Provide email for students to contact:</label>
      <input id="Email" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} /> 

     <div className='addmorediv_emails' >
     <button className="addmorebtn" ><img className='addmorebtnimg' src={addmorebtn}></img></button>
     <label className="AddmoreText">Want to add more emails</label>
     </div>
       

      <label id="Helpline" htmlFor="Helpline">Helpline Number (if any):</label>
      <input id="Helpline" type="text" value={Helpline} onChange={(e) => setHelpline(e.target.value)} /> 
      <br />

      <label id="OfficialWebsite" htmlFor="OfficialWebsite">Official Website (if any):</label>
      <input id="OfficialWebsite" type="text" value={OfficialWebsite} onChange={(e) => setOfficialWebsite(e.target.value)} />
      <br />


      <div><br/><br/><h2> Social Media Accounts</h2><br/></div>

      <label id="Facebook" htmlFor="Facebook">Facebook:</label>
      <input id="Facebook" type="text" value={Facebook} onChange={(e) => setFacebook(e.target.value)} />
       

      <label id="Instagram" htmlFor="Instagram">Instagram:</label>
      <input id="Instagram" type="text" value={Instagram} onChange={(e) => setInstagram(e.target.value)} /> 
      <br />

      <label id="Linkedin" htmlFor="Linkedin">Linkedin:</label>
      <input id="Linkedin" type="text" value={Linkedin} onChange={(e) => setLinkedin(e.target.value)} />
      <br />

      

      
      

      <button type="submit" className='next'>Next</button>
      </form>
      </div>
    




    </div>
  )
}

