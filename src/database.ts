import mongoose from "mongoose";

export async function startConnection() {
  await mongoose.connect('mongodb://localhost/photo-gallery-db', { //localhost -> 127.0.0.1:27017 -> donde ssi estoy conectado a un cloud service debería cambiar el puerto por el que ellos me den
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .catch(err => console.log(err));
  
  console.log('Database is connected');
}