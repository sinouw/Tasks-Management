
import * as mongoose from 'mongoose';

export interface TrainingCenter extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly type: string;
    readonly phone: string;
    readonly status: boolean;
}

export const TrainingCenterSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });