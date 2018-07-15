import { Guest } from '../../../shared/models';
import { Result } from './result';

export class GuestsResult implements Result {
    elements: Guest[];
    guests: Guest[];
    attending: Number;
    awaiting: Number;
    expected: Number;
    nonExpected: Number;
    doubtful: Number;
    friday: Number;
    jarandilla: Number;
    navalmoral: Number;
    sms: Number;
}
