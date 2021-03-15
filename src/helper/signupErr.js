module.exports.signupErr = (err)=>{
    const allErr = {};
    //basic errors
    if(err.message.includes('validation failed')){
        Object.entries(err.errors).forEach(([key, val])=>{
            allErr[key] = val.message;
        });
    }

    //dublicate email error
    if(err.code === 11000){
        allErr[Object.keys(err.keyPattern)[0]]= "oops this is already taken";
    }

    return allErr;
}