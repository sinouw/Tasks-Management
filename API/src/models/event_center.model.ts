import * as mongoose from 'mongoose';

export interface Event_Center extends mongoose.Document {
    readonly _id: string;
    readonly centerId : string;
    readonly eventId : string;
    readonly status : boolean;
}



export const Event_CenterSchema = new mongoose.Schema({
    centerId: mongoose.Types.ObjectId,
    eventId: mongoose.Types.ObjectId,
    status: { type: Boolean, default: true },
}, { timestamps: true });