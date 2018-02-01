import { Invitation } from './invitation';
import { Table } from './table';

export class Guest {
    _id: String;
    invitation: Invitation;
    table: Table;
    name: String;
    fullName: String;
    type: number;
    email: String;
    phone: String;
    sendSms: Boolean;
    allergies: String;
    additionalComments: string;
    busTime: String;
    isAttending: Boolean;
    giftAmount: number;
    lastModified: Date;
}
