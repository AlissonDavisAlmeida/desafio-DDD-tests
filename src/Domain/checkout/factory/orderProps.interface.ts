

export interface OrderProps {
    id: string,
    customerID: string,
    items: [
        {
            id: string,
            name: string,
            productID: string,
            quantity: number,
            price: number
        }
    ]
}