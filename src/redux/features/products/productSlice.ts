import {createSlice } from "@reduxjs/toolkit";

export type ProductType = {
    thumbnail: string;
    id: number;
    images: [];
    description: string;
    title: string;
    stock: number;
    price: number;
    rating: number;
    discountPercentage: number;
    brand: string;
    reviews: [];
    weight : number;
    category: string;
    dimensions : {};
    returnPolicy : string;
    warrantyInformation : string;
    shippingInformation : string;
    availabilityStatus : string;
  };

type InitialStateType = {
    products : ProductType[],
    loading : boolean,
    error : string | null
}

const initialState : InitialStateType = {
    products : [],
    loading : false,
    error : "",
}

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
        addProduct : (state , action)=>{
            if(state.products.some((items)=>items.id === action.payload.id)){
                return
            }else{
                const previousItems = JSON.parse(localStorage.getItem("cartProducts") || "[]")

                localStorage.setItem("cartProducts" , JSON.stringify([...previousItems,action.payload]))
                state.products.push(action.payload)
            }
            console.log(state.products)
        },

        deleteProducts : (state , action)=>{
            const getStorage = JSON.parse(localStorage.getItem("cartProducts") || "[]")
            const filteredProducts = getStorage.filter((item : ProductType)=>item.id !== action.payload)
            console.log("Filtered Products >>>>>", filteredProducts);

            localStorage.setItem("cartProducts" , JSON.stringify(filteredProducts))
            state.products = filteredProducts
            console.log("state >>>>>" , state.products)
        },
        
        fetchProducts : (state)=>{
            state.products = JSON.parse(localStorage.getItem("cartProducts") || "[]")
        }
    },
})

export default productSlice.reducer
export const {addProduct , fetchProducts , deleteProducts} = productSlice.actions
