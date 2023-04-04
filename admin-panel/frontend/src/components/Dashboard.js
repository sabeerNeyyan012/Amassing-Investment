import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserProfile, fetchPlanDetails, fetchUserCourseCount } from '../redux/store/slice';


const Dashboard = (props) => {
    const dispatch = useDispatch();
    const users = useSelector((state)=>state?.reducer?.userProfile?.data);
    const userCount = useSelector((state)=>state?.reducer?.userCount);
    const planDetails = useSelector((state)=>state?.reducer?.planDetails);
    
    useEffect(()=>{
        dispatch(fetchAllUserProfile()) //dashboard
        dispatch(fetchUserCourseCount()) //dashboard
        dispatch(fetchPlanDetails()) //dashboard
    },[]);

    const [lineOptions, setLineOptions] = useState(null);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-2">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Active Users</span>
                            <div className="text-900 font-medium text-xl">{userCount?.activeuser}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Courses</span>
                            <div className="text-900 font-medium text-xl">{userCount?.course}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-8 xl:col-9">
                <div className="card surface-ground px-4 py-5 md:px-6 lg:px-8">
                    <div className="text-900 font-bold text-6xl mb-4 text-center">Subscription Plan</div>
                    <div className="text-700 text-xl mb-3 text-center block">Offering the best plan.</div>
                    <div className="col-12 lg:col-12">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card align-items-center justify-content-center bg-cyan-100" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2 text-black">Basic</div>
                            <div className="flex align-items-center justify-content-center">
                                <span className="font-bold text-2xl text-900">{planDetails?.[0]?.amount}</span>
                                <span className="ml-2 font-medium text-600">per {planDetails?.[0]?.interval}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>Recently Registered Users</h5>
                    <DataTable value={users} rows={5} responsiveLayout="scroll">
                        <Column field="firstName" header="First Name" style={{ width: '30%' }} />
                        <Column field="lastName" header="Last Name" style={{ width: '30%' }} />
                        <Column field="email" header="Email Id" style={{ width: '30%' }} />
                        <Column field="mobile" header="Mobile" style={{ width: '30%' }} />
                    </DataTable>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);
