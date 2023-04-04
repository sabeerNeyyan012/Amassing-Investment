import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";
import Payment from "./Payment";
import { Card } from "@mui/material";
import UserDetails from "./UserDetails";

const promise = loadStripe("pk_test_51LqzaKJti4dpn8HSFTeeHyONdR1p7H5cxDFyHypr7NYMHkWCuZm48JTmTNeljIs7l9llKm9U9p2dNyIgyqf6t4li00ud5IEIyU");

export default function PaymentMethod() {
    return (
        <Card className="card" style={{ marginTop: '30%' }}>
            <div className="row" >
                <div className="col-6">
                    <UserDetails />
                </div>
                <div className="col-6">
                    <Elements stripe={promise}>
                        <Payment />
                    </Elements>
                </div>
            </div>
        </Card>
    );
}