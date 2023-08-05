import React, { useState } from 'react'
import "./users.scss"
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbar, } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable'
import Add from '../../components/add/Add';
import {useQuery} from "@tanstack/react-query"
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'img', headerName: 'Avatar', width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"
      } />
      }
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },

  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
   
  ];
const Users = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:8800/api/users").then(
        (res) => res.json()
      )
  })
  console.log(data);
  return (
    <div className='users'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>setOpen(true)}>Add new User</button>
      </div>
      {isLoading ? (
        "Loading...") :
        (<DataTable slug="users" columns={columns} rows={data} />)}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Users