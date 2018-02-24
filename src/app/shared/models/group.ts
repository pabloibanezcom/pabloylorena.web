import { Invitation } from './invitation';

export class Group {
    _id: string;
    name: string;
    host: string;
    order: number;
    lastModified: Date;
    invitationDedication: string;
    invitations: Invitation[];
    guestsAmount: number;
}
