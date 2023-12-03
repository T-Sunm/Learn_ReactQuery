import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
             
}, {timestamps:true})

const Events = mongoose.model('Events', eventSchema);

export default Events;