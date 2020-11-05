import { Decimal } from 'decimal.js'

export interface Data {
    rows: any[],
    meta: {
        page: number
        limit: number
        totalRows: number
        totalPages: number
    }
}

export interface Search {
    filters?: { [property: string]: any }
    page: number
    limit: number
}


export interface PaginationData<T> {
    rows: T[]
    meta: {
        page: number,
        limit: number,
        totalRows: number,
        totalPages: number
    }
}

export interface IBrand {
    id?: string
    desc: string
}

export interface IProduct {
    id?: string
    desc: string
    stock: number
    minStock: number
    unit: number
    brand?: IBrand
    purchasePrice: Decimal
    salePrice: Decimal
    readonly createdAt: Date
}

export interface IAddress {
    id: string
    zipcode: string
    street: string
    neighborhood: string
    city: string
    state: string
}

export interface ICustomer {
    id: string
    name: string
    tel: string
    cel: string
    cpf: string
    email: string
    addressNumber: string
    comments: string
    complement: string
    address: IAddress
    readonly createdAt: Date
}

export interface IUser {
    id?: string
    email: string
    username: string
    password: string
    role: number
    avatarImg: string
    readonly createdAt: string
}

export interface ITask {
    id?: string
    desc: string
    price: Decimal
}

export interface IEquipment {
    id?: string
    desc: string
    model: string
    brand: IBrand

}