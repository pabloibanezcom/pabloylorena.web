import { Guest } from '../../shared/models/guest';

export class GuestsResult {
    guests: Guest[];
    attending: Number;
    awaiting: Number;
}
