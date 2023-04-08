import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn,Percent
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Products', icon: Box, type: 'sub', active: false, children: [
            { path: '/products/category', title: 'Category', type: 'link' },
            { path: '/products/sub-category', title: 'Sub-Category', type: 'link' },
            { path: '/products/product-list', title: 'Product List', type: 'link' },
            { path: '/products/add-product', title: 'Add Product', type: 'link' },
        ]
    },
    {
        title: 'Brands',path:'/brands/list-brands', icon: Users, type: 'link', active: false
    },
    {
        title: 'Collections',path:'/collections/list-collections', icon: AlignLeft, type: 'link', active: false
        
    },
    {
        title: 'discounts',path:'/discounts/list-discounts', icon: Percent, type: 'link', active: false
        
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        ]
    },
    {
        title: 'Logout',path:'/auth/logout', icon: LogIn, type: 'link', active: false
    }
]
