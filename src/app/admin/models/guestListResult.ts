import { Guest } from '../../shared/models/guest';

export class GuestListResult {
    guests: Guest[];
    attending: Number;
    awaiting: Number;
}
