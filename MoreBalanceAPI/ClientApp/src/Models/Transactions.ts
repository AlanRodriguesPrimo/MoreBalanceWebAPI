export interface TransactionsModel {
    id: string,
    description: string,
    value: number,
    type: number,
    categoryId: string;
    personId: string;
    categoryName: string;
    personName: string;
}