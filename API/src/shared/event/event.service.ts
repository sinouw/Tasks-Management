import { Event } from './../../models/event.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventService {

    constructor(@InjectModel('Event') private readonly Model: Model<Event>) { }

    // fetch all documents
    async getAll(): Promise<Event[]> {
        const result = await this.Model.find();
        return result;
    }
    
    // Get a single Document
    async getById(id): Promise<Event> {
        const result = await this.Model.findById(id);
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result==null?false:true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<Event> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<Event> {
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
