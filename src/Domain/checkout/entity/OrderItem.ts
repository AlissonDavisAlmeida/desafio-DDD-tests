export class OrderItem{
    private _id: string
    private _productID: string
    private _quantity: number
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number, productID: string, quantity: number){
        this._id = id
        this._name = name
        this._price = price
        this._productID = productID
        this._quantity = quantity
    }

    get price(){
        return this._price * this._quantity
    }

    get id(){
        return this._id
    }

    get productId(){
        return this._productID
    }

    get name(){
        return this._name
    }

    get quantity(){
        return this._quantity
    }

}