import React from 'react';

import  { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';


interface UserData{
    name: string,
    profile:string,
    carts:number,
};

interface cartData {
   
  userId: string,
  amount: string,
  restaurant: string,
  sellerId: string,
  type: string,
  created_at: string,
  image: string,

};


localStorage.setItem('userId', "A12sesbdgd");
// Retrieve user preferences
const userId = localStorage.getItem('userId');

const TopNavPage =  (  ) => {

const [UserDataInfo , setUserData] = useState<UserData[]>([]);
const [ carts , setCarts] = useState<cartData[]>([]);

setUserInfo({ name:"ama" , profile:"pig.jpg"});
useEffect( () => {

const baseUrlFetch = 'http://localhost:3002/auth/carts/';

axios.get<cartData[]>(baseUrlFetch,{ userId })
 .then((response: AxiosResponse <cartData[]> ) => {
        setCarts(response.data);
        console.log(response.data);
        console.log(userInfo);
        console.log(response.data.length);

      })
.catch( (error: string)=>{
 console.log("error fetching data",error);
})
}, []);





    //end
  return <ul> 
     
    
  </ul>;



   <ul>  </ul>
}


export default TopNavPage;
