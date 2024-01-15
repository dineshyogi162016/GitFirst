import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SecondForm = ({settabno, setdata , data, error, seterror, action, setaction}) => {

  const [logindata, setlogindata] = useState({})
   const navigate = useNavigate();

   const handlechange = (e)=>{
      setdata({...data, [e.target.name]: e.target.value});
   }

   const handlesubmit = async()=>{
    console.log("data", data)
    if(action === "Submit"){
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        settabno(3)
        setdata({firstName:"",lastName:"",phoneNo:"",age:"",state:"",city:"",gender:"",hobbies:""})
        
      } catch (error) {
        console.log("Error:", error)
      }
    }else if(action === "Update"){
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}profile/${data._id}`,{
          method: "PUT",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        settabno(3)
        setdata({firstName:"",lastName:"",phoneNo:"",age:"",state:"",city:"",gender:"",hobbies:""})
        setaction("Submit")

      } catch (error) {
        console.log("Error:", error)
      }

    }


      // if(varify()){

      //    // let presignupdata = ([...signupdata]);
      //    // let signupdataall = presignupdata.concat(data);
      //    // setsignupdata(signupdataall)

      //    // localStorage.setItem("SignupData", JSON.stringify(signupdataall))
      //    // setdata({name:"",email:"", password:""})
      //    //    navigate("/")
      //    //    alert("SignUp Successfully")
      // }
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
    const logdata = JSON.parse(sessionStorage.getItem("LoginData"))|| {}
    setlogindata(logdata)

    setdata({...data,["user"]:logdata.email})

   },[]);

  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5 rounded-5 shadow text-center">
         <h1 className='text-info'>Step 2</h1><hr />
         <div className="d-flex">
            <label className='w-50 d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>State:</strong>
               <input type="text" placeholder='Your state...' className='form-control w-75 ' name='state' onChange={handlechange} value={data.state}/>
            </label>
            <label className='w-50 d-flex justify-content-between align-items-center mt-4 ml-3 text-info'><strong>City:</strong>
               <input type="text" placeholder='Your city...' className='form-control w-75 ' name='city' onChange={handlechange} value={data.city}/>
            </label>
         </div>
         {/* {error.name && <p className='text-danger' >{error.name}</p>} */}
         <div className="d-flex">
            <label className='w-50 d-flex justify-content-start align-items-center mt-4 mr-3 text-info'><strong>Gender:</strong>
              <input type="radio" className='ml-5 mr-0 form-control' name='gender' value={"male"} onChange={handlechange} style={{fontSize:"10px"}} /> Male
              <input type="radio" className='ml-5 mr-0  form-control' name='gender' value={"female"} onChange={handlechange} style={{fontSize:"10px"}} /> Female
            </label>
            <label className='w-50 d-flex justify-content-between align-items-center ml-3 mt-4 text-info'><strong>Hobbies:</strong>
               <input type="text" placeholder='Hobbies...' className='form-control w-75 ' name='hobbies' onChange={handlechange} value={data.hobbies}/>
            </label>
         </div>
         {/* {error.email && <p className='text-danger' >{error.email}</p>} */}
         
         <button className='btn btn-outline-info w-25 mt-4' onClick={handlesubmit}>{action}</button>
      </div>
    </>
  )
}

export default SecondForm
