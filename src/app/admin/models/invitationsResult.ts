import { Invitation } from '../../shared/models/invitation';

export class InvitationsResult {
    invitations: Invitation[];
    invitationsSent: Number;
    invitationsAwaiting: Number;
}
