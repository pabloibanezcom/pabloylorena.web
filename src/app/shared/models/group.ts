import { Invitation } from './invitation';

export class Group {
    _id: String;
    name: String;
    host: String;
    order: number;
    lastModified: Date;
    invitations: Invitation[];
    guestsAmount: number;
}
