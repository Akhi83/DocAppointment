import React from 'react';

const Dashboard = () => {
    const bookings = [
        { name: 'Dr. Sarah Patel', date: '18 Oct 2024', status: 'Cancelled' },
        { name: 'Dr. Ava Mitchell', date: '20 Oct 2024', status: 'Cancelled' },
        { name: 'Dr. Richard James', date: '18 Oct 2024', status: 'Cancelled' },
        { name: 'Dr. Zoe Kelly', date: '22 Oct 2024', status: 'Cancelled' },
        { name: 'Dr. Jeffrey King', date: '18 Oct 2024', status: 'Cancelled' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-1/5 bg-white shadow-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                </div>
                <ul className="mt-4 space-y-2">
                    <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
                        <i className="text-blue-600 fas fa-tachometer-alt mr-2"></i> 
                        <span>Dashboard</span>
                    </li>
                    <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
                        <i className="text-blue-600 fas fa-calendar-alt mr-2"></i> 
                        <span>Appointments</span>
                    </li>
                    <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
                        <i className="text-blue-600 fas fa-user-md mr-2"></i> 
                        <span>Add Doctor</span>
                    </li>
                    <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
                        <i className="text-blue-600 fas fa-list mr-2"></i> 
                        <span>Doctors List</span>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-6 rounded shadow-lg flex items-center">
                        <i className="fas fa-user-md text-2xl text-blue-500 mr-4"></i>
                        <div>
                            <h3 className="text-lg font-semibold">Doctors</h3>
                            <p className="text-2xl">15</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded shadow-lg flex items-center">
                        <i className="fas fa-calendar-check text-2xl text-green-500 mr-4"></i>
                        <div>
                            <h3 className="text-lg font-semibold">Appointments</h3>
                            <p className="text-2xl">600</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded shadow-lg flex items-center">
                        <i className="fas fa-users text-2xl text-purple-500 mr-4"></i>
                        <div>
                            <h3 className="text-lg font-semibold">Patients</h3>
                            <p className="text-2xl">567</p>
                        </div>
                    </div>
                </div>

                {/* Latest Bookings */}
                <div className="bg-white p-6 rounded shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Latest Bookings</h3>
                    <ul>
                        {bookings.map((booking, index) => (
                            <li key={index} className="hover:bg-gray-200 cursor-pointer flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={`https://via.placeholder.com/50`}
                                        alt="doctor"
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{booking.name}</p>
                                        <p className="text-sm">Booking on {booking.date}</p>
                                    </div>
                                </div>
                                <span className="text-red-500 font-semibold">
                                    {booking.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
