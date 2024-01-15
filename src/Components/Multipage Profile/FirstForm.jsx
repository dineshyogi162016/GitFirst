import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const FirstForm = ({settabno, setdata , data, error, seterror}) => {

   const navigate = useNavigate();

   const handlechange = (e)=>{
      setdata({...data, [e.target.name]: e.target.value});
   }

   const handlesubmit = ()=>{
      if(varify()){

         // let presignupdata = ([...signupdata]);
         // let signupdataall = presignupdata.concat(data);
         // setsignupdata(signupdataall)

         // localStorage.setItem("SignupData", JSON.stringify(signupdataall))
         // setdata({name:"",email:"", password:""})
         //    navigate("/")
         //    alert("SignUp Successfully")
      }
   }

   const varify = ()=>{
      let valid = true;
      const localerror= {};
      
      if(data && data.name.length === 0){
         localerror.name = "Name is required!";
         valid = false;
      }else if(data && data.name.length < 4){
         localerror.name= "Name must be 4 characters.";
         valid= false;
      }

      if(data && data.email.length === 0){
         localerror.email = "email is required!";
         valid = false;
      }

      if(data && data.password.length === 0){
         localerror.password = "password is required!";
         valid = false;
      }else if(data && data.password.length < 6){
         localerror.password= "password must be 6 characters.";
         valid= false;
      }

      seterror(localerror);
      return valid;
   }

   useEffect(()=> {
      
   },[]);

  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5  shadow text-center">
         <h1 className='text-info'>Step 1</h1><hr />
         <div className="d-flex">
            <label className='w-50 d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>First Name:</strong>
               <input type="text" placeholder='First name...' className='form-control w-75 ' name='firstName' onChange={handlechange} value={data.firstName}/>
            </label>
            <label className='w-50 d-flex justify-content-between align-items-center mt-4 ml-3 text-info'><strong>Last Name:</strong>
               <input type="text" placeholder='Last name...' className='form-control w-75 ' name='lastName' onChange={handlechange} value={data.lastName}/>
            </label>
         </div>
         {/* {error.name && <p className='text-danger' >{error.name}</p>} */}
         <div className="d-flex">
            <label className='w-50 d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>Age:</strong>
               <input type="number" placeholder='Age...' className='form-control w-75 ' name='age' onChange={handlechange} value={data.age}/>
            </label>
            <label className='w-50 d-flex justify-content-between align-items-center ml-3 mt-4 text-info'><strong>phoneNo:</strong>
               <input type="number" placeholder='Phone number...' className='form-control w-75 ' name='phoneNo' onChange={handlechange} value={data.phoneNo}/>
            </label>
         </div>
         {/* {error.email && <p className='text-danger' >{error.email}</p>} */}
         
         <button className='btn btn-outline-info w-25 mt-4' onClick={()=>settabno(2)}>Next</button>
      </div>
    </>
  )
}

export default FirstForm
