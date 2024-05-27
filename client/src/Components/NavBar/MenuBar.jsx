import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';

import './NavBar.css'
import  SideBar  from './SideBar';
import { removeToken } from "../../Authorization/authSlice"
import apiSlice from '../../app/apiSlice';
import useAuth from "../../hooks/useAuth";


export default function TemplateDemo(props) {

    const {isUserLoggedIn} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()
    var items=[];
    const itemRenderer = (item) => (
        <Link to={item.url}>

            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>

            {/* {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>} */}
         
        </Link>
    );
if(permission=='admin')
{
     items = [
                {
                    label: 'מוזמנים לבוא להתלקק',
                    icon: 'pi pi-map-marker',
                    url: '/Branch'
                },
        
                {
                    label: 'המתוקים שלנו',
                    icon: 'pi pi-bars',
                    url: '/Sweet'
                },
        
                {
                    label: 'העובדים החרוצים שלנו',
                    icon: 'pi pi-users',
                    url: '/Worker'
                },  
                
                // {
                //     label: 'לקוחותינו',
                //     icon: 'pi pi-user',
                //     url: '/Client'
                // },
        
                // {
                //     label: 'הודעות',
                //     icon: 'pi pi-comment',
                //     url: '/Messege'
                // },
        
                {
                    label: ' הזמנות ',
                    icon: 'pi pi-shopping-bag',
                    url: '/Order'
                },

                {
                    label: 'לאיזור האישי ',
                    icon: 'pi pi-user',
                    items: [
                        
                        {
                            label: 'הרשמה',
                            icon: 'pi pi-user-plus',
                            badge: 3,
                            url: '/RegisterClient'

                        },
                        {
                            label: 'התחברות',
                            icon: 'pi pi-sign-in',
                            badge: 2,
                            url: '/Login'
                        },

                        {
                            label: 'התנתקות',
                            icon: 'pi pi-sign-out',
                            badge: 2,
                            url: '/Logout'
                        },
                    ]
                }

            ];
        }
        else
        {
            if(permission=='client')
            {
                items = [
                    {
                        label: 'מוזמנים לבוא להתלקק',
                        icon: 'pi pi-map-marker',
                        url: '/Branch'
                    },
            
                    {
                        label: 'המתוקים שלנו',
                        icon: 'pi pi-bars',
                        url: '/Sweet'
                    },
            
            
                    // {
                    //     label: 'הודעות',
                    //     icon: 'pi pi-comment',
                    //     // template: itemRenderer,
                    //     url: '/Messege'
                    // },
            
                    {
                        label: ' הזמנות ',
                        icon: 'pi pi-shopping-bag',
                        url: '/Order'
                    },
                    {
                        label: 'הסל שלי',
                        icon:"pi pi-shopping-cart",
                        url: '/Basket'
                    },
    
                    {
                        label: 'לאיזור האישי ',
                        icon: 'pi pi-user',
                        items: [
                            
                            {
                                label: 'הרשמה',
                                icon: 'pi pi-user-plus',
                                badge: 3,
                                url: '/RegisterClient'
    
                            },
                            {
                                label: 'התחברות',
                                icon: 'pi pi-sign-in',
                                badge: 2,
                                url: '/Login'
                            },
    
                            {
                                label: 'התנתקות',
                                icon: 'pi pi-sign-out',
                                badge: 2,
                                url: '/Logout'
                            },
                        ]
                    }
                ];
            }
            else
            {
                items = [
                    {
                        label: 'מוזמנים לבוא להתלקק',
                        icon: 'pi pi-map-marker',
                        url: '/Branch'
                    },
            
                    {
                        label: 'המתוקים שלנו',
                        icon: 'pi pi-bars',
                        url: '/Sweet'
                    },
            
                    {
                        label: 'לאיזור האישי ',
                        icon: 'pi pi-user',
                        items: [
                            
                            {
                                label: 'הרשמה',
                                icon: 'pi pi-user-plus',
                                badge: 3,
                                url: '/RegisterClient'
    
                            },
                            {
                                label: 'התחברות',
                                icon: 'pi pi-sign-in',
                                badge: 2,
                                url: '/Login'
                            },
    
                            {
                                label: 'התנתקות',
                                icon: 'pi pi-sign-out',
                                badge: 2,
                                url: '/Logout'
                            },
                        ]
                    },
                    
    
                ];
            }
            
        }

    const start = <a href='/'><img alt="logo" src="../images/logo.png" height="40" className="mr-2"></img></a>;

    const end = (
        <div className="flex align-items-center gap-2">
            <SideBar/>
        </div>
    );

    const handleLogoutClick = () =>{
    dispatch(removeToken())
    dispatch(apiSlice.util.resetApiState())
    navigate("/Login")
    }

    return (
        <div className="navbar">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
      