export default interface Pagination {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNext: boolean
}
