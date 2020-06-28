import * as mongoose from 'mongoose';

export interface Notification extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly type: string;
    readonly isGeneral : boolean;
    readonly eventId : string;
    readonly departmentId : string;
    readonly status : boolean;

}

export const NotificationSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, default: "" },
    eventId: mongoose.Types.ObjectId,
    departmentId: mongoose.Types.ObjectId,
    isGeneral: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });