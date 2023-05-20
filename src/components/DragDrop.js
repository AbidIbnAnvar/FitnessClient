import React, { useState,useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Decoder, Stream, Profile, Utils } from '@garmin-fit/sdk';
import './DragDrop.css'
import axios from 'axios'
import { Upload } from "./FitUpload";

const fileTypes = ["FIT"];

export const DragDrop= (props) => {
  console.log('param',props.username)
  const [file, setFile] = useState(null);
  useEffect(()=>{
    const fetchData= async ()=> {
     const response= await axios.get('http://34.133.77.198/api/user/get', {
       withCredentials: true 
     })}}
  ,[])

  const handleChange = async (file) => {
    setFile(file);

    function fileToByteArray(file, callback) {
      const reader = new FileReader();
    
      // Set up the onload event handler
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        callback(null, byteArray);
      };
    
      // Set up the onerror event handler
      reader.onerror = function (event) {
        callback(event.target.error, null);
      };
    
      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    }

    const byte = fileToByteArray(file, function (error, byteArray){
      if (error) {
      console.error('Error converting file to byte array:', error);}
      else {
      // Access the byte array

      const stream = Stream.fromByteArray(byteArray);
      console.log("isFIT (static method): " + Decoder.isFIT(stream));
      const decoder = new Decoder(stream);
      console.log("isFIT (instance method): " + decoder.isFIT());
      console.log("checkIntegrity: " + decoder.checkIntegrity());
  
      const { messages, errors } = decoder.read();
      
      console.log(errors);
      messages.username=props.username
      console.log(messages);
      Upload(messages)
      
      
    }}) 
    
    
    

  };
  return (
    <FileUploader className='drag-drop' handleChange={handleChange} name="file" types={fileTypes}/>
  );
}

