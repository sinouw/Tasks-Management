import { DepartmentService } from './department.service';
import { Controller, Get, Post, Body, Res, HttpStatus, Param, Put, Delete, NotFoundException } from '@nestjs/common';

@Controller('department')
export class DepartmentController {

    constructor(private departmentService: DepartmentService) { }

    // Retrieve documents list
    @Get('getAll')
    async getAllDocuments(@Res() res) {
        const documents = await this.departmentService.getAll();
        return res.status(HttpStatus.OK).json(documents);
    }
    
    @Get('getEnabled')
    async getEnabled(@Res() res) {
        const documents = await this.departmentService.getEnabled();
        return res.status(HttpStatus.OK).json(documents);
    }

    // Fetch a particular document using ID
    @Get(':id')
    async getDocument(@Res() res, @Param('id') id) {
        const document = await this.departmentService.getById(id);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(document);
    }

    // Fetch a particular document using ID
    @Get('check/:id')
    async documentExists(@Res() res, @Param('id') id) {
        const result = await this.departmentService.checkExistanceById(id);
        if (result == false) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(true);
    }

    // add a document
    @Post('create')
    async adddocument(@Res() res, @Body() createDto: any) {
        const document = await this.departmentService.addNewDocument(createDto);
        return res.status(HttpStatus.OK).json({
            message: "document has been created successfully",
            document
        })
    }

    // Update a document's details
    @Put('update/:id')
    async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
        const document = await this.departmentService.updateDocumet(id, createdocumentDTO);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'document has been successfully updated',
            document
        });
    }

    // Delete a document
    @Delete('delete/:id')
    async deletedocument(@Res() res, @Param('id') id) {
        const document = await this.departmentService.deleteDocument(id);
        if (!document) throw new NotFoundException('document does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'document has been deleted',
            document
        })
    }
}
