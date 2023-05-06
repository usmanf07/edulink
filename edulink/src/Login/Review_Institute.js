import React,{useState} from 'react'

export default function Review_Institute({onNext}) {

  const [Review, setReview] = useState("");
  const [Category, setCategory] = useState("");
  const [Reviewer, setReviewer] = useState("");

  const addMoreInformation = (e)=>{

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(Institute.length);

    // if(Institute){

      document.getElementById("Review").textContent = "Review:";
      document.getElementById("Category").textContent = "Select Reviewer Category:";
      document.getElementById("Reviewer").textContent = "Reviewer Complete Name and Domain";


    if(Review.length <= 20 ){
    var inst = document.getElementById("Review");
    inst.style.color = 'red';
    inst.textContent = 'Please provide Review correctly';
    return;
    
    }
    else if(Category.length <= 0){
        var inst = document.getElementById("Category");
        inst.style.color = 'red';
        inst.textContent = 'Please select any Category from below ';
        // return;
    }
    else if(Reviewer.length <= 10){
    var inst = document.getElementById("Reviewer");
    inst.style.color = 'red';
    inst.textContent = 'Please write Reviewer Name and Domain correctly';
    return;

    }
   
    else{
    onNext({ Review, Reviewer,Category});

    }

  };
  return (
   <div className='sign'>
      <div><h1> Sign Up</h1><br></br></div>

    
      <div className='information'>
      <div><h2> Contact information</h2><br></br></div>
      <form onSubmit={handleSubmit}>

      <label id="Review" htmlFor="Review">Review:</label>
      <input type="text" value={Review} onChange={(e) => setReview(e.target.value)} /> 
      <br />

      <label htmlFor="Category">Select Reviewer Category:</label>
      <select id="Category" value={Category} onChange={(e) => setCategory(e.target.value)}>
       <option value="">--Select Category--</option>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
        <option value="HOD">HOD</option>
      </select>
      <br />
      <br/>


      <label id="Reviewer" htmlFor="Reviewer">Reviewer Complete Name and Domain:</label>
      <input  type="text" value={Reviewer} onChange={(e) => setReviewer(e.target.value)} /> 
      <br />

    
      <br />



      
      

      <button type="submit" className='next'>Next</button>
      </form>
      </div>
    




    </div>
  )
}

