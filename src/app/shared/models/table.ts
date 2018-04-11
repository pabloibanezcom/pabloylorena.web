import { Guest } from './guest';

export class Table {
    _id: string;
    number: number;
    name: string;
    alias: string;
    size: number;
    guests: Guest[];
    lastModified: Date;

    constructor() {
        this.guests = new Array<Guest>();
    }
}
