import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
//import { FileUpload } from 'primereact/fileupload';
//import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';
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
  }, [resCreate])


  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [checked, setChecked] = useState(false);

  
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([{street:''},{building:''}]);
  const [openHours, setOpenHours] = useState([{open:''},{close:''}]);
  const [image, setImage] = useState("")


  const [id, setId] = useState(0)


  const [isEdit, setIsEdit] = useState(false);

  const openNew = () => {
    //setProduct(sweets);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {

    setCity("")
    setLocation("")
    setOpenHours(null)
    // setImage("")

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

    if (city !== "" && openHours.open !== null && openHours.close !== null && location.street !== "" && location.building !== "") {

      if (isEdit) {
        console.log("id " + id);
        updateBranch({ id, city, openHours,location,image })

        setCity("")
        setLocation("")
        setOpenHours(null)
        // setImage("")

        //setExtras(rowData.extras)
        setId(0)
        setIsEdit(false)
      }

      else {
        createBranch({ city, openHours, location,image})

        setCity("")
        setLocation("")
        setOpenHours(null)
        // setImage("")

        setId(0)
        setIsEdit(false)
       
      }
      setProductDialog(false);
    }
  };

  const editProduct = (rowData) => {
    //setProduct({ ...product });
    //UpdateSweet(id)
    setIsEdit(true)
    setProductDialog(true);

    setCity(rowData.city)
    setLocation(rowData.location.street)
    setLocation(rowData.location.building)
    setOpenHours(rowData.openHours.open)
    setOpenHours(rowData.openHours.close)
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

  

  // const onInputChange = (e, name) => {
  //   const val = (e.target && e.target.value) || '';
  //   let _product = { ...product };

  //   _product[`${name}`] = val;

  //   setProduct(_product);
  // };

  // const onInputNumberChange = (e, name) => {
  //   const val = e.value || 0;
  //   let _product = { ...product };

  //   _product[`${name}`] = val;

  //   setProduct(_product);
  // };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="הוסף מוצר" icon="pi pi-plus" severity="success" onClick={openNew} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button label="Export" icon="pi pi-upload" className="p-button-help" style={{ backgroundColor: '#ec4899' }} onClick={exportCSV} />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />
      // <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />

    );
  };

  // const ratingBodyTemplate = (rowData) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.inInventory} severity={getSeverity(rowData.inInventory)} ></Tag>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2"
          onClick={() => editProduct(rowData)} />
        {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
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
      <h2 className="m-0">ניהול סניפים</h2>
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
  
  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}  ></Toolbar>
        <DataTable  ref={dt}  value={branches}  onSelectionChange={(e) => setSelectedProducts(e.value)}  style={{ opacity: 1 }}  dataKey="id" paginator  rows={10}  rowsPerPageOptions={[5, 10, 25]}  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"  globalFilter={globalFilter}  header={header}  >
          <Column field="city" header="עיר" sortable style={{ minWidth: '16rem' }} ></Column>
          <Column field="location" header="כתובת" sortable style={{ minWidth: '16rem' }} ></Column>
          <Column field="image" header="תמונה" body={imageBodyTemplate} ></Column>
          <Column field="openHours" header="שעות פתיחה" style={{ minWidth: '8rem' }} ></Column>
          {/* <Column  field="category"  header="Category"  sortable style={{ minWidth: '10rem' }}  ></Column> */}
          {/* <Column field="rating" header="Reviews"//body={ratingBodyTemplate} sortablestyle={{ minWidth: '12rem' }} ></Column> */}
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}  ></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog} >
        {image && (
          <img src={`https://primefaces.org/cdn/primereact/images/product/${image}`} alt={image} className="product-image block m-auto pb-3"/>
        )}
        <div className="field">
          <label htmlFor="city" className="font-bold">עיר</label>
          <InputText  id="city"  value={city}  onChange={(e) => setCity(e.target.value)}  required  autoFocus  className={classNames({ 'p-invalid': submitted && city !== " " })} />
          {submitted && !city !== " " && (<small className="p-error">City is required.</small>)}

        </div>
        <div className="field">
          <label htmlFor="location" className="font-bold"> מיקום</label>
          <InputText id="location1" value={location.street} onChange={(e) => setLocation(e.target.value)} required rows={3} cols={20} />
          <InputNumber id="location2" value={location.building} onChange={(e) => setLocation(e.target.value)} required rows={3} cols={20}/>
        </div>

        <div className="field">
          {/* <label className="mb-3 font-bold">Category</label> */}
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              {/* <RadioButton inputId="category1"  name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'}/>
              <label htmlFor="category1">Accessories</label> */}
            </div>
            {/* <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category2"
                name="category"
                value="Clothing"
                onChange={onCategoryChange}
                checked={product.category === 'Clothing'}
              />
              <label htmlFor="category2">Clothing</label> 
            {/* </div> */}
            {/* <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category3"
                name="category"
                value="Electronics"
                onChange={onCategoryChange}
                checked={product.category === 'Electronics'}
              />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category4"
                name="category"
                value="Fitness"
                onChange={onCategoryChange}
                checked={product.category === 'Fitness'}
              />
              <label htmlFor="category4">Fitness</label>
            </div>*/}
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="openHours" className="font-bold">שעות פתיחה  </label>
           <div className="flex-auto">
                <label htmlFor="buttondisplay" className="font-bold block mb-2">
                    שעות פתיחה
                </label>
                <Calendar id="openHours1" value={openHours.open} onChange={(e) => setOpenHours(e.target.value)} showIcon timeOnly  icon={() => <i className="pi pi-clock" />} />
                <Calendar id="openHours2" value={openHours.close} onChange={(e) => setOpenHours(e.target.value)} showIcon timeOnly  icon={() => <i className="pi pi-clock" />} />
            </div> 
            {/* <InputNumber id="openHours" value={openHours} onValueChange={(e) => setOpenHours(e.target.value)} mode="currency" /> */}
          </div>
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}  >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {(<span>
            Are you sure you want to delete this branch?
          </span>)}
        </div>
      </Dialog>


      
    </div>
  );
}
