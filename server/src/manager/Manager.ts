import {Request, Response} from 'express';
import {Saviours, Ilocation} from './Saviours';
import { User } from '../db/User';
const twilio = require("twilio");

const myNumber: number = 552120420682;

export class Handle{

    private near: any;
    private contacts: null | number[];
    private interval: null | any;
    private location: null | Ilocation;
    private client: null | any;

    constructor(){
        this.near = new Saviours;
        this.contacts = null;
        this.interval = null;
        this.location = null;
        // this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.client = null;
    }

    async saveMe(req: Request, res: Response){
        
        const {userId, location}: {userId: string, location: Ilocation} = req.body;

        if(this.location == null){
            this.location = location;
            // fetch nearest contacts of people [police, army, politicians, family, people]
            if(this.contacts === null){
                const nearestContacts: number[] = await this.near.getNearestContacts(userId, location);
                if(nearestContacts.length > 0){
                    this.contacts = nearestContacts;
                    this.broadcastMessage();
                }else{
                    // do something if no nearest contact found 
                }
            }else{
                this.broadcastMessage();
            }

        }else{
            // check is location change
            if(this.isLocationChange(location)){
                this.location = location;
                const nearestContacts: number[] = this.near.getNearestContacts(userId, location);
                if(nearestContacts.length > 0){
                    // add more new loaction contacts
                    nearestContacts.forEach((contact, index) => {
                        this.contacts?.push(contact); 
                    })
                    this.broadcastMessage();
                }else{
                    // do something if no nearest contact found 
                }
            }
            
        }

        res.send('all people are informed');
    }

    private broadcastMessage(){

        if(this.interval){ // if user's location change then first clear old data and then send new data
            clearInterval(this.interval);
        }

        // @ts-ignore 
        this.contacts.forEach(async (contact, index) => {
            // send victim's location to each contact [whatsapp, text msg]
            // await this.sendMessage(contact);
            console.log(contact);
        })

        this.interval = setInterval(() => {
            // @ts-ignore 
            this.contacts.forEach(async (contact, index) => {
                // send victim's location to each contact [whatsapp, text msg]
                // await this.sendMessage(contact);
                console.log(contact);
            })
        }, 10000) // run after each 10 seconds
    }

    private async sendMessage(contact: number, retry: number = 3){
        if(retry < 0){
            console.log('admin check! message is not working');
            return;
        }
        try {
            const message = await this.client.messages.create({
                body: `Save me! My location is ${this.location}`, // convert lat long to actual place's name
                from: `whatsapp:+${myNumber}`,
                to: `whatsapp:+${contact}`,
              });
        } catch (error) {
            await this.sendMessage(contact, retry--);
        }

    }

    private isLocationChange(location: Ilocation){
        const a = location.lat != this.location?.lat;
        const b = location.long != this.location?.long;
        if(!a || !b){
            return true;
        }
        return false;
    }

    async addSaviour(req: Request, res: Response){
        const {userId, contacts} : {userId: string, contacts: number[]} = req.body;

        // add user's saviour's contact/s to database
        await User.addContacts(userId, contacts);

        res.send("contact/s added");
    }
}