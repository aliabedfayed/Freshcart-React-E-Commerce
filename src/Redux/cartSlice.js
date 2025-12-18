import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../interceptors/axiosInstance";

const initialState = {
    cartItems: [],
    cartCount: 0,
    cartPrice: 0,
    cartId: null,
    isCartLoading: false,
    error: null
}

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async function (productId) {
        const res = await axiosInstance.post("/cart", {
            productId
        })
        return res.data
    }
)

export const getUserCart = createAsyncThunk(
    "cart/getUserCart",
    async function () {
        const res = await axiosInstance.get("/cart")
        return res.data
    }
)

export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async function (productId) {
        const res = await axiosInstance.delete("/cart/" + productId)
        return res.data
    }
)

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async function ({ productId, count }) {
        const res = await axiosInstance.put("/cart/" + productId, {
            count
        })
        return res.data
    }
)

export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async function () {
        const res = await axiosInstance.delete("/cart")
        return res.data
    }
)

// CheckOut Api
export const onlinePayment = createAsyncThunk(
    "cart/onlinePayment",
    async (shippingAddress, { getState }) => {
        const { cartId } = getState().cartRed;

        const res = await axiosInstance.post(`/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
            shippingAddress
        })
        return res.data
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.cartItems = []
            state.cartCount = 0
            state.cartPrice = 0
            state.cartId = null
        }
    },
    extraReducers: (builder) => {
        // add to cart
        builder.addCase(addToCart.pending, (state) => {
            state.isCartLoading = true;
        })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isCartLoading = false;
                state.cartCount = action.payload.numOfCartItems;
                state.cartPrice = action.payload.data.totalCartPrice;
                state.cartId = action.payload.data._id;
                toast.success(`${action.payload.message}`)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isCartLoading = false;
                toast.error(`${action.payload.data?.message}`)
            })
            // get user cart
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.data.products;
                state.cartCount = action.payload.numOfCartItems;
                state.cartPrice = action.payload.data.totalCartPrice;
                state.cartId = action.payload.data._id;
            })
            //remove item
            .addCase(removeItem.pending, (state) => {
                state.isCartLoading = true
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.isCartLoading = false
                state.cartItems = action.payload.data.products;
                state.cartCount = action.payload.numOfCartItems;
                state.cartPrice = action.payload.data.totalCartPrice;
                toast.success("Item removed successfully")
            })
            //update cart
            .addCase(updateCart.pending, (state) => {
                state.isCartLoading = true
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isCartLoading = false
                state.cartItems = action.payload.data.products;
                state.cartCount = action.payload.numOfCartItems;
                state.cartPrice = action.payload.data.totalCartPrice;
                toast.success("Cart updated successfully")
            })
            //clear cart
            .addCase(clearCart.pending, (state) => {
                state.isCartLoading = true
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.isCartLoading = false
                state.cartItems = [];
                state.cartCount = 0;
                state.cartPrice = 0;
                state.cartId = null;
                toast.success("Cart cleared successfully")
            })
            //online payment
            .addCase(onlinePayment.fulfilled, (state, action) => {
                window.location.href = action.payload.session.url
            })
            .addCase(onlinePayment.rejected, (state, action) => {
                console.log("Payment failed:", action.payload || action.error);
                toast.error(action.payload || "Payment failed");
            })

    }
})

export const { resetCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer

