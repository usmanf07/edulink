import React,{useState} from 'react'
import {DegreesList_QuickSearch} from './DegreesList'

export default function ProgramOffered({onNext}) {

    const [Degree, setDegree] = useState("");
    const [QuickSearches_Degree, setQuickSearches_Degree] = useState(DegreesList_QuickSearch);

    const [selectedDegrees, setselectedDegrees] = useState([]);
    const [newId,setNewId] = useState(0);

    const handleSelect = (degree) => {
        setNewId(newId+1);
        setQuickSearches_Degree(QuickSearches_Degree.filter((d) => d.name !== degree.name));
        const newDegreeOption = { id: newId, name: degree.name };
        setselectedDegrees([...selectedDegrees, newDegreeOption]);
       
      };
    
      const handleDeselect = (degree) => {
        setselectedDegrees(selectedDegrees.filter((d) => d.id !== degree.id));
        setQuickSearches_Degree([...QuickSearches_Degree, degree]);
      };

    const addMoreInformation = (e)=>{

    }
    const SelectedDegreeList = selectedDegrees.map((item) => (
        <li className='DegreeList_li' onClick={() => handleDeselect(item)}><h2>{item.name}</h2></li>
        
    ));

    const DegreeList = QuickSearches_Degree.map( (item) => (
        <li className='DegreeList_li' onClick={() => handleSelect(item) }><h2>{item.name}</h2></li>
    ));

    const handleAdd = () => {

        alert(Degree)
        setNewId(newId+1);
        const newDegreeOption = { id: newId, name: Degree };
        setselectedDegrees([...selectedDegrees, newDegreeOption]);
        console.log(selectedDegrees);
       
        setDegree("");
      };

    const handleSubmit = (e) => {
        e.preventDefault();
    

    };
    return (
    <div className='sign'>
        <div><h1> Sign Up</h1><br></br></div>

        
        <div className='information'>
        <div><h2> Programs Offered</h2><br></br></div>
        <form onSubmit={handleSubmit}>

        <label id="Degree" htmlFor="Degree">Select at max 10 Degrees:</label>
        <input type="text" value={Degree} onChange={(e) => setDegree(e.target.value)} 
        onKeyPress={(e) => {
        if (e.key === "Enter") {
        handleAdd();
        }}} /> 
        <br />

        <div>
        <label id="QuickSearch" >Quick Searches:</label>
        <ul className='DegreeList_Ul'>{DegreeList}  </ul>
        </div>
        <br/>

        <div>
        <label id="QuickSearch">Selected Degrees:</label>
        <ul className='DegreeList_Ul'>{SelectedDegreeList}  </ul>
        </div>

        
        
        <br />



        
        

        <button type="submit" className='next'>Next</button>
        </form>
        </div>
        




        </div>
    )
}

