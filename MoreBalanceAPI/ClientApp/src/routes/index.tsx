import { createBrowserRouter } from "react-router-dom";
import { People } from "../pages/People";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Transactions } from "../pages/Transactions";
import { ConsolidatedAccounts } from "../pages/ConsolidatedAccounts";
import { Categorys } from "../pages/Categorys";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <People /> },
            { path: '/transactions', element: <Transactions /> },
            { path: '/categorys', element: <Categorys /> },
            { path: '/consolidatedAccounts', element: <ConsolidatedAccounts /> }
        ],
    },
]);