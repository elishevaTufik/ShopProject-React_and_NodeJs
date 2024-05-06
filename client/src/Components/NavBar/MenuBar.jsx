//https://primereact.org/menubar/
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
                    // template: itemRenderer,
                    url: '/Branch'
                },
        
                {
                    label: 'המתוקים שלנו',
                    icon: 'pi pi-bars',
                    // template: itemRenderer,
                    url: '/Sweet'
                },
        
                {
                    label: 'העובדים החרוצים שלנו',
                    icon: 'pi pi-users',
                    // template: itemRenderer,
                    url: '/Worker'
                },  
                
                {
                    label: 'לקוחותינו',
                    icon: 'pi pi-user',
                    // template: itemRenderer,
                    url: '/Client'
                },
        
                {
                    label: 'הודעות',
                    icon: 'pi pi-comment',
                    // template: itemRenderer,
                    url: '/Messeg'
                },
        
                {
                    label: ' הזמנות ',
                    icon: 'pi pi-shopping-bag',
                    // template: itemRenderer,
                    url: '/Order'
                },

                {
                    label: 'לאיזור האישי ',
                    icon: 'pi pi-palette',
                    items: [
                        
                        {
                            label: 'הרשמה',
                            icon: 'pi pi-palette',
                            badge: 3,
                            // template: itemRenderer,
                            url: '/RegisterClient'

                        },
                        {
                            label: 'התחברות',
                            icon: 'pi pi-palette',
                            badge: 2,
                            // template: itemRenderer,
                            url: '/Login'
                        },

                        {
                            label: 'התנתקות',
                            icon: 'pi pi-palette',
                            badge: 2,
                            // template: itemRenderer,
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
                        // template: itemRenderer,
                        url: '/Branch'
                    },
            
                    {
                        label: 'המתוקים שלנו',
                        icon: 'pi pi-bars',
                        // template: itemRenderer,
                        url: '/Sweet'
                    },
            
            
                    {
                        label: 'הודעות',
                        icon: 'pi pi-comment',
                        // template: itemRenderer,
                        url: '/Messeg'
                    },
            
                    {
                        label: ' הזמנות ',
                        icon: 'pi pi-shopping-bag',
                        // template: itemRenderer,
                        url: '/Order'
                    },
                    {
                        label: 'הסל שלי',
                        icon:"pi pi-shopping-cart",
                        url: '/Basket'
                    },
    
                    {
                        label: 'לאיזור האישי ',
                        icon: 'pi pi-palette',
                        items: [
                            
                            {
                                label: 'הרשמה',
                                icon: 'pi pi-palette',
                                badge: 3,
                                // template: itemRenderer,
                                url: '/RegisterClient'
    
                            },
                            {
                                label: 'התחברות',
                                icon: 'pi pi-palette',
                                badge: 2,
                                // template: itemRenderer,
                                url: '/Login'
                            },
    
                            {
                                label: 'התנתקות',
                                icon: 'pi pi-palette',
                                badge: 2,
                                // template: itemRenderer,
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
                        // template: itemRenderer,
                        url: '/Branch'
                    },
            
                    {
                        label: 'המתוקים שלנו',
                        icon: 'pi pi-bars',
                        // template: itemRenderer,
                        url: '/Sweet'
                    },
            
                    {
                        label: 'לאיזור האישי ',
                        icon: 'pi pi-palette',
                        items: [
                            
                            {
                                label: 'הרשמה',
                                icon: 'pi pi-palette',
                                badge: 3,
                                // template: itemRenderer,
                                url: '/RegisterClient'
    
                            },
                            {
                                label: 'התחברות',
                                icon: 'pi pi-palette',
                                badge: 2,
                                // template: itemRenderer,
                                url: '/Login'
                            },
    
                            {
                                label: 'התנתקות',
                                icon: 'pi pi-palette',
                                badge: 2,
                                // template: itemRenderer,
                                url: '/Logout'
                            },
                        ]
                    },
                    
    
                ];
            }
            
            
        }

    const start = <img alt="logo" src="../images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );

    const handleLogoutClick = () =>{
    dispatch(removeToken())
    dispatch(apiSlice.util.resetApiState())
    navigate("/Login")
    }

    return (
        <div className="MenuBar">
            <Menubar model={items} start={start} end={end} />
            {/* {isUserLoggedIn &&  <a onClick={handleLogoutClick} > Logout </a> } */}

        </div>
    )
}
      