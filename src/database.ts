import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost/photo-gallery-db';

export async function startConnection() {
  await mongoose.connect(MONGO_URI, { //localhost -> 127.0.0.1:27017 -> donde ssi estoy conectado a un cloud service debería cambiar el puerto por el que ellos me den
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .catch(err => console.log(err));
  
  console.log('Database is connected');
}