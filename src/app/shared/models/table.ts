import { Guest } from './guest';

export class Table {
    _id: String;
    number: number;
    name: string;
    shape: string;
    maxSize: number;
    minSize: number;
    guests: Guest[];

    constructor() {
        this.guests = new Array<Guest>();
    }
}