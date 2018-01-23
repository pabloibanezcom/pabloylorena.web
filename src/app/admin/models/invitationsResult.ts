import { Group } from '../../shared/models/group';

export class InvitationsResult {
    groups: Group[];
    invitationsSent: Number;
    invitationsAwaiting: Number;
}
