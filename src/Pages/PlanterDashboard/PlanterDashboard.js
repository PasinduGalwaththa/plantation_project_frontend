import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from "../../Pages/context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { Center, Divider, Space } from '@mantine/core';

export default function PlanterDashboard() {
  const { contextData } = useContext(AuthContext);
  const [paymentsWeight, setPaymentsWeight] = useState([]);
  const [paymentsAmount, setPaymentsAmount] = useState([]);
  const [updatesWeight, setUpdatesWeight] = useState([]);
  const [chartType, setChartType] = useState('weight');
  const [loading, setLoading] = useState(true);

  async function getPaymentsDate() {
    const payments = await axios.get("http://127.0.0.1:8000/payments/getdata/amount");
    const sortedPayments = sortPaymentsByDateDesc(payments.data);
    setPaymentsAmount(sortedPayments)
  }

  async function getPaymentsWeight() {
    const payments = await axios.get("http://127.0.0.1:8000/payments/getdata/weight");
    setPaymentsWeight(payments.data);
  }

  async function getUpdatesWeight() {
    const updates = await axios.get("http://127.0.0.1:8000/updates/getdata");
    setUpdatesWeight(updates.data);
  }

  function sortPaymentsByDateDesc(payments) {
    return payments.sort((a, b) => new Date(b.collected_date) - new Date(a.collected_date));
  }

  useEffect(() => {
    getPaymentsDate();
    getPaymentsWeight();
    getUpdatesWeight();
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
      <Navbar bg="light" variant="light" expand="lg" style={{ width: "100%" }}>
      <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + '/ha.png'}
            alt="Logo"
            height="60"
            style={{ maxHeight: "100%", marginRight: "10px" }} // Adjust the height as needed
          />
          <div style={{ borderLeft: "2px solid #ccc", height: "60px", margin: "0 10px" }}></div>
          <h2 style={{ display: "inline", fontWeight: "bold" }}>Planter Dashboard</h2>
        </Navbar.Brand>
        


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Navbar.Text style={{ whiteSpace: "nowrap" }}>Planter <strong>{contextData.user.username}</strong></Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <div>
          <input
            type="radio"
            id="weight"
            name="chartType"
            value="weight"
            checked={chartType === 'weight'}
            onChange={() => setChartType('weight')}
          />
          <label htmlFor="weight">Weight of Collected Tea</label>
        </div>
        <div>
          <input
            type="radio"
            id="amount"
            name="chartType"
            value="amount"
            checked={chartType === 'amount'}
            onChange={() => setChartType('amount')}
          />
          <label htmlFor="amount">Payment Collection History</label>
        </div>
        <div>
          <input
            type="radio"
            id="gross_weight"
            name="chartType"
            value="gross_weight"
            checked={chartType === 'gross_weight'}
            onChange={() => setChartType('gross_weight')}
          />
          <label htmlFor="gross_weight">Gross Weight Of Payments History</label>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
          {chartType === 'weight' && (
            <>
            <Divider label="Weight of Colleted Tea in Last 10 Days" labelPosition='center' my='xl'/>

              <Center>
                <ResponsiveContainer width="70%" height={300}>
                  <LineChart
                    data={updatesWeight} // Use paymentsAmount as the data source
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="collected_date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Center>
            </>
          )
            }
          {chartType === 'amount' && (
            <>
            <Divider label="Payment Collection History" labelPosition='center'  my='xl'/>
          <Center>
            <ResponsiveContainer width="70%" height={300}>
              <LineChart
                data={paymentsAmount} // Use paymentsAmount as the data source
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calculated_amount" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Center>
            </>
          )    
            }
          {chartType === 'gross_weight' && (
            <>
              <Divider label="Gross Weight Of Payments History" labelPosition='center' my='xl'/>
          <Center>
          <ResponsiveContainer width="70%" height={300}>
              <LineChart
                data={paymentsWeight} // Use paymentsAmount as the data source
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gross_weight" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Center>
            </>
          )}
          </>
        )}
      </div>
    </div>
  );
}
