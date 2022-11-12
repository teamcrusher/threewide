import mongoose from "mongoose";

export interface StrategyDocument extends mongoose.Document {
    name : string
}

const StragetySchema = new mongoose.Schema({
    name : String, 
})

const StrategyModel : mongoose.Model<StrategyDocument> = mongoose.models.Strategy || mongoose.model<StrategyDocument>('Strategy', StragetySchema)

export default StrategyModel