

export interface login{
    username: string,
        password: string,
        expiresInMins: number,
}

export interface loginResponse{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    token: string,
    refreshToken:string

}

export interface product{
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[],
    brand: string,
    availabilityStatus: string,
    reviews: review[],
    minimumOrderQuantity: number,
    images: string[],
    thumbnail: string
    }


    export interface review{
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
    }

    export interface AllProducts{
        products:product[]
    }

