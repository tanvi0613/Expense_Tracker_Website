const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        type: {
            type:String,
            required:true,
            enum:["income", "expense"]
        },
        category: {
            type:String,
            required:true,
            default: "Uncategorized"
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps:true
    }
)


module.exports = mongoose.model("Transaction", transactionSchema);