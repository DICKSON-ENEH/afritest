"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import {  IMAGES, Icons } from '../../utils/assets'
import Button from '../ReusableComponents/Buttons/Button'
import Input from '../ReusableComponents/Inputs/Input'
import Link from 'next/link'
import { useSignInMutation } from '../../redux/services/auth'
import * as yup from "yup";
import { Form, Formik, FormikValues } from 'formik'
import { toast } from 'react-toastify'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setUserStatus } from '../../redux/slices/userSlice'
import { RootState } from '../../redux/Store/Store'

const Login = () => { 
    const [signIn] = useSignInMutation()
    const [loading, setLoading]= useState(false)
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
const pathname = usePathname()

    const router = useRouter()
    const dispatch = useDispatch()

    const signInSchema= yup.object().shape({

        email:yup.string().email().required("Please enter a valid email"),
        password:yup.string().required("enter your password here")

    })
    const handleSignin = async (values: FormikValues) => {
      try {
        setLoading(true); 
        await signInSchema.validate(values);
        const resultAction:any = await signIn(values).unwrap();
        console.log("data is here", resultAction)
        toast.success(resultAction.data!.message);
        dispatch(setUserStatus({ isLoggedIn: true, user: resultAction.data }));
    
      
        router.push("/");
    
      } catch (error) {
     
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
     
          toast.error("An unknown error occurred.");
        }
    
       
    
        setLoading(false); 
      }
    };


  return (
    <div className='h-[100vh] lg:h-[100%] bg-white w-full flex  items-center  flex-col '>


<div className=' w-full'>
{/* <div className='w-[100%] h-[70px] shadow-sm flex justify-center items-center '>
         
        </div> */}
        <div className='flex justify-center w-full lg:justify-between items-center h-full'>
    
          <div className='w-[45%] hidden lg:flex relative  '>
          <div className=' absolute '>
          <Image width={150} height={150} src={Icons.logo} alt="logo"/>

 
          </div>
            <Image width={700} height={500} src={IMAGES.loginImage} alt="login image" />

          </div>
          <div className=' w-[90%] lg:w-[50%]  h-full   flex justify-center items-center flex-col'>
   
<Formik 
initialValues={{
 email:"",
 password:""
}}
validationSchema={signInSchema}

onSubmit={((values, action)=>{
handleSignin(values)
action.setSubmitting(false)
})}
>
{({ handleChange, handleSubmit, errors, values})=>(
     <Form 
     onSubmit={((e:any)=>{
         e.preventDefault()
         handleSubmit(e)
     })}
     
>

<div className='font-bold text-[30px] mb-[5px]'>
     Login
   </div>
   <div className='text-[#A4A5A9] mb-[20px]'>
     Welcome back! Please enter your details
   </div>
  
  
 
        <div className='mb-[15px] w-full lg:w-[500px]'>
          <div className='text-[14px]  mb-[5px] font-bold'>
            Email Address:
          </div>
          <div>
            <Input name='email' value={values.email || ""} onChange={handleChange} placeholder='johndoe@gmail.com' />
          </div>
          {errors.email && <div className='text-red-500 text-[10px]'>{errors.email}</div>}
  
        </div>
        
       <div className='text-[14px]  mb-[5px] font-bold'>
      Password:

       </div>
       <div>
         <Input name='password' value={values.password}  onChange={handleChange} type='password' placeholder='abcd123@' />
       </div>
       <div>
       {errors.password && <div className='text-red-500 text-[10px]'>{errors.password}</div>}

     </div>
   
        <div>
     
   
       
        
       
        


        <div className='w-full  mt-[10px] underline text-[14px] cursor-pointer'>

Forget password?
       </div> 
       
     <div className='mt-[30px]'>
    <Button type="submit" className='bg-primary w-full h-[50px]'>
{
loading?"Please wait ...":"Login"
}               </Button>
     </div>
  
        
      </div>
 
   </Form>
)}

</Formik> 


          </div>
        </div>
</div>



      
      
    </div>
  )
}

export default Login



{/* <div className='w-[100%] mt-[30px] lg:mt-0 lg:w-full'> 


   <div className='w-full'>
     <div className='mb-[25px]w-full'>
       <div className='text-[14px]  mb-[5px] font-bold'>
         Email Address:
       </div>
       <div>
         <Input name='email' className='w-full' value={values.email} onChange={handleChange} placeholder='johndoe@gmail.com' />
       </div>
       {errors.email && <div className='text-red-500 text-[10px]'>{errors.email}</div>}
     </div>
  

     
    

     
   </div>
</div> */}
