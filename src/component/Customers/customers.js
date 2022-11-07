import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  SimpleShowLayout,
  Show,
  ShowButton,
  BooleanField,
  BooleanInput,
  useCreate,
  DateInput,
  NumberInput,
  useNotify,
  useRedirect,
  useGetList,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
} from "react-admin";
import { Favorite } from "@mui/icons-material";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { CustomerFilterSideBar } from "./customerfiltersidebar";
import { uuidv4 } from "@firebase/util";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "react-router-dom";

// const CustomerDeleteButton = ({ data }) => {
//   const handleClick = async () => {
//     deleteDoc(doc(db, "customers", data.id));
//     const recordsQuery = query(
//       collection(db, "records"),
//       where("customer_id", "==", data.id)
//     );
//     const records = await getDocs(recordsQuery);
//     records.forEach((record) => {
//       deleteDoc(doc(db, "records", record.id));
//     });
//   };
//   return (
//     <>
//       <button
//         className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall ra-delete-button css-kgj096-MuiButtonBase-root-MuiButton-root-RaButton-root-RaDeleteWithUndoButton-root"
//         tabindex="0"
//         type="button"
//         aria-label="Delete"
//         record="[object Object]"
//         onClick={handleClick}
//       >
//         <span className="MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon">
//           <svg
//             className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
//             focusable="false"
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             data-testid="DeleteIcon"
//           >
//             <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
//           </svg>
//         </span>
//         Delete
//         <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
//       </button>
//     </>
//   );
// };

