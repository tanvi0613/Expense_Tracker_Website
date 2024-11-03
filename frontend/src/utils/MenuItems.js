import {dashboard, addCategory, transactions, categories} from '../utils/icons'
export const menuItems = [
    {
        id: 1,
        title: 'DashBoard',
        icon:dashboard,
        link:'/dashboard'
    },
    {
        id: 2,
        title: 'Add Category',
        icon:addCategory,
        link:'/addCategory'
    },
    {
        id: 3,
        title: 'Categories',
        icon:categories,
        link:'/categories'
    },
    {
        id: 4,
        title: 'Add Transaction',
        icon: transactions,
        link:'/add-transaction'
    }
]