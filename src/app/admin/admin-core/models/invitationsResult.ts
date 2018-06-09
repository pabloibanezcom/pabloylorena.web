import { Result } from '.';
import { Invitation } from '../../../shared/models';

export class InvitationsResult implements Result {
    elements: Invitation[];
    invitationsReplied: Number;
    invitationsAwaiting: Number;
}
