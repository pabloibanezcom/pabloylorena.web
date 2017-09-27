import { Invitation } from '../../shared/models/invitation';

export class InvitationResult {
    invitations: Invitation[];
    sent: Number;
    awaiting: Number;
}
