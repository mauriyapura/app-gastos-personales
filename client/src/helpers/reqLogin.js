import axios from "axios";

export const reqLogin = async(url, userData)=>{

    const reqData = await axios({
        method: 'post',
        url: url,
        data: userData,
        responseType: 'json'
    })
        .then(res=>res.data)              
        .catch(err=>console.log("Error en el backend") )    

    return reqData
}




