import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
//import { FileUpload } from 'primereact/fileupload';
//import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import "primeflex/primeflex.css"


import { useGetAllBranchesQuery } from '../../app/branchApiSlice'
import { useCreateBranchMutation } from '../../app/branchApiSlice';
import { useDeleteBranchMutation } from '../../app/branchApiSlice';
import { useUpdateBranchMutation } from '../../app/branchApiSlice';


export default function BranchAdmin() {

  const { data: branches = [], something } = useGetAllBranchesQuery()
  const [createBranch, resCreate] = useCreateBranchMutation()
  const [deleteBranch] = useDeleteBranchMutation()
  const [updateBranch] = useUpdateBranchMutation()

  useEffect(() => {
    if (resCreate.isError) {
      alert(resCreate.error)
    }
    if (resCreate.isSuccess) {
      alert()
    }
    console.log(resCreate)

  }, [resCreate])


  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  
const changeOpen=(e)=>
{
  debugger
}
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [checked, setChecked] = useState(false);

  
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [close, setClose] = useState("00:00");
  const [open,setOpen]=useState("00:00")
  const [image, setImage] = useState("")
  const [id, setId] = useState(0)


  const [isEdit, setIsEdit] = useState(false);
const s="22:22"
  const openNew = () => {
    //setProduct(sweets);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {

    setCity("")
    setLocation("")
    setOpen()
    setClose()
    setChecked(0)
    setImage("")
    setId(0)

    setIsEdit(false)
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  
  const saveProduct = () => {
    setSubmitted(true);
    if (city !== "" && location !== "") {
    // if (city !== "" && open!== null && close !== null && location !== "") {
      console.log("updateBranch");
      if (isEdit) {
        
        updateBranch({id,city,open,close,location,image})
      
        setCity("")
        setOpen("00:00")
        setClose("00:00")
        setLocation("")
        setImage("")
        setId(0)
        setIsEdit(false)
      }

      else {
        createBranch({ city, location,image,open,close})
        setCity("")
        setLocation("")
        setOpen("00:00")
        setClose("00:00")
        setImage("")
        setId(0)
        
      }
      setProductDialog(false);
    }
  };

  const editProduct = (rowData) => {
    setIsEdit(true)
    setProductDialog(true);
    setCity(rowData.city)
    setLocation(rowData.location)
    setOpen(rowData.open)
    setClose(rowData.close)
    setImage(rowData.image)
    setId(rowData._id)
  };

  const confirmDeleteProduct = (id1) => {
    setId(id1)
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    deleteBranch(id)
    setDeleteProductDialog(false);
    //   toast.current.show({
    //   severity: 'success',
    //   summary: 'Successful',
    //   detail: 'Product Deleted',
    //   life: 3000,
    // });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="הוסף סניף" icon="pi pi-plus" severity="success" onClick={openNew} style={{backgroundColor:'#ce9149', border:'1px solid #ce9149'}} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button label="Export" icon="pi pi-upload" className="p-button-help" style={{ backgroundColor: '#ec4899' }} onClick={exportCSV} />
    );
  };

  const imageBodyTemplate = (rowData) => {
    console.log("rowData.image");
        console.log(rowData.image);
        //../public/images/3.jpg
        return <img src={`images/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2"  onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData._id)} />
      </React.Fragment>
    );
  };

  const getSeverity = (inInventory) => {
    switch (inInventory) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between" style={{ textAlign: 'center' }}>
      <h2 style={{textAlign:'center'}} className="m-0">ניהול סניפים</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText  type="search"  onInput={(e) => setGlobalFilter(e.target.value)}  placeholder="Search..."  />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
  );
  console.log("branches",branches);
return (
    
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}  ></Toolbar>
        <DataTable  ref={dt}  value={branches}   style={{ opacity: 1 }}  dataKey="id" paginator  rows={10}  rowsPerPageOptions={[5, 10, 25]}  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"  globalFilter={globalFilter}  header={header}  >
          <Column field="city" header="עיר" sortable style={{ minWidth: '16rem' }} ></Column>
          <Column field="location" header="כתובת" sortable style={{ minWidth: '16rem' }} ></Column>
          <Column field="open" header="שעת פתיחה" style={{ minWidth: '8rem' }} ></Column>
          <Column field="close" header="שעת סגירה" style={{ minWidth: '8rem' }} ></Column>
          <Column field="image"  body={imageBodyTemplate} ></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}  ></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '32rem', textAlign:'center'}} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי הסניף" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog} >
        {/* {image && (
          <img src={`https://primefaces.org/cdn/primereact/images/product/${image}`} alt={image} className="product-image block m-auto pb-3"/>
        )} */}
        <div className="field">
          <label htmlFor="city" className="font-bold">עיר</label>
          <InputText  id="city"  value={city}  onChange={(e) => setCity(e.target.value)}  required  autoFocus  className={classNames({ 'p-invalid': submitted && city !== " " })} />
          {submitted && !city !== " " && (<small className="p-error">City is required.</small>)}

        </div>
        <div className="field">
          <label htmlFor="location" className="font-bold"> מיקום</label>
          <InputText id="location1" value={location} onChange={(e) => setLocation(e.target.value)} required rows={3} cols={20} />
        </div>
        <div className="formgrid grid">
          <div className="field col">
           <div className="flex-auto">
               <label htmlFor="openHours" className="font-bold">שעת פתיחה  </label>
                <Calendar id="open" value={new Date('October 13, 2014 '+open+':00')} onChange={(e)=>setOpen(""+e.target.value.getHours()+":"+e.target.value.getMinutes())} showIcon timeOnly  icon={() => <i className="pi pi-clock" />} />
                <label htmlFor="buttondisplay" className="font-bold block mb-2">שעת סגירה</label>
                <Calendar id="close" value={new Date('October 13, 2014 '+close+':00')} onChange={(e) => setClose(""+e.target.value.getHours()+":"+e.target.value.getMinutes())} showIcon timeOnly  icon={() => <i className="pi pi-clock" />}/>
            </div> 
                <div className="field">
                    <label htmlFor="image" className="font-bold">
                        תמונה
                    </label>
                    <InputText id="image" value={image} onChange={(e) =>setImage(e.target.value)} className={classNames({ 'p-invalid':  image=="" })} />
                </div>
          </div>
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}  >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {(<span>
            ?האם אתה בטוח שאתה רוצה למחוק סניף זה
          </span>)}
        </div>
      </Dialog>


      
    </div>
  );
}
