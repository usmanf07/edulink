import React,{useState,useEffect} from 'react'
import './Log.css'
import Signin from './Signin'
import Signup1 from './Signup1'
import Signup2 from './Signup2'
import Signup3 from './Signup3'
import Signup4 from './Signup4'
import InstituteLocation from './InstituteLocation'
import EducationInformationForm from './AddMore'
import AdmissionsOpen from './AdmissionsOpen'
import Contact_Institute from './Contact_Institute'
import Review_Institute from './Review_Institute'
import ProgramOffered from './ProgramsOffered'
import { useLocation } from 'react-router-dom'
import UniversitySignUp from './UniversitySignUp'
import UniversitySignIn from './UniversitySignIn'
export default function Log() {


  const location =useLocation();
  const [userData, setUserData] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    // console.log(userData);

  }, [userData]);

  const handleNext = (data) => {


    setUserData({ ...userData, ...data });


    setStep(step + 1);
  };



  return (
    <div className='signin'>
      <div className='outside'>
        <div className='lefte'>
          <div>
          <h1>
          Welcome To Edu Link
          </h1>
          <br></br>
          <p>
          Edu Link is your ultimate academic companion, helping you find the best institutions, connect with potential employers, and achieve your educational goals
          </p>
          </div>
        </div>
        <div className='righte'>


          {/* {step===1 && <Signup1 onNext={handleNext}/>} */}
          {/* {step===2 && <Signup2  onNext={handleNext}/>}
          {step===3 && <Signup3  onNext={handleNext}/>}  */}
          {/* {step===1 && <Signup4  onNext={handleNext}/>}  */}
          {/* {step===1 && <EducationInformationForm onNext={handleNext}/>} */}
          {/* {step === 1 && <Signup1 onNext={handleNext}/>} */}

          {/* {step===1 && <AdmissionsOpen  onNext={handleNext}/>} */}
          {/* {step===1 && <Contact_Institute  onNext={handleNext}/>}  */}
          {/* {step===1 && <Review_Institute  onNext={handleNext}/>}  */}
          {/* {step===1 && <ProgramOffered  onNext={handleNext}/>}  */}


          {location.state.id ==="university" &&

             <UniversitySignUp/>


          }

          {location.state.id ==="universitylogin" &&

          <UniversitySignIn/>


          }
            {/* <Signup4/> */}
        </div>
      </div>

    </div>
  )
}
