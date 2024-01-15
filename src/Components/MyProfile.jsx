import React, { useEffect, useState } from 'react'
import Parent from './Multipage Profile/Parent'
import { Link } from 'react-router-dom';

const MyProfile = () => {
   const [profileform, setprofileform] = useState(false);
   const [myProfile, setmyProfile] = useState({})
   const [checkloginn, setcheckloginn] = useState(0);

   const getprofiledata = async () => {
      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}profile`);
         const result = await response.json();

         const logdata = JSON.parse(sessionStorage.getItem("LoginData")) || {}

         let myprofiledata = result.find(e => e.user === logdata.email);
         setmyProfile(myprofiledata)

      } catch (error) {
         console.log("Get Profile Data Error", error);
      }
   }

   useEffect(() => {
      getprofiledata()

      const logdata = JSON.parse(sessionStorage.getItem("LoginData")) || {}
      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

   }, [])
   return (
      <>
         {checkloginn > 0 && <div className=" text-center my-2 px-4 py-4 ">
            <button className='btn btn-outline-success' onClick={() => profileform === false ? setprofileform(true) : setprofileform(false)}>{profileform === false ? "Create Profile" : "My Profile"}</button>
            <hr />
            {
               !profileform && <div className="w-50 mx-auto shadow border p-4">
                  {
                     <div className="">
                        <h1>ProFile Data</h1><hr />
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Name: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.firstName + " " + myProfile.lastName}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Email: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.user}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Age: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.age}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Gender: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.gender}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Phone No.: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.phoneNo}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Hobbies: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.hobbies}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>State: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.state}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>City: <span className='text-primary mx-5' style={{ fontWeight: "350" }} >{myProfile.city}</span></h5>
                     </div>
                  }
                  {/* {
                  Profiledata.map((e,i)=>{
                     return(
                        <div key={i} className=' border m-3 d-flex flex-wrap'>
                           <h1>{e.firstName}</h1>
                           <h1>{e.lastName}</h1>
                           <h1>{e.age}</h1>
                           <h1>{e.gender}</h1>
                           <h1>{e.phoneNo}</h1>
                           <h1>{e.state}</h1>
                           <h1>{e.city}</h1>
                        </div>
                     )
                  })
               } */}
               </div>
            }
            {profileform && <Parent />}
         </div>}
         {checkloginn <= 0 &&
            <div className='border shadow p-5 w-50 mx-auto my-5'>
               <h1><Link to={"/"}>LogIn</Link> Required for access</h1>
            </div>
         }
      </>
   )
}

export default MyProfile
