import { Guest } from '../../shared/models/guest';

export class GuestsResult {
    guests: Guest[];
    attending: Number;
    awaiting: Number;
    expected: Number;
    nonExpected: Number;
    doubtful: Number;
}
