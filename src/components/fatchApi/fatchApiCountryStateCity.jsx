import axios from 'axios'

const fatchApiCountryStateCity = () => {
  
 const getCountryInfo=()=>{
    const res=axios.get("https://countryapi.io/api/all",{
        headers:{
             "Authorization": "Bearer JvZsTtRlfk0UTh2n91OO45OUzy5puiThzASkYMqK",
             "Accept": "application/json"
        }
    }).then((response)=>{
        return response;
    }).catch(error=>{
        return error
    })
    console.log(res);
 }

  return getCountryInfo;

}

export default fatchApiCountryStateCity