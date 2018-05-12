import { Result } from ".";
import { Invitation } from '../../../shared/models';

export class InvitationsResult implements Result {
    elements: Invitation[];
    invitationsSent: Number;
    invitationsAwaiting: Number;
}
