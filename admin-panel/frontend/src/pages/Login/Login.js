import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import "./Login.css";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/store/slice";

const Login = () => {
    const dispatch = useDispatch();
    const defaultValues = {
        email: "",
        password: "",
        role: "Admin"
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        dispatch(authUser(data));
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div>
                    <h3 className="text-center">Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: "Email is required.", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address. E.g. example@email.com" } }}
                                    render={({ field, fieldState }) => <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />}
                                />
                                <label htmlFor="email" className={classNames({ "p-error": !!errors.email })}>
                                    Email*
                                </label>
                            </span>
                            {getFormErrorMessage("email")}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: "Password is required." }} render={({ field, fieldState }) => <Password id={field.name} {...field} toggleMask className={classNames({ "p-invalid": fieldState.invalid })} feedback={false} />} />
                                <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                                    Password*
                                </label>
                            </span>
                            {getFormErrorMessage("password")}
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
