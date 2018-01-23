interface Select {
    property: string;
    value: string;
}

export class ResponsiveTableFilter {
    searchStr: string;
    selects: Select[];

    constructor() {
        this.searchStr = '';
        this.selects = [];
    }
}
