import React, { useState } from "react";
import style from "./AddPayMethod.module.scss";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../Common/Toast/Toast";
export default function AddPayMethod() {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false)

  const [cardInfo, setCardInfo] = useState({
    name: "",
    expiry: "",
    number: "",
    cvc: "",
    address: {
      line: "",
      postalCode: "",
    },
  });

  const user = useSelector((state) => state?.reducer?.registerUser?.data);
  const customer_id = user?.customer_id;
  const plan_id = user?.plan_id;

  function handleChange(e) {
    setCardInfo((prev) => {
      return { ...prev, name: e.value };
    });
  }

  async function handleSubmit() {
    setIsLoading(true)
    try {
      stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement),
        })
        .then((resp) => {
          const payment_method_id = resp?.paymentMethod?.id;
          const formData = {
            customer_id,
            payment_method_id,
            price_id: plan_id,
          };
          if (payment_method_id) {
            try {
              axios({
                url: "https://cp1.invexwealth.com/api/v2/users/paymentAttach",
                method: "POST",
                data: formData,
                headers: { "Access-Control-Allow-Origin": "*" },
              })
                .then((res) => {
                  if (res?.data?.status) {
                    setIsLoading(false)
                    toastNotify(res.message, "success");
                    navigate("/login");
                  }
                })
                .catch((err) => toastNotify(err.message, "error"));
            } catch (err) {
              setIsLoading(false)
              toastNotify(err.message, "error");
            }
          }
        });
    } catch (err) {
      setIsLoading(false)
      /* Handle Error*/
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.innerWrapper}>
        <div className={style.row}>
          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Enter Card Holder Name"
            value={cardInfo.name}
          />
        </div>
        <div className={style.rowPaymentInput}>
          <CardNumberElement value={cardInfo.number} />
        </div>
        <div className="row">
          <div className="col-6">
            <div className={style.rowPaymentInput}>
              <CardCvcElement value={cardInfo.cvc} />
            </div>
          </div>
          <div className="col-6">
            <div className={style.rowPaymentInput}>
              <CardExpiryElement
                value={cardInfo.expiry}
              />
            </div>
          </div>
        </div>

        <div className={style.addressWrapper}>
          <div className={style.btnContainer}>
            <button disabled={isLoading} onClick={handleSubmit}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
