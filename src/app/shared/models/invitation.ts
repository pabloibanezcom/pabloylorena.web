import { Guest } from './guest';
import { Address } from './address';

export class Invitation {
    _id: String;
    guid: string;
    alias: string;
    receiver: string;
    address: Address;
    isSent: boolean;
    guests: Guest[];

    constructor() {
        this.guests = new Array<Guest>();
    }
}
