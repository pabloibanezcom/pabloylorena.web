import { Invitation } from '../../shared/models/invitation';
import { Guest } from '../../shared/models/guest';

export class CollectionsResult {
    invitations: Invitation[];
    guests: Guest[];
}
