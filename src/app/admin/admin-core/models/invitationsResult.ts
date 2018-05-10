import { Invitation } from '../../../shared/models';

export class InvitationsResult {
    invitations: Invitation[];
    invitationsSent: Number;
    invitationsAwaiting: Number;
}
