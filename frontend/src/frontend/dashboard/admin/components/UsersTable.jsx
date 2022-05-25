import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link, useNavigate } from 'react-router-dom';

export default function UsersTable({ users }) {
  
  let navigate = useNavigate();

  const userdetails = (id) => {
    navigate(`/user/${id}`)
  }

  var data = users?.users?.filter((e) => e.role === "user");

  var rows = [];

  data?.forEach((e, i) => {
    rows.push({
      SNO: i + 1,
      email: e.email,
      kycStatus: e.kycStatus,
      action: <Link to={`/user/${e._id}`} state={{name: "User Kyc Details"}}>view</Link>,
    });
  });

  const columns = [
    {
      label: "SNO",
      field: "SNO",
      width: 100,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "SNO",
      },
    },
    {
      label: "Email",
      field: "email",
      width: 200,
    },
    {
      label: "Kyc Status",
      field: "kycStatus",
      width: 200,
    },
    {
      label: "Action",
      field: "action",
      width: 200,
    },
  ];

  // const [datatable, setDatatable] = React.useState({
  //   columns: columns,
  //   rows: rows,
  // });

  const datatable = {
    columns: columns,
    rows: rows,
  }

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      searchTop
      searchBottom={false}
    />
  );
}