const CustomerList = () => {
  // const { data, isLoading } = useGetList("customers");
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // let display;
  // console.log(data);
  // if (isLoading) return null;
  // if (data.length !== 0) {
  //   display = (
  //     <List aside={<CustomerFilterSideBar />}>
  //       {/* {isSmall ? (
  //             <SimpleList
  //               primaryText={(record) => record.name}
  //               secondaryText={(record) => record.address}
  //             />
  //           ) : ( */}
  //       {/* {data.map((record) => ( */}
  //       <Datagrid rowClick="edit">
  //         <TextField source="name" />
  //         <TextField source="address" />
  //         <BooleanField source="paid" />
  //         <ShowButton basePath="/customers" />
  //         <EditButton basePath="/customers" />
  //         <CustomerDeleteButton />
  //       </Datagrid>
  //       {/* ))} */}
  //       {/* )} */}
  //     </List>
  //   );
  // } else {
  //   if (isMedium) {
  //     display = (
  //       <div id="main-content" className="RaLayout-content">
  //         <div className="list-page css-127wpz9-RaList-root">
  //           <span className="css-1q4buqb-RaEmpty-root">
  //             <div className="RaEmpty-message">
  //               <svg
  //                 className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium RaEmpty-icon css-i4bv87-MuiSvgIcon-root"
  //                 focusable="false"
  //                 aria-hidden="true"
  //                 viewBox="0 0 24 24"
  //                 data-testid="InboxIcon"
  //               >
  //                 <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path>
  //               </svg>
  //               <p className="MuiTypography-root MuiTypography-h4 MuiTypography-paragraph css-afagg-MuiTypography-root">
  //                 No Customer yet.
  //               </p>
  //               <p className="MuiTypography-root MuiTypography-body1 css-ifhp4k-MuiTypography-root">
  //                 Do you want to add one?
  //               </p>
  //             </div>
  //             <div className="RaEmpty-toolbar">
  //               <a
  //                 className="MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeLarge MuiFab-primary MuiFab-root MuiFab-circular MuiFab-sizeLarge MuiFab-primary RaCreateButton-floating css-iav1u9-MuiButtonBase-root-MuiFab-root-RaCreateButton-root"
  //                 tabindex="0"
  //                 aria-label="Create"
  //                 href="/customers/create"
  //               >
  //                 <svg
  //                   className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
  //                   focusable="false"
  //                   aria-hidden="true"
  //                   viewBox="0 0 24 24"
  //                   data-testid="AddIcon"
  //                 >
  //                   <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  //                 </svg>
  //                 <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
  //               </a>
  //             </div>
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     display = (
  //       <div id="main-content" className="RaLayout-content">
  //         <div className="list-page css-127wpz9-RaList-root">
  //           <span className="css-1q4buqb-RaEmpty-root">
  //             <div className="RaEmpty-message">
  //               <svg
  //                 className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium RaEmpty-icon css-i4bv87-MuiSvgIcon-root"
  //                 focusable="false"
  //                 aria-hidden="true"
  //                 viewBox="0 0 24 24"
  //                 data-testid="InboxIcon"
  //               >
  //                 <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path>
  //               </svg>
  //               <p className="MuiTypography-root MuiTypography-h4 MuiTypography-paragraph css-afagg-MuiTypography-root">
  //                 No Customer yet.
  //               </p>
  //               <p className="MuiTypography-root MuiTypography-body1 css-ifhp4k-MuiTypography-root">
  //                 Do you want to add one?
  //               </p>
  //             </div>
  //             <div className="RaEmpty-toolbar">
  //               <a
  //                 className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall css-1cbn6aq-MuiButtonBase-root-MuiButton-root-RaButton-root"
  //                 tabindex="0"
  //                 aria-label="Create"
  //                 href="/customers/create"
  //               >
  //                 <span className="MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon">
  //                   <svg
  //                     className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
  //                     focusable="false"
  //                     aria-hidden="true"
  //                     viewBox="0 0 24 24"
  //                     data-testid="AddIcon"
  //                   >
  //                     <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  //                   </svg>
  //                 </span>
  //                 Create
  //                 <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
  //               </a>
  //             </div>
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
  // return <>{display}</>;
  return (
    <List>
       {/* aside={<CustomerFilterSideBar />} */}
      {/* {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.address}
        />
      ) : ( */}
      {/* {data.map((record) => ( */}
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="address" />
        <ShowButton basePath="/customers" />
        <EditButton basePath="/customers" />
        <DeleteButton basePath="/customers" />
      </Datagrid>
      {/* ))} */}
      {/* )} */}
    </List>
  );
};

const CustomerShow = () => (
  <Show>
    <SimpleShowLayout>
      <BooleanField
        source="paid"
        valueLabelTrue="Paid"
        valueLabelFalse="Unpaid"
      />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
    </SimpleShowLayout>
  </Show>
);

// const notify = useNotify();
// const [create] = useCreate();
// const id = uuidv4();
// const redirect = useRedirect();
// const postSave = (customerdata) => {
//   create(
//     "customers",
//     {
//       data: {
//         id: id,
//         user_id: auth.currentUser.uid,
//         name: customerdata.name,
//         address: customerdata.address,
//         paid: customerdata.paid,
//       },
//     },
//     {
//       onError: (error) => {
//         notify(`Customer create error: ${error.message}`, {
//           type: "warning",
//         });
//       },
//     }
//   );
//   create(
//     "records",
//     {
//       data: {
//         customer_id: id,
//         from: customerdata.from,
//         to: customerdata.to,
//         amount: customerdata.amount,
//       },
//     },
//     {
      // onSuccess: (data) => {
      //   redirect("/customers");
      //   notify("Customer Create Successfully !", {
      //     type: "success",
      //     undoable: false,
      //   });
      // },
//       onError: (error) => {
//         notify(`Customer create error: ${error.message}`, {
//           type: "warning",
//         });
//       },
//     }
//   );
// };
//   return (
// <Create title="Creat a Customer" redirect="list">
//   <SimpleForm>
//     <ReferenceInput source="user_id" reference="users">
//       <TextInput
//         disabled
//         source="user_id"
//         defaultValue={auth.currentUser.uid}
//       />
//     </ReferenceInput>
//     <TextInput source="name" label="Customer Name" />
//     <TextInput source="address" label="Customer Address" />
//   </SimpleForm>
// </Create>
//   );
// };
const CustomerCreate = (props) => {
  const notify = useNotify();
  const [create] = useCreate();
  const id = uuidv4();
  const redirect = useRedirect();
  const createCustomerAndGenerateRecords = (customerdata) => {
    create(
      "customers",
      {
        data: {
          id: id,
          user_id: auth.currentUser.uid,
          name: customerdata.name,
          address: customerdata.address,
        },
      },
      {
        onError: (error) => {
          notify(`Customer create error: ${error.message}`, {
            type: "warning",
          });
        },
      }
    );

    const arr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    try {
      arr.forEach((myarr) => {
        create("records", {
          data: {
            user_id: auth.currentUser.uid,
            customer_id: id,
            month: myarr,
            paid: false,
            amount: 0,
          },
        });
      });
      redirect("/customers");
      notify("Customer Create Successfully !", { type: "success" });
    } catch (error) {
      notify(error, { type: "warning" });
    }
  };
  return (
    <Create title="Creat a Customer" {...props}>
      <SimpleForm onSubmit={createCustomerAndGenerateRecords}>
        <TextInput source="name" label="Customer Name" />
        <TextInput source="address" label="Customer Address" />
      </SimpleForm>
    </Create>
  );
};

const CustomerEdit = (props) => (
  <Edit title="Edit a Customer" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);

export { CustomerEdit, CustomerCreate, CustomerList, CustomerShow };
