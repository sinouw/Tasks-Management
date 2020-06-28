
import * as mongoose from 'mongoose';

export interface Department extends mongoose.Document {
    _id: string;
    readonly title: string;
    readonly description: string;
    readonly status: boolean;
}

export const DepartmentSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });

export const defaultDoc = {
    title: "IT",
    description: "Information Technology enables sophisticated product development, better market infrastructure, implementation of reliable techniques for control of risks and helps the financial intermediaries to reach geographically distant and diversified markets. Internet has significantly influenced delivery channels of the banks."
  }


