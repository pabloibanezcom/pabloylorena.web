export interface OverviewResult {
    isAttendingFriday: YesNoDoubtful;
    isAttending: YesNoDoubtful;
    isAttendingExpectation: YesNoDoubtful;
}

export interface YesNoDoubtful {
    yes: any;
    no: any;
    doutbful: any;
}
