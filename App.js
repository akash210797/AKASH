import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const levels = [
  'Requestor', 'Team Lead', 'Dept Head', 'Purchase', 'Quality', 'Accounts', 'Final Approval'
];

function App() {
  const [requests, setRequests] = useState([]);
  const [newReq, setNewReq] = useState('');

  const addRequest = () => {
    if(!newReq) return;
    setRequests([...requests, { id: Date.now(), name: newReq, status: 0 }]);
    setNewReq('');
  };

  const approve = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: Math.min(r.status+1, levels.length) } : r));
  };
  const reject = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: -1 } : r));
  };

  const statusData = [
    { name: 'Pending', value: requests.filter(r => r.status >=0 && r.status < levels.length).length },
    { name: 'Approved', value: requests.filter(r => r.status === levels.length).length },
    { name: 'Rejected', value: requests.filter(r => r.status === -1).length }
  ];

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Digital Material Request Form</h1>
      <div className='mb-4'>
        <input value={newReq} onChange={e => setNewReq(e.target.value)} placeholder='Enter material name' className='border p-2 mr-2' />
        <button onClick={addRequest} className='bg-blue-500 text-white px-3 py-1 rounded'>Add</button>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <h2 className='text-xl mb-2'>Requests</h2>
          <ul>
            {requests.map(r => (
              <li key={r.id} className='border p-2 mb-2 rounded'>
                <div className='font-semibold'>{r.name}</div>
                <div>Status: {r.status === -1 ? 'Rejected' : r.status === levels.length ? 'Approved' : levels[r.status]}</div>
                {r.status >=0 && r.status < levels.length && (
                  <>
                    <button onClick={() => approve(r.id)} className='bg-green-500 text-white px-2 py-1 mr-2 rounded'>Approve</button>
                    <button onClick={() => reject(r.id)} className='bg-red-500 text-white px-2 py-1 rounded'>Reject</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-xl mb-2'>Dashboard</h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie data={statusData} dataKey='value' nameKey='name' outerRadius={100} fill='#8884d8' label>
                {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#ffc658','#82ca9d','#ff6b6b'][index]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey='name' /><YAxis /><Tooltip /><Legend />
              <Bar dataKey='value' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
