import { useRef, createContext, useState } from "react";
import { Outlet } from 'react-router';

let signalR = require('@microsoft/signalr')

const connection = new signalR.HubConnectionBuilder()
.withUrl(`/userWs`)
.build();

export const AdminContext = createContext(connection)

async function helloWs()
{
    await connection.start()
    .catch((err) => console.log(err))
}

export default function UserWs() {
    let t = 0

    helloWs();

    return (
        <AdminContext.Provider value={connection}>
            <div>
                <Outlet/>
            </div>
        </AdminContext.Provider>
    );
}