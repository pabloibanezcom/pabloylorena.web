import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense, ExpenseCategory, Group, Guest, Invitation, Notification, NotificationType, Table } from '../../../shared/models';
import { HttpService } from '../../../shared/services/http.service';
import { ExpensesResult, GroupsResult, GuestsResult, GuestTablesResult, InvitationsResult, NotificationsResult, OverviewResult, Result, TablesResult } from '../models';
import * as searchRequests from './search-requests.json';

@Injectable()
export class AdminService {

  private groups: Group[];
  private invitations: Invitation[];
  private expectedGuests: { adults: number, children: number };

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

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return this.search('expenseCategories');
  }

  getExpectedGuests(): { adults: number, children: number } {
    return this.expectedGuests;
  }

  getNotificationTypes(): NotificationType[] {
    return [
      {
        label: 'Movil',
        value: 'Movil',
        icon: 'mobile'
      },
      {
        label: 'Email',
        value: 'Email',
        icon: 'at'
      }
    ];
  }

  refreshExpectedGuests(): Observable<{ adults: number, children: number }> {
    return this.search('expectedGuests')
      .do(res => this.expectedGuests = this.processExpectedGuests(res))
      .map(res => this.processExpectedGuests(res));
  }

  generateNewModel(model: string): any {
    if (model === 'guest') { return new Guest(); }
    if (model === 'invitation') { return new Invitation(); }
    if (model === 'group') { return new Group(); }
    if (model === 'table') { return new Table(); }
    if (model === 'table-guest') { return new Guest(); }
    if (model === 'expense') { return new Expense(); }
    if (model === 'notification') { return new Notification(); }
    return null;
  }

  getResult(model: string): Observable<Result> {
    if (model === 'guest') { return this.getResultObject('guestsResult'); }
    if (model === 'invitation') { return this.getResultObject('invitationsResult'); }
    if (model === 'group') { return this.getResultObject('groupsResult'); }
    if (model === 'table') { return this.getResultObject('tablesResult'); }
    if (model === 'table-guest') { return this.getResultObject('guestsTablesResult'); }
    if (model === 'expense') { return this.getResultObject('expensesResult'); }
    if (model === 'notification') { return this.getResultObject('notificationsResult'); }
    return null;
  }

  getTableConfig(model: string): Observable<any> {
    return this.httpClient.get(`app/admin/table-configs/${model}-table-config.json`);
  }

  getResultObject(name: string): Observable<Result> {
    return this.search(name);
  }

  getElement(elementId: string, model: string) {
    return this.http.get(`${model}/${elementId}`);
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

  updateGuestOrder(guest: Guest) {
    return this.http.putWithResponse('guest/order/' + guest._id, { order: guest.order });
  }

  updateGuestOrderInTable(guest: Guest) {
    return this.http.putWithResponse('guest/order-table/' + guest._id, { orderInTable: guest.orderInTable });
  }

  // -------- OVERVIEW ----------

  getOverviewResult(): Observable<OverviewResult> {
    return this.http.get('overview');
  }

  search(searchName: string): Observable<any> {
    const searchReqOptions = searchRequests[searchName];
    const httpRequest = searchReqOptions.method === 'get' ?
      this.http.get(searchReqOptions.url) :
      this.http.post(searchReqOptions.url, searchReqOptions.body);
    return httpRequest
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
      elements: groups
    };
  }

  private tablesResultMap(tables: Table[]): TablesResult {
    return {
      elements: tables,
      complete: tables.filter(t => t.guests.length === t.size).length,
      incomplete: tables.filter(t => t.guests.length !== t.size).length
    };
  }

  private guestsTablesResultMap(guest: Guest[]): GuestTablesResult {
    return {
      elements: guest.filter(g => g.isAttendingExpectation && (g.table === null || g.table === undefined) && g.type < 4)
    };
  }

  private expensesResultMap(expenses: Expense[]): ExpensesResult {
    if (expenses.length === 0) {
      return {
        elements: [],
        amount: 0,
        amountPaid: 0,
      };
    }
    return {
      elements: expenses,
      amount: expenses.map(e => this.getTotalAmountFromExpense(e)).reduce((a, b) => a + b),
      amountPaid: expenses.map(e => e.amountPaid).reduce((a, b) => a + b),
    };
  }

  private notificationsResultMap(notifications: Notification[]): NotificationsResult {
    return {
      elements: notifications
    };
  }

  private checkSentInvitations(invitations: Invitation[]): InvitationsResult {
    return {
      elements: invitations,
      invitationsReplied: invitations.filter(i => i.isReplied).length,
      invitationsAwaiting: invitations.filter(i => !i.isReplied).length
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
      doubtful: guests.filter(g => g.isAttendingExpectation == null).length,
      friday: guests.filter(g => g.isAttendingFriday).length,
      jarandilla: guests.filter(g => g.stayingPlace === 'Jarandilla').length,
      navalmoral: guests.filter(g => g.stayingPlace === 'Navalmoral').length,
      sms: guests.filter(g => g.sendSms).length
    };
  }

  private getTotalAmountFromExpense(expense: Expense): number {
    if (expense.costPerGuest === 1) {
      return this.getExpectedGuests().adults * expense.amount;
    }
    if (expense.costPerGuest === 3) {
      return this.getExpectedGuests().children * expense.amount;
    }
    return expense.amount;
  }

  private processExpectedGuests(guests: Guest[]): { adults: number, children: number } {
    return {
      adults: guests.filter(g => g.type === 1 || g.type === 2).length,
      children: guests.filter(g => g.type === 3).length
    };
  }

}
