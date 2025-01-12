import express from 'express'
const app = express()


app.get('/',(req,res) => {
    res.send("Hlo Backend")
} )


app.listen(3000,()=>{
    console.log("Server has been started")
})