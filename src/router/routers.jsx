import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import ManageTutorial from '../pages/ManagePages/tutorial/index'
import Login from '../pages/Login'
import Report from '../pages/ReportPages'
import ErrorPage from '../pages/ErrorPage'
import StatisticBoard from '../pages/Statistic'
import ProtectedRouter from './protectedRouter'
import Feedback from '../pages/Feedback'
import { getAllTutorials } from '../api/tutorial.api'
import { getAllFeedbacks, getAllReports, getStatistics } from '../api/admin.api'
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouter><Dashboard /></ProtectedRouter>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "statistic",
                element: <ProtectedRouter><StatisticBoard /></ProtectedRouter>,
                loader: async () => await getStatistics()
            },
            {
                path: "manage/tutorial",
                element: <ProtectedRouter><ManageTutorial /></ProtectedRouter>,
                loader: async () => await getAllTutorials()
            },
            {
                path: "report",
                element: <ProtectedRouter><Report /></ProtectedRouter>,
                loader: async () => await getAllReports()
            }, {
                path: "feedback",
                element: <ProtectedRouter><Feedback /></ProtectedRouter>,
                loader: async () => await getAllFeedbacks()
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
])
export default function MyRouter() {
    return (
        <RouterProvider router={router} />
    )
}
