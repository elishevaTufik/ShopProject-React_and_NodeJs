import { Route, Routes } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import  myStore  from './Store/Store';
import TemplateDemo from './Components/NavBar/MenuBar'
import NotFound from './Components/NotFound';


const LazyHome = React.lazy(() => import("./Components/HomePage"))
const LazyBranch = React.lazy(() => import("./Components/Branches/Branch"))
const LazyClient = React.lazy(() => import("./Components/Clients/Client"))
const LazyMessege = React.lazy(() => import("./Components/Messeges/Messege"))
const LazyOrder = React.lazy(() => import("./Components/Orders/Order"))
const LazyConfirmOrder = React.lazy(() => import("./Components/Orders/ConfirmOrder"))
const LazySweet = React.lazy(() => import("./Components/Sweets/Sweet"))
const LazyWorker = React.lazy(() => import("./Components/Workers/Worker"))
const LazyBasket = React.lazy(() => import("./Components/Basket/Basket"))
const LazyLogin = React.lazy(() => import("./Components/Enter/Login"))
const LazyLogout = React.lazy(() => import("./Components/Enter/Logout"))
const LazyRegisterClient = React.lazy(() => import("./Components/Enter/RegisterClient"))
const LazyRegisterWorker = React.lazy(() => import("./Components/Workers/RegisterAdmin"))
const LazyEditWorkers = React.lazy(() => import("./Components/Workers/EditWorkers"))

function App() {
  
  return (
    <div className="App">
      <Provider store={myStore}>
      <TemplateDemo/>
          <Routes>
            <Route path='/' element={<Suspense fallback="Loading..."><LazyHome/></Suspense> } />
            <Route path='/Branch' element={<Suspense fallback="Loading..."><LazyBranch/></Suspense>} />
            <Route path='/Client' element={<Suspense fallback="Loading..."><LazyClient/></Suspense>} />
            <Route path='/Messege' element={<Suspense fallback="Loading..."><LazyMessege/></Suspense>} />
            <Route path='/Order' element={<Suspense fallback="Loading..." ><LazyOrder/></Suspense>} /> 
            <Route path='/ConfirmOrder' element={<Suspense fallback="Loading..." ><LazyConfirmOrder/></Suspense>} />
            <Route path='/Sweet' element={<Suspense fallback="Loading..." ><LazySweet/></Suspense>} />
            <Route path='/Worker' element={<Suspense fallback="Loading..." ><LazyWorker/></Suspense>} />
            <Route path='/Basket' element={<Suspense fallback="Loading..." ><LazyBasket/></Suspense>} />
            <Route path='/Login' element={<Suspense fallback="Loading..." ><LazyLogin/></Suspense>} />
            <Route path='/Logout' element={<Suspense fallback="Loading..." ><LazyLogout/></Suspense>} />
            <Route path='/RegisterClient' element={<Suspense fallback="Loading..." ><LazyRegisterClient/></Suspense>} />
            <Route path='/RegisterWorker' element={<Suspense fallback="Loading..." ><LazyRegisterWorker/></Suspense>} />
            <Route path='/EditWorkers' element={<Suspense fallback="Loading..." ><LazyEditWorkers/></Suspense>} />
            <Route path='/*' element={<NotFound/>} />
          </Routes> 
       </Provider>
    </div>
  );
}
export default App;