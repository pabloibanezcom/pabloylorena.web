import { Guest } from './guest';
import { Address } from './address';

export class Invitation {
    guid: String;
    alias: String;
    receiver: String;
    address: Address;
    isSent: Boolean;
    guests: Guest[];
}
