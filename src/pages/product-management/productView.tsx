import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import AuthLayout from "../AuthLayout";
import { Link } from "react-router-dom";
import { getStore } from "../../../api/getStores";
import { Dropdown } from "primereact/dropdown";

interface Product {
  _id: string;
  image: string;
  name: string;
  shortCode: string;
  priceInTokens: number;
  itemType: string;
  createdAt: string;
  updatedAt: string;
  inUse: boolean;
  owned: boolean;
  __v: number;
}

const coloumns = [
  { name: "Short Code", code: "shortCode" },
  { name: "Name", code: "name" },
  { name: "Price", code: "price" },
  { name: "Item Type", code: "itemType" },
  { name: "image", code: "image" },
];

export default function DetailView() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (params: any) => {
    try {
      const res = await getStore(params);
      const responseData = res.data.data;
      setProducts(responseData);
      setPage(res.data.page);
    } catch (error) {
      console.log(error);
    }
  };
  const emptyProduct: Product = {
    _id: "",
    image: "",
    name: "",
    shortCode: "",
    priceInTokens: 0,
    itemType: "",
    createdAt: "",
    updatedAt: "",
    inUse: false,
    owned: false,
    __v: 0,
  };

  const [sort, setSort] = useState(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Product[]>>(null);
  const [page, setPage] = useState();
  const [first, setFirst] = useState(0);
  const [params, setParams] = useState({
    search: globalFilter,
    page: 1,
  });
  
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    multiSortMeta: [],
    search:globalFilter
  });



  useEffect(() => {
    fetchData(lazyState);
  }, [lazyState]);

  // const onPageChange = async (event) => {
  //   try {
  //     const nextPage = event.page + 1;
  //     console.log(nextPage);

  //     setParams((prev) => ({
  //       ...prev,
  //       page: nextPage,
  //     }));
  //     setFirst(event.first);

  //     // Fetch products for the next page
  //     // const response = await getStore(nextPage);
  //     // const responseData = response.data.data;
  //     // setProducts(responseData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const formatCurrency = (value: number) => {
    return value;
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
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

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product._id) {
        const index = findIndexById(product._id);

        _products[index] = _product;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product._id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: Product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val._id !== product._id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: string) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = (): string => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: RadioButtonChangeEvent) => {
    let _product = { ...product };

    _product["name"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;
    setProduct(_product);
  };

  const onInputTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value ?? 0;
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Link to={"/product-management/create"}>
          {" "}
          <Button
            label="New"
            icon="pi pi-plus"
            className="btn-success p-3"
            severity="success"
            onClick={openNew}
          />{" "}
        </Link>
        {/* <Button label="Delete" className=' btn-danger p-3' icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help btn-success p-3"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img
        src={"abc.ing"}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const priceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.priceInTokens);
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil  "
          outlined
          className="mr-2 btn-warning rounded-md p-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="bg-red-600 p-2 rounded-md"
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
            setLazyState((prev) => ({
              ...prev,
              search: target.value,
            }));
          }}
        />
      </IconField>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Primary"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Danger" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        className="btn btn-success mr-2"
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        className="btn btn-danger"
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const onSort = (event) => {
    const { multiSortMeta } = lazyState;


    const { multiSortMeta: newMultiSortMeta } = event;
    const updatedMultiSortMeta = [...multiSortMeta];
    newMultiSortMeta.forEach((sortMeta) => {
      const existingMetaIndex = updatedMultiSortMeta.findIndex(
        (meta) => meta.field === sortMeta.field
      );
      if (existingMetaIndex !== -1) {
        const existingMeta = updatedMultiSortMeta[existingMetaIndex];
        if (existingMeta.order === 1) {
          existingMeta.order = -1; // Change to descending order
        } else if (existingMeta.order === -1) {
          updatedMultiSortMeta.splice(existingMetaIndex, 1); // Remove sort meta for unsorting
        }
      } else {
        updatedMultiSortMeta.push(sortMeta); // Add new sort meta
      }
    });
    setLazyState({ ...lazyState, multiSortMeta: updatedMultiSortMeta });
  };

  const onPage = (event) => {
    setLazyState(event);
  };

  return (
    <AuthLayout>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <div>
          <div className="card w-50 mb-4 flex justify-content-center">
            <label> Sort </label>
            <Dropdown
              style={{ border: "10rem" }}
              value={sort}
              onChange={(e) => setSort(e.value)}
              options={coloumns}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </div>

          <DataTable
            value={products}
            lazy
            dataKey="_id"
            paginator
            first={lazyState.first}
            rows={10}
            totalRecords={page?.totalDocs}
            onPage={onPage}
            // sortMode="multiple"
            sortMode="multiple"
            onSort={onSort}
            multiSortMeta={lazyState.multiSortMeta}
            // sortField={lazyState.sortField }
            // sortOrder={lazyState.sortOrder}

            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate=" PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
            currentPageReportTemplate="Showing {totalRecords} products"
            header={header}
          >
            <Column exportable={false}></Column>
            <Column
              field="shortCode"
              header="ShortCode"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="image"
              header="Image"
              body={imageBodyTemplate}
            ></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="itemType"
              header="itemType"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>

            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
          <div className="card">
            {/* <Paginator first={first}  rows={10} totalRecords={page?.totalDocs} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} /> */}
          </div>
        </div>

        <Dialog
          visible={productDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Product Details"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          {product.image && (
            <img
              src={"abc.img"}
              alt={product.image}
              className="product-image block m-auto pb-3"
            />
          )}
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.name}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                onInputTextAreaChange(e, "description")
              }
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="field">
            <label className="mb-3 font-bold">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Accessories"
                  onChange={onCategoryChange}
                  checked={product.name === "Accessories"}
                />
                <label htmlFor="category1">Accessories</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Clothing"
                  onChange={onCategoryChange}
                  checked={product.name === "Clothing"}
                />
                <label htmlFor="category2">Clothing</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="category"
                  value="Electronics"
                  onChange={onCategoryChange}
                  checked={product.name === "Electronics"}
                />
                <label htmlFor="category3">Electronics</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="category"
                  value="Fitness"
                  onChange={onCategoryChange}
                  checked={product.name === "Fitness"}
                />
                <label htmlFor="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price" className="font-bold">
                Price
              </label>
              <InputNumber
                id="price"
                value={product.priceInTokens}
                onValueChange={(e) => onInputNumberChange(e, "price")}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div className="field col">
              <label htmlFor="quantity" className="font-bold">
                Quantity
              </label>
              <InputNumber
                id="quantity"
                value={product.priceInTokens}
                onValueChange={(e) => onInputNumberChange(e, "quantity")}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content flex items-center">
            <i
              className="pi pi-exclamation-triangle mr-3 -3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </AuthLayout>
  );
}
