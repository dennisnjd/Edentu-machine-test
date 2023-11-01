import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import "./GatePassVisualisation.css"
import { AuthContext } from '../../AuthContext';
import Navbar from "../Navbar/Navbar"

function GatePassVisualisation() {
    const { state } = useContext(AuthContext);
    const token = state.token;

    const [gatePassData, setGatePassData] = useState({});
    const chartRef = useRef(null); // Create a ref for the chart instance
    const [loading, setLoading] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const [filteredData, setFilteredData] = useState({}); // Store filtered data

    const updateChart = () => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance;

            if (chartInstance) {
                chartInstance.destroy(); // Destroy the existing chart if it exists
            }

            chartRef.current.chartInstance = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: ['Applied', 'Processing', 'Approved', 'Rejected'],
                    datasets: [
                        {
                            label: 'Gate Pass Data',
                            data: [
                                filteredData.applied_gatepass_count,
                                filteredData.processing_gatepass_count,
                                filteredData.approved_gatepass_count,
                                filteredData.rejected_gatepass_count,
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    };

    useEffect(() => {
        // Fetch gate pass data from the API
        axios.get('https://conext.in/gatePass/api/gate_pass_counts/', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setGatePassData(response.data);
                setLoading(false);
                updateChart();
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error fetching gate pass data:', error);
            });
    }, [token]);

    useEffect(() => {
        updateChart();
    }, [loading, chartType]);

    useEffect(() => {
        // Update the filtered data when the selected filter changes
        const filterData = () => {
            if (selectedFilter === 'all') {
                setFilteredData(gatePassData);
            } else {
                // Filter the data based on the selected filter
                setFilteredData({
                    applied_gatepass_count: gatePassData.applied_gatepass_count,
                    processing_gatepass_count: gatePassData.processing_gatepass_count,
                    approved_gatepass_count: gatePassData.approved_gatepass_count,
                    rejected_gatepass_count: gatePassData.rejected_gatepass_count,
                });
            }
        };

        filterData();
    }, [selectedFilter, gatePassData]);

    const handleType = (type) => {
        setChartType(type)
    }

    return (
        <>
            <Navbar />


            <div className='container-fluid'>
                <div className='chartContain col-xs-10 col-md-7'>
                    <h1 className='h1Chart'>Gate Pass Data Visualization</h1>
                    {loading ? (
                        <h6>Loading...<i className="fa-solid fa-spinner fa-spin"></i></h6>
                    ) : (
                        <div>
                            <div className="chart mb-4">
                                <canvas ref={chartRef} />
                            </div>
                            <h6 onClick={() => handleType('line')} style={{ cursor: "pointer" }}>Line Chart</h6>
                            <h6 onClick={() => handleType('bar')} style={{ cursor: "pointer" }}>Bar Chart</h6>
                            <div>
                                <select className='selectt col-xs-12 mt-4' onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
                                    <option value="all">Select</option>
                                    <option value="applied_gatepass_count">Applied</option>
                                    <option value="processing_gatepass_count">Processing</option>
                                    <option value="approved_gatepass_count">Approved</option>
                                    <option value="rejected_gatepass_count">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <p className='mt-3 count'>
                                    {selectedFilter === 'all'
                                        ? 'All Data'
                                        : `${selectedFilter
                                            .replace('_gatepass_count', '')
                                            .charAt(0)
                                            .toUpperCase()}${selectedFilter.slice(1)} Data: ${filteredData[selectedFilter]
                                        }`}
                                </p>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default GatePassVisualisation;


