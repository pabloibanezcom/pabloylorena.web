import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense, Group, Guest, Invitation, Table } from '../../../shared/models';
import { HttpService } from '../../../shared/services/http.service';
import { ExpensesResult, Result } from '../models';
import { GroupsResult } from '../models/groupsResult';
import { GuestsResult } from '../models/guestsResult';
import { InvitationsResult } from '../models/invitationsResult';
import { OverviewResult } from '../models/overviewResult';
import * as searchRequests from './search-requests.json';

@Injectable()
export class AdminService {

  private groups: Group[];
  private invitations: Invitation[];

  constructor(
    private http: HttpService,
    private httpClient: HttpClient
  ) { }

  getGroupNames(): Observable<Group[]> {
    return this.search('groupNames');
  }

  getGroupWithInvitations(): Observable<Group[]> {
    return this.search('groupWithInvitations');
  }

  getTableNames(): Observable<Table[]> {
    return this.search('tableNames');
  }

  generateNewModel(model: string): any {
    if (model === 'guest') {
      return new Guest();
    }
    if (model === 'expense') {
      return new Expense();
    }
    return null;
  }

  getTableConfig(model: string): Observable<any> {
    return this.httpClient.get(`app/admin/table-configs/${model}-table-config.json`);
  }

  getResult(model: string): Observable<Result> {
    if (model === 'guest') {
      return this.getGuestsResult();
    }
    if (model === 'expense') {
      return this.getExpensesResult();
    }
    return null;
  }

  getOverviewResult(): Observable<OverviewResult> {
    return this.http.get('overview/report');
  }

  getInvitationsResult(): Observable<InvitationsResult> {
    return this.search('invitationsResult');
  }

  getGuestsResult(): Observable<GuestsResult> {
    return this.search('guestsResult');
  }

  getGuestsTablesResult(): Observable<Guest[]> {
    return this.search('guestsTablesResult');
  }

  getGroupsResult(): Observable<GroupsResult> {
    return this.search('groupsResult');
  }

  getTablesResult(): Observable<Table[]> {
    return this.search('tablesResult');
  }

  getExpensesResult(): Observable<ExpensesResult> {
    return this.search('expensesResult');
  }

  createElement(element: any, model: string) {
    return this.http.postWithResponse(`${model}/add`, element);
  }

  updateElement(element: any, model: string) {
    return this.http.putWithResponse(`${model}/${element._id}`, element);
  }

  removeElement(element: any, model: string) {
    return this.http.deleteWithResponse(`${model}/${element._id}`);
  }

  // -------- GUEST ----------

  createGuest(newGuest: Guest) {
    return this.http.postWithResponse('guest/add', newGuest);
  }

  updateGuest(guest: Guest) {
    return this.http.putWithResponse('guest/' + guest._id, guest);
  }

  removeGuest(guest: Guest) {
    return this.http.deleteWithResponse('guest/' + guest._id);
  }

  updateGuestOrder(guest: Guest) {
    return this.http.putWithResponse('guest/order/' + guest._id, { order: guest.order });
  }

  updateGuestOrderInTable(guest: Guest) {
    return this.http.putWithResponse('guest/order-table/' + guest._id, { orderInTable: guest.orderInTable });
  }

  // -------------------------


  // -------- INVITATION ----------

  getInvitation(invitationId: string) {
    return this.http.get('invitation/' + invitationId);
  }

  createInvitation(newInvitation: Invitation) {
    return this.http.postWithResponse('invitation/add', newInvitation);
  }

  updateInvitation(invitation: Invitation) {
    return this.http.putWithResponse('invitation/' + invitation._id, invitation);
  }

  removeInvitation(invitation: Invitation) {
    return this.http.deleteWithResponse('invitation/' + invitation._id);
  }

  // -------------------------

  // -------- GROUP ----------

  getGroup(groupId: string) {
    return this.http.get('group/' + groupId);
  }

  createGroup(newGroup: Group) {
    return this.http.postWithResponse('group/add', newGroup);
  }

  updateGroup(group: Group) {
    return this.http.putWithResponse('group/' + group._id, group);
  }

  removeGroup(group: Group) {
    return this.http.deleteWithResponse('group/' + group._id);
  }

  // -------------------------

  // -------- TABLE ----------

  getTable(tableId: string) {
    return this.http.get('group/' + tableId);
  }

  createTable(newTable: Table) {
    return this.http.postWithResponse('table/add', newTable);
  }

  updateTable(table: Table) {
    return this.http.putWithResponse('table/' + table._id, table);
  }

  removeTable(table: Table) {
    return this.http.deleteWithResponse('table/' + table._id);
  }

  // -------------------------

  private search(searchName: string): Observable<any> {
    const searchReqOptions = searchRequests[searchName];
    return this.http.post(searchReqOptions.url, searchReqOptions.body)
      .map(collection => this[searchName + 'Map'] ? this[searchName + 'Map'](collection) : collection);
  }

  private invitationsResultMap(invitations: Invitation[]): InvitationsResult {
    return this.checkSentInvitations(invitations);
  }

  private guestsResultMap(guests: Guest[]): GuestsResult {
    return this.checkAttendingGuests(guests);
  }

  private groupsResultMap(groups: Group[]): GroupsResult {
    groups.forEach(g => {
      g.guestsAmount = 0;
      g.invitations.forEach(inv => {
        g.guestsAmount += inv.guests.length;
      });
    });
    return {
      groups: groups
    };
  }

  private expensesResultMap(expenses: Expense[]): ExpensesResult {
    return {
      elements: expenses
    };
  }

  private checkSentInvitations(invitations: Invitation[]): InvitationsResult {
    return {
      invitations: invitations,
      invitationsSent: invitations.filter(i => i.isSent).length,
      invitationsAwaiting: invitations.filter(i => !i.isSent).length
    };
  }

  private checkAttendingGuests(guests: Guest[]): GuestsResult {
    return {
      elements: guests,
      guests: guests,
      attending: guests.filter(g => g.isAttending).length,
      awaiting: guests.filter(g => !g.isAttending).length,
      expected: guests.filter(g => g.isAttendingExpectation).length,
      nonExpected: guests.filter(g => g.isAttendingExpectation === false).length,
      doubtful: guests.filter(g => g.isAttendingExpectation == null).length
    };
  }

}
