import { Invitation } from './invitation';
import { Table } from './table';

export class Guest {
    _id: string;
    invitation: Invitation;
    table: Table;
    name: string;
    fullName: string;
    type: number;
    email: string;
    phone: string;
    sendSms: Boolean;
    allergies: string;
    additionalComments: string;
    isTakingBus: Boolean;
    isAttending: Boolean;
    isAttendingExpectation: Boolean;
    isAttendingFriday: Boolean;
    stayingPlace: string;
    stayingPlaceExpectation: string;
    order: number;
    orderInTable: number;
    lastModified: Date;
}
