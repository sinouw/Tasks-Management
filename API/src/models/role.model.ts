import * as mongoose from 'mongoose';

export interface Role extends mongoose.Document {
    readonly _id: string;
    readonly title : string;
    readonly status : boolean;
}



export const RoleSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });