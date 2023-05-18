const mongoose =require("mongoose")

mongoose.set("strictQuery",false);

  mongoose
  .connect(`${process.env.URL_DB}`).then(()=>{
    console.log("DB READY")
  }).catch((err)=>{
    console.log(err)
  })
  