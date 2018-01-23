interface ConfigColumn {
    header: string;
    sortBy: string;
    property?: string;
    responsive?: string;
}

interface ConfigSearch {
    placeholder: string;
    property: string;
    min_chars: number;
}

interface ConfigSelect {
    label: string;
    options: any[];
    name_property: string;
    value_property: string;
    property_match: string;
}

interface ConfigAction {
    label: string;
    icon: string;
    class: string;
    click: string;
}

export interface ResponsiveTableConfig {
    search: ConfigSearch;
    selects: ConfigSelect[];
    new_element: ConfigAction;
    other_actions: ConfigAction[];
    page_size: number;
    columns: ConfigColumn[];
}
