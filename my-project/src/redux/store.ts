import { configureStore } from "@reduxjs/toolkit";

import { getallproductSLice } from "./slices/dashboard/productsslice/getallproducts";
import { oneproducttSlice } from "./slices/dashboard/productsslice/getoneproduct";
import { creatingproductSlice } from "./slices/dashboard/productsslice/createproduct";

import { updatingproductSlice } from "./slices/dashboard/productsslice/updateproduct";
import { removeproductSlice } from "./slices/dashboard/productsslice/removeproduct";
import { retoreproductSLice } from "./slices/dashboard/productsslice/restoreproduct";
import { getallcategoriesfn, getallcategoriesSLice } from "./slices/dashboard/categoryslices/getallcategories";
import { trashproductslice } from "./slices/dashboard/productsslice/trashproduct";
import { getonecategoriesslice } from "./slices/dashboard/categoryslices/getonecategory";
import { creatingcategoryslice } from "./slices/dashboard/categoryslices/createcategory";
import { updatingcategoryslice } from "./slices/dashboard/categoryslices/updatecategory";
import { trashcategoryslice } from "./slices/dashboard/categoryslices/trashcategory";
import { restorecategoryslice } from "./slices/dashboard/categoryslices/restorecategory";
import { removecategoryslice } from "./slices/dashboard/categoryslices/removecategory";
import { getallorderSlice } from "./slices/dashboard/orderslices/getallorders";
import { getoneorderSlice } from "./slices/dashboard/orderslices/getoneorder";
import { creatingorderslice } from "./slices/dashboard/orderslices/createorder";
import { updatingorderslice } from "./slices/dashboard/orderslices/updateorder";
import { removeorderslice } from "./slices/dashboard/orderslices/removeorder";
import { restoreorderslice } from "./slices/dashboard/orderslices/restoreorder";
import { trashorderslice } from "./slices/dashboard/orderslices/trashorder";
import { getallsupplierslice } from "./slices/dashboard/suppliers/getallsuppliers";
import { getonelsupplierslice } from "./slices/dashboard/suppliers/getonesupplier";
import { creatingsuppplierslice } from "./slices/dashboard/suppliers/createsuppliers";
import { updatingsupplierslice } from "./slices/dashboard/suppliers/updatesupplier";
import { removesupplierslice } from "./slices/dashboard/suppliers/removesupplier";
import { retoresupplierslice } from "./slices/dashboard/suppliers/restoresupplier";
import { trashsupplierslice } from "./slices/dashboard/suppliers/trashsupplier";
import { getallinquiryslice } from "./slices/dashboard/inquiries/getallinquires";
import { getoneinquiryslice } from "./slices/dashboard/inquiries/getoneinquiry";
import { creatinginquiryslice } from "./slices/dashboard/inquiries/createinquiry";
import { updatinginquiryslice } from "./slices/dashboard/inquiries/updateinquiry";
import { trashinquiryslice } from "./slices/dashboard/inquiries/trashinquiry";
import { restoreinquiryslice } from "./slices/dashboard/inquiries/restoreinuqiry";
import { removeinquiryslice } from "./slices/dashboard/inquiries/removeinquiry";
import { getallreviewslice } from "./slices/dashboard/reviewss/getallreview";
import { getonereviewfn, getonereviewslice } from "./slices/dashboard/reviewss/getonereview";
import { creatingreviewslice } from "./slices/dashboard/reviewss/createreview";
import { updatingreviewslice } from "./slices/dashboard/reviewss/updatereview";
import { removereviewslice } from "./slices/dashboard/reviewss/removereview";
import { restorereviewslice } from "./slices/dashboard/reviewss/restorereview";
import { trashreviewslice } from "./slices/dashboard/reviewss/trashreview";

export const store = configureStore({
    reducer : {
     
        // product
        getallproduct: getallproductSLice.reducer,
        oneproduct: oneproducttSlice.reducer,
        create: creatingproductSlice.reducer,
        update:updatingproductSlice.reducer,
        remove: removeproductSlice.reducer,
        restore:retoreproductSLice.reducer,
        trash: trashproductslice.reducer,

        // category
        getallcategory: getallcategoriesSLice.reducer,
        onecategory: getonecategoriesslice.reducer,
        createcategory:  creatingcategoryslice.reducer,
        updatecategory: updatingcategoryslice.reducer,
        removecategory: removecategoryslice.reducer,
        restorecategory: restorecategoryslice.reducer,
        trashcategory: trashcategoryslice.reducer,


        // orders
        getallorder: getallorderSlice.reducer,
        getoneorder:  getoneorderSlice.reducer,
        createorder: creatingorderslice.reducer,
        updatingorder: updatingorderslice.reducer,
        removeorder: removeorderslice.reducer,
        restoreorder: restoreorderslice.reducer,
        trashorder:trashorderslice.reducer,
        
        // suppliers
        getallsuppliers:  getallsupplierslice.reducer,
        getonesuppliers: getonelsupplierslice.reducer,
        createsupplier: creatingsuppplierslice.reducer,
        updatingsupplier:  updatingsupplierslice.reducer,
        removesupplier:  removesupplierslice.reducer,
        restoresupplier:  retoresupplierslice.reducer,
        trashsupplier: trashsupplierslice.reducer,


        // inquiry
        getallinquiry :  getallinquiryslice.reducer,
        getoneinquiry: getoneinquiryslice.reducer,
        createinquiry: creatinginquiryslice.reducer,
        updateinquiry: updatinginquiryslice.reducer,
        removeinquiry:  removeinquiryslice.reducer,
        restoreinquiry:  restoreinquiryslice .reducer,
        trashinquiry: trashinquiryslice.reducer,

        // review
        getallreview:  getallreviewslice.reducer,
        getonereview: getonereviewslice .reducer,
        createreview:  creatingreviewslice.reducer,
        updatereview:  updatingreviewslice .reducer,
        removereview:  removereviewslice.reducer,
        restorereview: restorereviewslice.reducer,
        trashreview: trashreviewslice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // useSelector
export type AppDispatch = typeof store.dispatch; // useDispatch