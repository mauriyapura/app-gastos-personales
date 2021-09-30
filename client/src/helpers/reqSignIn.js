import axios from "axios";



export const reqSignIn = async(url, email, password, setProblem) => {  

    const reqData = await axios({
        method: 'post',
        url: url,
        data: {
            email,
            password
        }        
    })
        .then(res=>res.data)              
        //.catch(err => setProblem(err.response.data.errors[0].msg))   
        //.catch(err=>console.log(err.response.data.errors[0].msg) )
        .catch(err=> setProblem(err.response.data.error.detail[0].msg))
    return reqData
}



