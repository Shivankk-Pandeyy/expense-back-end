const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    expenses:{
        type:Array,
        default:[
            {
                month:{
                    type:String,
                },
                title:{
                    type:String,
                },
                amount:{
                    type:Number
                }
            }
        ]
    },
    saving:{
        type:Array,
        default:[
            {
                month:{
                    type:String,
                },
                title:{
                    type:String,
                },
                amount:{
                    type:Number
                }
            }
        ]
    }
},{timestamps:true});
const User=mongoose.model("User",userSchema);
module.exports=User;