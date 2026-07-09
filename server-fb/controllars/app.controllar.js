const addNewEntry = (req,resp)=>{
    resp.json({status: "added new entry."})
}




module.exports = { addNewEntry }