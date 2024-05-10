import { DataTable } from "primereact/datatable";

import { Column } from "primereact/column";
import AuthLayout from "../AuthLayout";

const UserView = () => {
  const products = [
    { code: "P001", name: "Product 1", category: "Category A", quantity: 10 },
    { code: "P002", name: "Product 2", category: "Category B", quantity: 20 },
    { code: "P003", name: "Product 3", category: "Category A", quantity: 15 },
    { code: "P004", name: "Product 4", category: "Category C", quantity: 5 },
    { code: "P005", name: "Product 5", category: "Category B", quantity: 30 },
  ];

  const sendEmail1 = () => {};
  return (
    <AuthLayout>
      <div>
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">User Listing</h4>
          </div>
        </div>
        <div>
          {/* <button className="btn btn-success p-3" onClick={sendEmailToSelected}>Send Email </button> */}
          <button className="btn btn-success p-3" onClick={() => sendEmail1()}>
            Send Email{" "}
          </button>
          {/* <Link to="/add-avatar" className="btn btn-success p-3">Add Avatar</Link> */}
        </div>
        <div className="datatable-doc-demo">
          <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: "70rem" }}>
              <Column
                field="code"
                header="Full Name"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="name"
                header="Name"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="category"
                header="Email  "
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="quantity"
                header="Quantity"
                sortable
                style={{ width: "25%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserView;
