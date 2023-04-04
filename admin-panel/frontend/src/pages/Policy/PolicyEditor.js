import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicyDetails, setSelectedPolicy, updatePolicyDetails } from '../../redux/store/slice';
import { Toolbar } from 'primereact/toolbar';
import parse from 'html-react-parser';
import { Dropdown } from 'primereact/dropdown';


const PolicyEditor = () => {
    const dispatch = useDispatch();
    const selectedPolicy = useSelector((state)=>state?.reducer?.selectedPolicy);
    const [value, setValue] = useState(selectedPolicy === null ? '' : selectedPolicy);
    const [updatedValue, setUpdatedValue] = useState();
    const [edit, setEdit] = useState(false);
    const [sortKey, setSortKey] = useState(null);
    const policyDetails = useSelector((state) => state?.reducer?.viewPolicy);

    const sortOptions = [
        { label: 'Cookie Policy', value: 'CookiePolicy' },
        { label: 'Privacy Policy', value: 'PrivacyPolicy' },
        { label: 'Refund Policy', value: 'RefundPolicy' },
        { label: 'Terms and Conditions', value: 'TermsNConditionsPolicy' },
    ];

    
    const handleUpdate = () => {
        if (selectedPolicy === "CookiePolicy"){
            dispatch(updatePolicyDetails({cookiepolicy:value}));
        } else if(selectedPolicy === "PrivacyPolicy"){
            dispatch(updatePolicyDetails({privacyPolicy:value}));
        } else if(selectedPolicy === "RefundPolicy"){
            dispatch(updatePolicyDetails({refundPolicy:value}));
        } else if(selectedPolicy === "TermsNConditionsPolicy"){
            dispatch(updatePolicyDetails({termsAndCondition:value}));
        }
        setEdit(false);
    }

    useEffect(() => {
        dispatch(fetchPolicyDetails()) //policy page
    }, [selectedPolicy])


        useEffect(()=>{
            if (selectedPolicy === "CookiePolicy"){
                setValue(policyDetails?.cookiepolicy);
            } else if(selectedPolicy === "PrivacyPolicy"){
                setValue(policyDetails?.privacyPolicy);
            } else if(selectedPolicy === "RefundPolicy"){
                setValue(policyDetails?.refundPolicy);
            } else if(selectedPolicy === "TermsNConditionsPolicy"){
                setValue(policyDetails?.termsAndCondition);
            }
            
        },[selectedPolicy])

    const leftContents = (
        <React.Fragment>
            <Dropdown value={selectedPolicy} options={sortOptions} optionLabel="label" placeholder="Select a policy page" onChange={(e) => dispatch(setSelectedPolicy(e.value))} className="mr-4" />
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            {edit ? (
                <React.Fragment>
                    <Button label="Cancel" className="p-button-danger mr-3" style={{ backgroundColor: 'red' }} onClick={() => setEdit(false)} />
                    <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={() => handleUpdate()} />
                </React.Fragment>
            ) : (
                <Button label="Edit" icon="pi pi-pencil" className="p-text" onClick={() => setEdit(true)} />
            )}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className='card'>
                <Toolbar style={{ backgroundColor: 'none' }} left={leftContents} right={rightContents} className="mb-3" />
                {!edit ? (
                    <div className="p-3">
                        {parse(value)}
                    </div>
                ) : (
                    <React.Fragment>
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                        <div className='flex align-items-right justify-content-between'>
                            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => handleUpdate()} />
                        </div>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
}



export default React.memo(PolicyEditor);
