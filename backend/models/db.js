const mongoose =require("mongoose")

mongoose.set("strictQuery",false);

  mongoose
  .connect(`${process.env.URL_DB}`).then(()=>{
    console.log("hi osama")
  }).catch((err)=>{
    console.log(err)
  })
  