import { Invitation } from './invitation';

export class Group {
    name: String;
    host: String;
    invitations: Invitation[];
    guestsAmount: number;
}
