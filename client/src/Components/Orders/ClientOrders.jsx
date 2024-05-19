import React, { useState, useEffect, useRef } from 'react';

import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { useGetOrderByIdClientQuery } from '../../app/orderApiSlice'
import useAuth from "../../hooks/useAuth";

function ClientOrders() {

  const { _id, username, permission, name, email, phone, isAdmin, isClient, isWorker, isShiftManager } = useAuth()
  const { data: orders = [], isLoading, isError, error, isSuccess } = useGetOrderByIdClientQuery(_id)

  const [activeIndex, setActiveIndex] = useState(0);

  const [createdAt, setCreatedAt] = useState(null);
  const [sweets, setSweets] = useState([]);
  const [address, setAddress] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [status, setStatus] = useState(null);


  useEffect(() => {
    if (isSuccess)
      console.log("orders", orders);
    else
      console.log("loading");

  }, [isSuccess]);

  const findLatestOrder = () => {
    if (orders.length === 0) {
      return null;
    }
    const sortedOrders = [...orders];
    const latestOrder = sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    setCreatedAt(latestOrder.createdAt)
    setSweets(latestOrder.sweets)
    setAddress(latestOrder.address)
    setBranchId(latestOrder.branchId)
    setStatus(latestOrder.status)

    console.log("latestOrder", latestOrder);
    return latestOrder;
  }


  // setLastOrder(findLatestOrder())


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

  const [tabs] = useState([
    {
      header: 'תאריך ביצוע',
      children: <p className="m-0">{createdAt}</p>
    },
    {
      header: 'מוצרים שהוזמנו',
      children: <p className="m-0">{sweets}</p>
    },
    {
      header: 'כתובת למשלוח',
      children: <p className="m-0">{address}</p>
    },
    {
      header: 'סניף ממנו בוצעה ההזמנה',
      children: <p className="m-0">{branchId}</p>
    },
    {
      header: 'סטטוס הזמנה',
      children: <p className="m-0">{status}</p>
    }
  ]);

  const createDynamicTabs = () => {
    // findLatestOrder()
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
        <Card title="הזמנה פתוחה" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
          <br />
          <Steps model={items} activeIndex={activeIndex} readOnly={true} className="m-2 pt-4" /><br /><br /><br />
          <Accordion>{createDynamicTabs()}</Accordion>
        </Card>
      </div>
    </div>
  );
}

export default ClientOrders;