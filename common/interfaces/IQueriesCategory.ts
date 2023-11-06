interface IQueriesItem {
    name: string,
    link: string
}

interface IQueriesCategory {
    name: string,
    items: IQueriesItem[]
}

export default IQueriesCategory;