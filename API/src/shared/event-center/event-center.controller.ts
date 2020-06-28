import { EventCenterService } from './event-center.service';
import { Controller, Get, Post, Body, Res, HttpStatus, Param, Put, Delete, NotFoundException } from '@nestjs/common';

@Controller('event-center')
export class EventCenterController {
    constructor(private eventCenterService: EventCenterService) { }

    // add a document
    @Post('create')
    async adddocument(@Res() res, @Body() createDto: any) {
        const document = await this.eventCenterService.addNewDocument(createDto);
        return res.status(HttpStatus.OK).json({
            message: "document has been created successfully",
            document
        })
    }

    // Retrieve documents list
    @Get('getAll')
    async getAlldocument(@Res() res) {
        const documents = await this.eventCenterService.getAll();
        return res.status(HttpStatus.OK).json(documents);
    }

    // Fetch a particular document using ID
    @Get(':id')
    async getdocument(@Res() res, @Param('id') id) {
        const document = await this.eventCenterService.getById(id);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(document);
    }

    // Fetch a particular document using ID
    @Get('check/:id')
    async documentExists(@Res() res, @Param('id') id) {
        const result = await this.eventCenterService.checkExistanceById(id);
        if (result==false) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(true);
    }

    // Update a document's details
    @Put('update/:id')
    async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
        const document = await this.eventCenterService.updateDocumet(id, createdocumentDTO);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'document has been successfully updated',
            document
        });
    }

    // Delete a document
    @Delete('delete/:id')
    async deletedocument(@Res() res, @Param('id') id) {
        const document = await this.eventCenterService.deleteDocument(id);
        if (!document) throw new NotFoundException('document does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'document has been deleted',
            document
        })
    }
}
