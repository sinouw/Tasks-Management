import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from 'src/models/department.model';

@Injectable()
export class DepartmentService {
    constructor(@InjectModel('Department') private readonly Model: Model<Department>) { }

    // fetch all documents
    async getAll(): Promise<Department[]> {
        const result = await this.Model.find();
        return result;
    }

    async getEnabled(): Promise<Department[]> {
        const result = await this.Model.aggregate([
            {
                '$match': {
                    'status': true
                }
            },
            {
                '$project': {
                    '_id': 1,
                    'title': 1
                }
            },
        ]);
        return result;
    }

    // Get a single Department
    async getById(id): Promise<Department> {
        const result = await this.Model.findById(id);
        return result;
    }
     // Get a single Department By Title
    async getByTitle(title): Promise<Department> {
        const result = await this.Model.findOne({ title: title });
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result == null ? false : true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<Department> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<Department> {
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
