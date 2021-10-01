import mongoose from 'mongoose';
import { config } from "./vars";

if(process.env.NODE_ENV === 'development'){
    mongoose.set("debug", true);
}

const url = `mongodb://${config.db.host}/${config.db.database}`;

mongoose.Promise = Promise;
mongoose.connect(url, ()=>{console.log("============= DB connected ===================")});

const mongodb = mongoose.connection;

export default mongodb;