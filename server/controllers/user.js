import user from "../model/user.js";

export const show_users=async(req,res)=>{
    try {
        const users=await user.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const add_user=async(req,res)=>{

try {
    
    const {fname,lname,status}=req.body;

    const exist = await user.findOne({fname,lname});
    console.log(exist);
    if(exist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const new_user=new user({
        fname,
        lname,
        status
    })
    
    await new_user.save();

    return res.status(200).json({
        message:"user added successfully"
    })
    
} catch (error) {
    res.status(400).json({
        message:error.message
    })
}

}

export const update_user=async(req, res)=>{

    try {
        const {id}=req.params;
        const {fname,lname,status}=req.body;
        const user_update=await user.findByIdAndUpdate(id,{fname,lname,status});
        res.status(200).json({
            message:"user updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const delete_user=async(req, res)=>{

    try {
        const {id}=req.params;
        const exist= await user.findByIdAndDelete(id);
        if(!exist){
            return res.status(400).json({
                message:"user not exist"
            })
        }
        return res.status(200).json({
            message:"user deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}