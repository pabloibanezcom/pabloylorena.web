import { Result } from ".";
import { Notification } from '../../../shared/models';

export class NotificationsResult implements Result {
    elements: Notification[];
}