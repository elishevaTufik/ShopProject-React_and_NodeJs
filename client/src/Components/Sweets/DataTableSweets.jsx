import React, { useState, useEffect, useRef } from 'react';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";




import "primeflex/primeflex.css"

import { useGetAllSweetsQuery } from '../../app/sweetsApiSlice'
import { useCreateNewSweetMutation } from '../../app/sweetsApiSlice'
import { useDeleteSweetMutation } from '../../app/sweetsApiSlice'
import { useUpdateSweetMutation } from '../../app/sweetsApiSlice'

import './DataTableSweets.css'

export default function ProductsDemo() {

    const { data: sweets = [], something } = useGetAllSweetsQuery()
    const [CreateNewSweet, resCreate] = useCreateNewSweetMutation()
    const [DeleteSweet, resDelete] = useDeleteSweetMutation()
    const [UpdateSweet, resUpdate] = useUpdateSweetMutation()

    useEffect(() => {
        if (resCreate.isError) {
            alert(resCreate.error)
        }
        if (resCreate.isSuccess) {
        }
        console.log(resCreate)
    }
        , [resCreate])


    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const [checked, setChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [extras, setExtras] = useState([]);
    const [inInventory, setInInventory] = useState(false);
    const [id, setId] = useState(0);
    const [image, setImage] = useState("");

    const [isEdit, setisEdit] = useState(false);

    const onChangeCheckBox = (checked) => {
        setChecked(checked)
        setInInventory(checked)
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ILS' });
    };

    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setPrice(0)
        setName("")
        setDescription("")
        setInInventory(false)
        setId(0)
        setImage("")

        setisEdit(false)
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (name != "" && price != 0 && description != "") {
            if (isEdit) 
                UpdateSweet({ id, price, name, description, extras, image, inInventory })
         
            else 
                CreateNewSweet({ price, name, description, extras, image, inInventory })

            setPrice(0)
        }
        setName("")
        setDescription("")
        setImage("")
        setInInventory(false)
        setId(0)
        setisEdit(false)
        setProductDialog(false);
    };

    const editProduct = (rowData) => {
        setPrice(rowData.price)
        setName(rowData.name)
        setDescription(rowData.description)
        setImage(rowData.image)
        setInInventory(rowData.inInventory)
        setId(rowData._id) 
        setisEdit(true)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (id1) => {
        setId(id1)
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        DeleteSweet(id)
        setDeleteProductDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        setDeleteProductsDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="הוסף מוצר חדש" icon="pi pi-plus" severity="success" onClick={openNew} style={{ backgroundColor: '#ce9149', border: '1px solid #ce9149' }} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} style={{ backgroundColor: '#ec4899', border: '1px solid #ec4899' }} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/${rowData.image}`} alt={rowData.image} className="border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inInventory} severity={getSeverity(rowData.inInventory)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        {
        }
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <s style={{ color: '#ffffff' }}> . . . </s>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => { confirmDeleteProduct(rowData._id) }} />
            </React.Fragment>
        );
    };

    const getSeverity = (inInventorys) => {
        switch (inInventorys) {
            case true:
                return 'success';

            case false:
                return 'danger';
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" style={{ "textAlign": 'center' }}>
            <h1 className="m-0">ניהול מוצרים </h1>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <div className="flex gap-3">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText v-model="value1"  onInput={(e) => setGlobalFilter(e.target.value)} placeholder="...חיפוש" />
                    </IconField>
                </div>
               
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמירה" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div >
            <br /><br /><br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={sweets}
                    style={{ opacity: 1 }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מראה {first} - {last} מתוך {totalRecords} מוצרים" globalFilter={globalFilter} header={header}>
                    <Column field="name" header="שם" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="description" header="תיאור" style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate}></Column>
                    <Column field="price" header="מחיר" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="תוספות"></Column>
                    <Column field="inventoryStatus" header="?במלאי" body={statusBodyTemplate}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי מוצר" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם מוצר
                    </label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus className={classNames({ 'p-invalid': name == "" })} />
                    {submitted && name == "" && <small className="p-error">Name is required</small>}
                </div><br /><br />

                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        תיאור
                    </label>
                    <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} cols={20} />
                </div><br /><br />

                <div className="field">
                    <label htmlFor="image" className="font-bold">
                        תמונה
                    </label>
                    <InputText id="image" value={image} onChange={(e) => setImage(e.target.value)} className={classNames({ 'p-invalid': image == "" })} />
                </div><br /><br />

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            מחיר
                        </label>
                        <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.target.value)} mode="currency" currency="ILS" locale="en-US" />
                    </div><br /><br />

                    <div className="field col">
                        <label htmlFor="inInventory" className="font-bold"> ?במלאי </label>
                          <br/>
                          <br/>
                        <Checkbox value={inInventory} onChange={e => onChangeCheckBox(e.checked)} checked={inInventory}></Checkbox>
                    </div><br /><br />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {(
                        <span>
                           ?האם אתה בטוח שאתה רוצה למחוק אותי 
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
