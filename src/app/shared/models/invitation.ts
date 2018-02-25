import { Group } from './group';
import { Guest } from './guest';
import { Address } from './address';

export class Invitation {
    _id: string;
    guid: string;
    alias: string;
    receiver: string;
    address: Address;
    isSent: boolean;
    isReplied: boolean;
    dear: string;
    isPlural: boolean;
    dedication: string;
    useGroupDedication: boolean;
    guests: Guest[];
    group: Group;
    lastModified: Date;

    constructor() {
        this.isReplied = false;
        this.isSent = false;
        this.guests = new Array<Guest>();
    }
}
