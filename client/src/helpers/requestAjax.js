import axios from "axios";

export const reqLogin = async(url, userData)=>{

    const reqData = await axios({
        method: 'post',
        url: url,
        data: userData,
        responseType: 'json'
    })            
        .catch(err=>console.log("falló login"))    

    return reqData
}




