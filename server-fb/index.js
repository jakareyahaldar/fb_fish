
const express = require("express")

// intnal imports 
const FbRouter = require('./routers/app.router.js')

const app = express()
const PORT = 7000 || process.env.PORT




app.get("/", (req,resp)=>{
    resp.json({status: "running server."})
})


// routers 
app.use("/fb",FbRouter)

// listen 
app.listen(PORT,()=> console.log(`App running at port: ${PORT}`))