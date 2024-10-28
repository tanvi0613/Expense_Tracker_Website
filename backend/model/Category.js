const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        name: {
            type:String,
            required:true,
            default: "Uncategorized"
        },
        type: {
            type:String,
            required:true,
            enum:["income", "expense"]
        },
    },
    {
        timestamps:true
    }
)


module.exports = mongoose.model("Category", categorySchema);