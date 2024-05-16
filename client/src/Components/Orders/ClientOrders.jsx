import React, { useState, useEffect, useRef } from 'react';

import { Steps } from 'primereact/steps';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';

import { useGetOrderByIdClientQuery } from '../../app/orderApiSlice'
import useAuth from "../../hooks/useAuth";

//import './ClientOrders.css'

function ClientOrders() {

  const { _id, username, permission, name, email, phone, isAdmin, isClient, isWorker, isShiftManager } = useAuth()
  const { data, isLoading, isError, error, isSuccess } = useGetOrderByIdClientQuery(_id)

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isSuccess)
      console.log(data);
    else
      console.log("loading");

  }, [isSuccess]);

  const itemRenderer = (item, itemIndex) => {

    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
    const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

    return (
      <>        

        <span
          className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-8rem w-8rem z-1 cursor-pointer"
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
      //pi-star-fill
      text: '  התקבל  ',//accepted
      template: (item) => itemRenderer(item, 0)
    },
    {
      icon: 'pi pi-truck',
      text: '  בדרך אליך  ',//done
      template: (item) => itemRenderer(item, 1)
    },
    {
      icon: 'pi pi-thumbs-up',
      text: '  הזמנה הושלמה  ',//closed
      template: (item) => itemRenderer(item, 2)
    }
  ];

  const findLatestOrder = (orders) => {
    if (orders.length === 0) {
      return null;
    }
    const latestOrder = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return latestOrder;
  }

  return (
    <div className="Order">
      <br />
      <div className="card">
        <Steps model={items} activeIndex={activeIndex} readOnly={true} className="m-2 pt-4" />
      </div>
    </div>
  );
}

export default ClientOrders;