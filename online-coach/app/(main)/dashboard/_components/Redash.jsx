'use client'
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Redash({salaryData}){
  


    return (
            <ResponsiveContainer width="100%" height="100%">
        <BarChart
      
          data={salaryData}
        
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
       
          <Tooltip content={({active, payload, label})=>{
            if(active && payload && payload.length){
              return <div className='bg-background border rounded-lg p-2 shadow-md'>
                <p className='font-medium'>{label}</p>
                {payload.map((item, i)=> (
                  <p key={i}>{item.name}: ${item.value}k</p>
                ))}
              </div>
            }
            return null
          }}/>
          <Legend />
          <Bar dataKey="min" fill="#94a3b8" name="Min Salary (k)" />
          <Bar dataKey="median" fill="#64748b" name="Median Salary (k)" />
          <Bar dataKey="max" fill="#82ca9d" name="Max Salary (k)" />
        </BarChart>
      </ResponsiveContainer> 
    //   <ResponsiveContainer width="100%" height="100%">
    //     <BarChart
    //       width={500}
    //       height={300}
    //       data={salaryData}
    //       margin={{
    //         top: 5,
    //         right: 30,
    //         left: 20,
    //         bottom: 5,
    //       }}
    //     >
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <XAxis dataKey="name" />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
    //       <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    //     </BarChart>
    //   </ResponsiveContainer>
    );


}


export default Redash