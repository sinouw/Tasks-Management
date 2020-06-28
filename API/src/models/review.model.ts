import * as mongoose from 'mongoose';

export interface Review extends mongoose.Document {
    readonly _id: string;
    readonly rate: string;
    readonly comment: string;
    readonly eventId : string;
    readonly userId : string;
    readonly status : boolean;
}



export const ReviewSchema = new mongoose.Schema({
    rate: { type: String, default: "" },
    comment: { type: String, default: "" },
    eventId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    status: { type: Boolean, default: true },
}, { timestamps: true });