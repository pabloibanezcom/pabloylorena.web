import { Invitation } from './invitation';

export class Group {
    _id: String;
    name: String;
    host: String;
    invitations: Invitation[];
    guestsAmount: number;
}
