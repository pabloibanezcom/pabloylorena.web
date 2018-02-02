import { Guest } from './guest';
import { Address } from './address';

export class Invitation {
    _id: String;
    guid: string;
    alias: string;
    receiver: string;
    address: Address;
    isSent: boolean;
    isReplied: boolean;
    guests: Guest[];
    lastModified: Date;

    constructor() {
        this.isReplied = false;
        this.isSent = false;
        this.guests = new Array<Guest>();
    }
}
