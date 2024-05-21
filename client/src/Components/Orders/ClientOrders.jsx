import React, { useState, useEffect, useRef } from 'react';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';

import CancelOrder from "./CancelOrder"
import ClientAllOrders from "./ClientAllOrders";
import { useGetOrderByIdClientQuery } from '../../app/orderApiSlice'
import useAuth from "../../hooks/useAuth";
import { Navigate } from 'react-router-dom';

function ClientOrders() {

  const { _id, username, permission, name, email, phone, isAdmin, isClient, isWorker, isShiftManager } = useAuth()
  const { data: orders = [], isLoading, isError, error, isSuccess } = useGetOrderByIdClientQuery(_id)

  const emptyObject = {
    address: "a",
    branchId: "b",
    clientId: "a",
    createdAt: "c",
    status: "d",
    sweets: [],
    updatedAt: "a",
    _v: "s",
    _id: "s"
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const [last, setLast] = useState(emptyObject);

  useEffect(() => {
    if (isSuccess) {
      const arrStauses = ["accepted", "done", "closed"]
      const a = findLatestOrder()
      setLast(a)
      setTabs([
        {
          header: 'תאריך ביצוע',
          children: <p className="m-0">{`${new Date(a.createdAt).getDate()}-${new Date(a.createdAt).getMonth() + 1}-${new Date(a.createdAt).getFullYear()}`}</p>
        },
        {
          header: 'מוצרים שהוזמנו',
          children: <p className="m-0">{a.sweets}</p>
        },
        {
          header: 'כתובת למשלוח',
          children: <p className="m-0">{a.address}</p>
        },
        {
          header: 'סניף ממנו בוצעה ההזמנה',
          children: <p className="m-0">{ }</p>
        },
        {
          header: 'סטטוס הזמנה',
          children: <p className="m-0">{a.status}</p>
        }
      ])
      setActiveIndex(arrStauses.indexOf(a.status))

    }
    else
      console.log("loading");

  }, [isSuccess]);

  const findLatestOrder = () => {
    if (orders.length === 0) {
      return null;
    }
    const sortedOrders = [...orders];
    const latestOrder = sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    return latestOrder;
  }

  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
    const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';
    return (
      <>
        <span
          className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-6rem w-6rem z-1 cursor-pointer"
          style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
          onClick={() => setActiveIndex(itemIndex)}>
          <i className={`${item.icon} text-xl`} />
          <br />
          <div style={{ marginTop: '-20px', color: textColor }}>{item.text}</div>
        </span>
      </>
    );
  };


  const items = [
    {
      icon: 'pi pi-credit-card',
      // text: '  התקבל  ',//accepted
      template: (item) => itemRenderer(item, 0)
    },
    {
      icon: 'pi pi-truck',
      // text: '  בדרך אליך  ',//done
      template: (item) => itemRenderer(item, 1)
    },
    {
      icon: 'pi pi-thumbs-up',
      // text: '  הזמנה הושלמה  ',//closed
      template: (item) => itemRenderer(item, 2)
    }
  ];

  const [tabs, setTabs] = useState([
    {
      header: 'תאריך ביצוע',
      children: <p className="m-0">{last.createdAt}</p>
    },
    {
      header: 'מוצרים שהוזמנו',
      children: <p className="m-0">{last.sweets}</p>
    },
    {
      header: 'כתובת למשלוח',
      children: <p className="m-0">{last.address}</p>
    },
    {
      header: 'סניף ממנו בוצעה ההזמנה',
      children: <p className="m-0">{ }</p>
    },
    {
      header: 'סטטוס הזמנה',
      children: <p className="m-0">{last.address}</p>
    }
  ]);

  const createDynamicTabs = () => {

    return tabs.map((tab, i) => {
      return (
        <AccordionTab key={tab.header} header={tab.header} disabled={tab.disabled}>
          {tab.children}
        </AccordionTab>
      );
    });
  };

  return (
    <div className="Order">
      <br />
      <div className="card">
        <p style={{ textAlign: 'center', color: '#ffffff', backgroundColor: '#ec4899', width: '20%', textAlign: 'center', marginLeft: '40%', borderRadius: '10px', opacity: '0.7', fontSize: '150%' }}>
          <br />ההזמנות שלי<br /><br />
        </p>
        <Card title="ההזמנה האחרונה שלך" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
          <Steps model={items} activeIndex={activeIndex} readOnly={true} className="m-2 pt-4" /><br />
          <Accordion>{createDynamicTabs()}</Accordion>
          <CancelOrder lastId={last._id}/>
        </Card>
        <ClientAllOrders />
      </div>

    </div>
  );
}

export default ClientOrders;
