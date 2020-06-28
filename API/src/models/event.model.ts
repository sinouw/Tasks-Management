
import * as mongoose from 'mongoose';

export interface Event extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly type: string;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly location: string;
    readonly url: string;
    readonly departementId: string;
    readonly status: boolean;
    readonly roles   : string[]; 
}

export const EventSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, default: "" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    location: { type: String, default: "" },
    url: { type: String, default: "" },
    departementId: mongoose.Types.ObjectId,
    roles   : [String],
    status: { type: Boolean, default: true },
}, { timestamps: true });