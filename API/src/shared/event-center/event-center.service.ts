import { Event_Center } from './../../models/event_center.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventCenterService {
    constructor(@InjectModel('EventCenter') private readonly Model: Model<Event_Center>) { }

    // fetch all documents
    async getAll(): Promise<Event_Center[]> {
        const result = await this.Model.find();
        return result;
    }
    
    // Get a single Event_Center
    async getById(id): Promise<Event_Center> {
        const result = await this.Model.findById(id);
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result==null?false:true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<Event_Center> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<Event_Center> {
        const result = await this.Model
            .findByIdAndUpdate(id, body, { new: true });
        return result;
    }
    // Delete a document
    async deleteDocument(id): Promise<any> {
        const deletedResult = await this.Model.findByIdAndRemove(id);
        return deletedResult;
    }
}
