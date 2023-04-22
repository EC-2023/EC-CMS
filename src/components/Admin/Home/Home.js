import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb, Dropdown, Tooltip } from 'react-bootstrap';
import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import DatePicker from 'react-datepicker';
import { fetchRevenue, fetchTotal, selectStatistics } from '../../../store/slices/statistics-slice';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
function Home() {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const [chartData, setChartData] = useState({});
  const sampleData = [
    { time: '2023-01', revenue: 4500 },
    { time: '2023-02', revenue: 6000 },
    { time: '2023-03', revenue: 5000 },
    { time: '2023-04', revenue: 7000 },
    { time: '2023-05', revenue: 8000 },
    { time: '2023-06', revenue: 6500 },
    { time: '2023-07', revenue: 9000 },
    { time: '2023-08', revenue: 7500 },
    { time: '2023-09', revenue: 8500 },
    { time: '2023-10', revenue: 9500 },
    { time: '2023-11', revenue: 10000 },
    { time: '2023-12', revenue: 11000 },
  ];

  const [timeRange, setTimeRange] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTotal());
    dispatch(fetchRevenue({ dateStr: selectedDate.getTime(), option: timeRange }));
  }, []);

  const handleTimeRangeChange = (event) => {
    console.log(event);

    setTimeRange(event);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const timeRanges = [
    { key: 0, value: 'week' },
    { key: 1, value: 'month' },
    { key: 2, value: 'year' },
  ];

  return (
    <div className="content-wrapper">
      <h1 className="title main-title">Home</h1>
      <div className="total-count-container">
        <div className="total-count-card total-users">
          <h3>Total Users</h3>
          <p>{statistics.total?.totalUser}</p>
        </div>
        <div className="total-count-card total-stores">
          <h3>Total Stores</h3>
          <p>{statistics.total?.totalStore}</p>
        </div>
        <div className="total-count-card total-products">
          <h3>Total Products</h3>
          <p>{statistics.total?.totalProduct}</p>
        </div>
      </div>

      <div className="revenue-chart-container">
        <div>
          <h2 className="title">Doanh thu</h2>
          <div className="revenue-dropdown">
            <Dropdown onSelect={handleTimeRangeChange}>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {timeRange}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {timeRanges.map((range, index) => (
                  <Dropdown.Item key={index} eventKey={range.key}>
                    {range.value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="date-picker-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;
