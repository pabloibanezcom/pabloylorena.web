import { Result } from '.';
import { Group } from '../../../shared/models';

export class GroupsResult implements Result {
    elements: Group[];
}
