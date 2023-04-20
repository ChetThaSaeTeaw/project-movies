import React , { useEffect } from 'react';
import { APIKEY } from '../../api/MovieKey';
import MovieApi from '../../api/MovieApi';

function Test() {

    const fetchDataTest = async () => {
        try {
            let response = await MovieApi.get(`movie/all?key=${APIKEY}`);
            console.log(response.data);
        } catch (err) {
            console.log("Error Test Page :" , err);
        }
   };

    useEffect(() => {
        fetchDataTest();
    },[]);

  return (
    <div style={{ padding : "60px" , width : "100%" , textAlign : 'center' }}>
        <h1 style={{ color : "#fff" }}>Test</h1>
    </div>
  );
};

export default Test;