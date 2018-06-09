import { Result } from '.';
import { Table } from '../../../shared/models';

export class TablesResult implements Result {
    elements: Table[];
    complete: number;
    incomplete: number;
}
