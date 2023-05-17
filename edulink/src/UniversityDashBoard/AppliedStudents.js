import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./AppliedStudents.css";
import ExcelDownloadButton from './ExcelDownloadButton';

function AppliedStudents(props){
    const [programs,setprograms] = useState([]);
    const [appliedDate,setappliedDate] = useState([]);
    const [appliedFor,setappliedFor] = useState([]);
    const [studentEmail,setstudentEmail] = useState([]);
    const [applicationStatus, setapplicationStatus] = useState([]);
    const [phone, setPhone] = useState([]);
    const [fullName, setFullName] = useState([]);
    const [address, setAddress] = useState([]);
    const { name } = useParams();
    const [uniID,setuniID] = useState("");

    
   
    const columns = ['Student Email','Phone Number','Full Name','Address','Applied Date', 'Applied For Program', 'Application Status'];
    const filename = 'data';
    


    useEffect(() => {
       
        var tempAppliedDate = [];
        var tempAppliedFor = [];
        var tempStudentEmail = [];
        var tempapplicationStatus = [];
        var tempPhone = [];
        var tempFullName = [];
        var tempAddress = [];


        axios.get(`http://localhost:8000/university/getUniId/${name}`)
        .then((response) => {
            setuniID(response.data);

            if(response.data){
                axios.get(`http://localhost:8000/application/FetchStudents/${response.data}`)
                .then((res1) => {
                    res1.data.forEach((domain) => (
                   
                    tempAppliedDate.push(domain.appliedDate),
                    tempAppliedFor.push(domain.appliedFor),
                    tempStudentEmail.push(domain.studentEmail),
                    tempapplicationStatus.push(domain.applicationStatus)

                    
                    ))

                    setappliedDate(tempAppliedDate);
                    setappliedFor(tempAppliedFor);
                    setstudentEmail(tempStudentEmail);
                    setapplicationStatus(tempapplicationStatus);

                   

                     // Create an array of Axios requests
                    const requests = tempStudentEmail.map((email) => {
                        return axios.get(`http://localhost:8000/users/${email}`);
                    });
                    
                    // Wait for all requests to finish
                    Promise.all(requests)
                        .then((responses) => {
                        responses.forEach((res) => {
                            tempPhone.push(res.data.phone);
                            tempFullName.push(res.data.fullName);
                            tempAddress.push(res.data.address);
                        });
                    
                        // console.log(tempPhone);
                        // console.log(tempFullName);
                        
                        // Set the retrieved data using the provided setPhone, setFullName, and setAddress functions
                        setPhone(tempPhone);
                        setFullName(tempFullName);
                        setAddress(tempAddress);
                        })
                        .catch((error) => console.error('Error in fetching user by email:', error));
    
                      

                })
                .catch((error) => console.error('Failed1:', error));
    
            }
            else{
                console.log("No UniID found");
            }
           
        })
        .catch((error) => console.error('Failed:', error));

        // console.log(phone);

    }, []);

   

    
    const data = appliedDate.map((date, index) => ({
        studentEmail: studentEmail[index],
        phone:phone[index],
        fullName:fullName[index],
        address:address[index],
        appliedDate: date,
        appliedFor: appliedFor[index],
        applicationStatus: applicationStatus[index]
    }));


          const tabledata = studentEmail.map((email, index) => ({
            email: email,
            name: appliedFor[index],
            status: applicationStatus[index]
          }));
  

        const updateStatus=(email,status,index)=>{

            // alert(index);


            axios.post(`http://localhost:8000/application/updateStatus/${email}/${status}/${uniID}`)
            .then((res1) => {
                
                const updatedStatus = [...applicationStatus];
                updatedStatus[index] = status;
                setapplicationStatus(updatedStatus);

            })
            .catch((error) => console.error('Status updation failed:', error));

          
        };


        return (
            <div className='description_Paragraph'>
            {/* <Nav/> */}
            <div className='UniNameAndButton'>
                 <p>{name}</p>
                 <ExcelDownloadButton className="button_bar_btns downloadReport" data={data} columns={columns} filename={filename}/>
            </div>
        
            <table className='appliedStudentsTable'>
            <thead>
                <tr>
                <th>Student Email</th>
                <th>Program Name</th>
                <th>Current Status</th>
                </tr>
            </thead>
            <tbody>
                {tabledata.map((entry, index) => (
                <tr key={index}>
                    <td>{entry.email}</td>
                    <td>{entry.name}</td>
                    <td>{entry.status}</td>
                    <td>
                        <div className='buttons_'>
                        <button className="button_bar_btns accept"  onClick={() => updateStatus(entry.email,"Accepted",index)}>Accept</button>
                        <button className="button_bar_btns reject" onClick={() => updateStatus(entry.email,"Rejected",index)}>Reject</button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table> 
                    
                
       </div>
        )

        

}
export default AppliedStudents;
