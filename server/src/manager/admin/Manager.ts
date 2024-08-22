import {Request, Response} from 'express';
import { Admin } from '../../db/Admin';

export class Manager{

    async addSaviour(req: Request, res: Response){
        const {contact, location} : {contact: number[], location: {lat: number, long: number}} = req.body;
        
        // add contact/s to database with location
        await Admin.addContacts(contact, location);

        res.send("contact/s added");
    }
}