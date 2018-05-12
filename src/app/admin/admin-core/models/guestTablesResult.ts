import { Result } from ".";
import { Guest } from "../../../shared/models";

export class GuestTablesResult implements Result {
    elements: Guest[];
}