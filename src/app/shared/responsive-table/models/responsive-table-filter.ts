interface Sort {
    property: string;
    direction: boolean;
}

interface Select {
    property: string;
    value: string;
}

export class ResponsiveTableFilter {
    sort: Sort;
    searchStr: string;
    selects: Select[];

    constructor() {
        this.sort = {
            property: null,
            direction: true
        };
        this.searchStr = '';
        this.selects = [];
    }
}
