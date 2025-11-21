// import React, { useState, useEffect } from "react";
// import { Filter } from "lucide-react";
// import DatePicker from "react-multi-date-picker";
// import "./divisionpa.css";
// import Navbar from './Navbar.js';

// const tabs = ["Raise Request", "Check Status"];

// const RegularisationPage = () => {
//   const [activeTab, setActiveTab] = useState("Raise Request");
//   const [selectedCeid, setSelectedCeid] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [selectedType, setSelectedType] = useState("");
//   const [entries, setEntries] = useState([]);
//   const [newEntries, setNewEntries] = useState([]);
//   const [availableNames, setAvailableNames] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [enrichedEntries, setEnrichedEntries] = useState([]);
//   const [filterName, setFilterName] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [selectedReason, setSelectedReason] = useState("");
// const [customReason, setCustomReason] = useState("");

//   //entries: This state holds all the submitted regularisation requests fetched from the backend.
//   //availableNames: Stores a list of employee names and their CEIDs fetched from the backend, used for the "Select Name" dropdown.


//   //Fetching Employee Names (availableNames)
//   useEffect(() => {
//     fetch("http://localhost:8081/api/employees/names")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch employee Names");
//         return res.json();
//       })
//       .then((data) => setAvailableNames(data))
//       .catch((err) => console.error("Error fetching employee Names:", err));
//   }, []);
//    // Empty dependency array means this runs once on component mount


// //   useEffect(() => {
// //   if (entries.length > 0 && availableNames.length > 0) {
// //     const enriched = entries.map(entry => {
// //       // 1. Try to get name from entry.employee
// //       const nameFromEmployee = entry.employee?.name;

// //       // 2. Fallback to lookup from availableNames
// //       const nameFromList = availableNames.find(emp => emp.ceid === entry.ceid)?.name;

// //       return {
// //         ...entry,
// //         name: nameFromEmployee || nameFromList || "Unknown"
// //       };
// //     });

// //     setEntries(enriched);
// //   }
// // }, [entries, availableNames]);


// // ✅ Modified enrichment useEffect (safe)
// //It creates a new array of objects (enriched) with the name property added (or defaulting to "Unknown").
// //Finally, it updates the enrichedEntries state with this new array, which is then used to display data in the "Check Status" table.
// // Enriching Entries with Names
// useEffect(() => {
//   if (entries.length > 0 && availableNames.length > 0) {
//     const enriched = entries.map(entry => {
//       const nameFromEmployee = entry.employee?.name;
//       const nameFromList = availableNames.find(emp => emp.ceid === entry.ceid)?.name;
//       return {
//         ...entry,
//         name: nameFromEmployee || nameFromList || "Unknown"
//       };
//     });
//     setEnrichedEntries(enriched);
//   } else {
//     setEnrichedEntries([]);
//   }
// }, [entries, availableNames]);



// //Fetching Submitted Entries when activetab state is changed.
//   useEffect(() => {
//     fetch("http://localhost:8081/api/regularisation/all")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch submitted entries");
//         return res.text();
//       })
//       .then((text) => {
//         if (!text) return [];
//         return JSON.parse(text);
//       })
//       // .then((data) => setEntries(data))
//       .then((data) => {
//   console.log("Fetched entries:", data); 
//   setEntries(data);
// })
//       .catch((err) => console.error("Error fetching submitted entries:", err));
//   }, [activeTab]);
//   // Runs when activeTab changes




//   const handleAddClick = () => {
//     // ... (input validation and employee lookup)
//     if (!selectedCeid || selectedDates.length === 0 || !selectedType) {
//       alert("Please select all fields before submitting.");
//       return;
//     }

//     const selectedEmp = availableNames.find(emp => emp.ceid.toString() === selectedCeid);
//     if (!selectedEmp) {
//       alert("Selected employee not found.");
//       return;
//     }
//     let newEntriesToAdd = [];

//    selectedDates.forEach(dateObj => {
//      const date = dateObj.format("YYYY-MM-DD");

//    if (selectedType === "Both") {
//     newEntriesToAdd.push(
//       {
//         ceid: selectedEmp.ceid,
//         name: selectedEmp.name,
//         date,
//         type: "In-Time",
//         status: "Pending"
//       },
//       {
//         ceid: selectedEmp.ceid,
//         name: selectedEmp.name,
//         date,
//         type: "Out-Time",
//         status: "Pending"
//       }
//     );
//   } else {
//     newEntriesToAdd.push({
//       ceid: selectedEmp.ceid,
//       name: selectedEmp.name,
//       date,
//       type: selectedType,
//       status: "Pending"
//     });
//   }
// });


//     const nonDuplicate = newEntriesToAdd.filter(
//       newEntry =>
//         !entries.some(e => e.ceid === newEntry.ceid && e.date === newEntry.date && e.type === newEntry.type) &&
//         !newEntries.some((e, i) =>
//           i !== editIndex &&
//           e.ceid === newEntry.ceid &&
//           e.date === newEntry.date &&
//           e.type === newEntry.type
//         )
//     );

//     if (nonDuplicate.length === 0) {
//       alert("All selected entries are duplicates.");
//       return;
//     }

//     if (editIndex !== null) {
//       const updated = [...newEntries];
//       updated[editIndex] = nonDuplicate[0]; // Only update one edited entry
//       setNewEntries(updated);
//       setEditIndex(null);
//     } else {
//       setNewEntries([...newEntries, ...nonDuplicate]);
//     }

//     setSelectedCeid("");
//     setSelectedDates([]);
//     setSelectedType("");
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this entry?")) {
//       const updated = [...newEntries];
//       updated.splice(index, 1);
//       setNewEntries(updated);
//     }
//   };

//   const handleEdit = (index) => {
//     const entry = newEntries[index];
//     setSelectedCeid(entry.ceid.toString());
//     setSelectedDates([{ format: () => entry.date }]);
//     setSelectedType(entry.type);
//     setEditIndex(index);
//     setActiveTab("Raise Request");
//   };

//   // const handleDownloadCSV = () => {
//   //   const csv = ["Name,Date,Type,Status", ...entries.map(e => `${e.name},${e.date},${e.type},${e.status}`)].join("\n");
//   //   const blob = new Blob([csv], { type: 'text/csv' });
//   //   const url = URL.createObjectURL(blob);
//   //   const a = document.createElement("a");
//   //   a.href = url;
//   //   a.download = "regularisation_requests.csv";
//   //   a.click();
//   //   URL.revokeObjectURL(url);
//   // };



//  //It creates a temporary URL for the received file blob, creates a hidden anchor (<a>) tag, sets its href to the URL, and download attribute to suggest a filename.
//   const handleDownloadReport = async () => {
//   try {
//     const response = await fetch("http://localhost:8081/api/report/download");

//     if (!response.ok) {
//       alert("Failed to download");
//       return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "RegularisationReport.pdf";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url); // clean up
//   } catch (error) {
//     console.error("Download error:", error);
//     alert("An error occurred while downloading the report.");
//   }
// };




//   const handleSubmit = async () => {
//     if (newEntries.length === 0) {
//       alert("No new entries to submit.");
//       return;
//     }

//     const confirmSubmit = window.confirm("Do you want to submit the requests?");
//     if (!confirmSubmit) return;

//     try {
//       const response = await fetch("http://localhost:8081/api/regularisation/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newEntries.map(({ ceid, date, type }) => ({ ceid, date, type })))
//       });

//       if (!response.ok) throw new Error("Failed to submit requests.");

//       alert("Requests submitted successfully!");
//       const submitted = newEntries.map(e => ({ ...e, status: "Pending" }));
//       setEntries([...entries, ...submitted]);
//       setNewEntries([]);
//       setSelectedCeid("");
//       setSelectedDates([]);
//       setSelectedType("");
//     } catch (error) {
//       console.error("Error submitting requests:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   // const dataSource = activeTab === "Raise Request" ? newEntries : entries;
//  const dataSource = activeTab === "Raise Request" ? newEntries : enrichedEntries;



//   // const filteredEntries = dataSource.filter(entry => {
//   //   const matchesName = entry.name.includes(filterName);
//   //   const matchesDate = entry.date.includes(filterDate);
//   //   const matchesType = entry.type.toLowerCase().includes(filterType.toLowerCase());
//   //   const matchesStatus = entry.status.toLowerCase().includes(filterStatus.toLowerCase());
//   //   return matchesName && matchesDate && matchesType && (activeTab === "Raise Request" || matchesStatus);
//   // });
//   const filteredEntries = dataSource.filter(entry => {
//   const matchesName = (entry.name || "").toLowerCase().includes(filterName.toLowerCase());
//   const matchesDate = (entry.date || "").includes(filterDate);
//   const matchesType = (entry.type || "").toLowerCase().includes(filterType.toLowerCase());
//   const matchesStatus = (entry.status || "").toLowerCase().includes(filterStatus.toLowerCase());
//   return matchesName && matchesDate && matchesType && (activeTab === "Raise Request" || matchesStatus);
// });


//   return (
//     <div className="container" style={{ paddingTop: '140px' }}>
//       <Navbar />
//       {/* <h2 className="heading">Regularisation Portal</h2> */}
//       <div className="drdo-header-center">Regularisation Portal</div>

//       <div className="tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`ea-tab-button ${activeTab === tab ? "active" : ""}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeTab === "Raise Request" && (
//         <>
//           <div className="filters">
//             <select
//               className="filter-dropdown"
//               value={selectedCeid}
//               onChange={(e) => setSelectedCeid(e.target.value)}
//             >
//               <option value="">Select Name</option>
//               {availableNames.map((emp) => (
//                 <option key={emp.ceid} value={emp.ceid}>
//                   {emp.name} ({emp.ceid})
//                 </option>
//               ))}
//             </select>

//             <div className="filter-dropdown">
//               <DatePicker
//                 multiple
//                 value={selectedDates}
//                 onChange={setSelectedDates}
//                 maxDate={new Date()}
//                 format="YYYY-MM-DD"
//                 placeholder="Select Dates"
//               />
//             </div>

//             <select
//               className="filter-dropdown"
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//             >
//               <option value="">Select Type</option>
//               <option value="In-Time">In-Time</option>
//               <option value="Out-Time">Out-Time</option>
//               <option value="Both">Both</option>
//             </select>
//           </div>

//           <div className="req-button-wrapper">
//             <button className="req-button" onClick={handleAddClick}>
//               {editIndex !== null ? "Update" : "+"}
//             </button>
//           </div>
//         </>
//       )}

//       <div className="table-wrapper">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>
//                 Name
//                 <div className="filter-icon-wrapper">
//                   <Filter size={14} className="filter-icon" />
//                   <input
//                     className="filter-cell"
//                     type="text"
//                     value={filterName}
//                     onChange={(e) => setFilterName(e.target.value)}
//                     placeholder="Filter"
//                   />
//                 </div>
//               </th>
//               <th>
//                 Date
//                 <div className="filter-icon-wrapper">
//                   <Filter size={14} className="filter-icon" />
//                   <input
//                     className="filter-cell"
//                     type="text"
//                     value={filterDate}
//                     onChange={(e) => setFilterDate(e.target.value)}
//                     placeholder="YYYY-MM-DD"
//                   />
//                 </div>
//               </th>
//               <th>
//                 Type
//                 <div className="filter-icon-wrapper">
//                   <Filter size={14} className="filter-icon" />
//                   <input
//                     className="filter-cell"
//                     type="text"
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                     placeholder="Filter"
//                   />
//                 </div>
//               </th>
//               {activeTab === "Check Status" && (
//                 <th>
//                   Status
//                   <div className="filter-icon-wrapper">
//                     <Filter size={14} className="filter-icon" />
//                     <input
//                       className="filter-cell"
//                       type="text"
//                       value={filterStatus}
//                       onChange={(e) => setFilterStatus(e.target.value)}
//                       placeholder="Filter"
//                     />
//                   </div>
//                 </th>
//               )}
//               {activeTab === "Raise Request" && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEntries.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="ea-empty-row">
//                   No employee records found.
//                 </td>
//               </tr>
//             ) : (
//               filteredEntries.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.name}</td>
//                   <td>{entry.date}</td>
//                   <td>{entry.type}</td>
//                   {activeTab === "Check Status" && (
//                     <td
//                       className={
//                         entry.status === "Approved"
//                           ? "status-approved"
//                           : entry.status === "Rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }
//                     >
//                       {entry.status}
//                     </td>
//                   )}
//                   {activeTab === "Raise Request" && (
//                     <td>
//                       <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
//                       <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {activeTab === "Raise Request" && (
//         <div className="req-button-wrapper">
//           <button className="req-button" onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//       {activeTab === "Check Status" && (
//         <div className="req-button-wrapper">
//           {/* <button className="req-button" onClick={handleDownloadCSV}>Download CSV</button> */}
//           <button className="request-button" onClick={handleDownloadReport}>Download Report</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegularisationPage;












// import React, { useState, useEffect } from "react";
// import { Filter } from "lucide-react";
// import DatePicker from "react-multi-date-picker";
// import "./divisionpa.css";
// import Navbar from './Navbar.js';

// const tabs = ["Raise Request", "Check Status"];

// const RegularisationPage = () => {
//   const [activeTab, setActiveTab] = useState("Raise Request");
//   const [selectedCeid, setSelectedCeid] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedReason, setSelectedReason] = useState(""); // NEW
//   const [customReason, setCustomReason] = useState("");     // NEW
//   const [entries, setEntries] = useState([]);
//   const [newEntries, setNewEntries] = useState([]);
//   const [availableNames, setAvailableNames] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [enrichedEntries, setEnrichedEntries] = useState([]);
//   const [filterName, setFilterName] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterReason, setFilterReason] = useState("");


//   useEffect(() => {
//     fetch("http://localhost:8081/api/employees/names")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch employee Names");
//         return res.json();
//       })
//       .then((data) => setAvailableNames(data))
//       .catch((err) => console.error("Error fetching employee Names:", err));
//   }, []);

//   useEffect(() => {
//     if (entries.length > 0 && availableNames.length > 0) {
//       const enriched = entries.map(entry => {
//         const nameFromEmployee = entry.employee?.name;
//         const nameFromList = availableNames.find(emp => emp.ceid === entry.ceid)?.name;
//         return {
//           ...entry,
//           name: nameFromEmployee || nameFromList || "Unknown"
//         };
//       });
//       setEnrichedEntries(enriched);
//     } else {
//       setEnrichedEntries([]);
//     }
//   }, [entries, availableNames]);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/regularisation/all")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch submitted entries");
//         return res.text();
//       })
//       .then((text) => {
//         if (!text) return [];
//         return JSON.parse(text);
//       })
//       .then((data) => setEntries(data))
//       .catch((err) => console.error("Error fetching submitted entries:", err));
//   }, [activeTab]);

//   const handleAddClick = () => {
//     if (!selectedCeid || selectedDates.length === 0 || !selectedType) {
//       alert("Please select all fields before submitting.");
//       return;
//     }

//     const selectedEmp = availableNames.find(emp => emp.ceid.toString() === selectedCeid);
//     if (!selectedEmp) {
//       alert("Selected employee not found.");
//       return;
//     }

//     const reasonToUse = selectedReason === "Other" ? customReason.trim() : selectedReason;
//     if (!reasonToUse) {
//       alert("Please specify a reason for regularisation.");
//       return;
//     }

//     let newEntriesToAdd = [];
//     selectedDates.forEach(dateObj => {
//       const date = dateObj.format("YYYY-MM-DD");
//       if (selectedType === "Both") {
//         newEntriesToAdd.push(
//           {
//             ceid: selectedEmp.ceid,
//             name: selectedEmp.name,
//             date,
//             type: "In-Time",
//             reason: reasonToUse,
//             status: "Pending"
//           },
//           {
//             ceid: selectedEmp.ceid,
//             name: selectedEmp.name,
//             date,
//             type: "Out-Time",
//             reason: reasonToUse,
//             status: "Pending"
//           }
//         );
//       } else {
//         newEntriesToAdd.push({
//           ceid: selectedEmp.ceid,
//           name: selectedEmp.name,
//           date,
//           type: selectedType,
//           reason: reasonToUse,
//           status: "Pending"
//         });
//       }
//     });

//     const nonDuplicate = newEntriesToAdd.filter(
//       newEntry =>
//         !entries.some(e => e.ceid === newEntry.ceid && e.date === newEntry.date && e.type === newEntry.type) &&
//         !newEntries.some((e, i) =>
//           i !== editIndex &&
//           e.ceid === newEntry.ceid &&
//           e.date === newEntry.date &&
//           e.type === newEntry.type
//         )
//     );

//     if (nonDuplicate.length === 0) {
//       alert("All selected entries are duplicates.");
//       return;
//     }

//     if (editIndex !== null) {
//       const updated = [...newEntries];
//       updated[editIndex] = nonDuplicate[0];
//       setNewEntries(updated);
//       setEditIndex(null);
//     } else {
//       setNewEntries([...newEntries, ...nonDuplicate]);
//     }

//     setSelectedCeid("");
//     setSelectedDates([]);
//     setSelectedType("");
//     setSelectedReason("");
//     setCustomReason("");
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this entry?")) {
//       const updated = [...newEntries];
//       updated.splice(index, 1);
//       setNewEntries(updated);
//     }
//   };

//   const handleEdit = (index) => {
//     const entry = newEntries[index];
//     setSelectedCeid(entry.ceid.toString());
//     setSelectedDates([{ format: () => entry.date }]);
//     setSelectedType(entry.type);
//     setSelectedReason(["Traffic", "Public Transport Delay", "Health Issue", "Official Work", "Emergency"].includes(entry.reason) ? entry.reason : "Other");
//     setCustomReason(!["Traffic", "Public Transport Delay", "Health Issue", "Official Work", "Emergency"].includes(entry.reason) ? entry.reason : "");
//     setEditIndex(index);
//     setActiveTab("Raise Request");
//   };

//   const handleDownloadReport = async () => {
//     try {
//       const response = await fetch("http://localhost:8081/api/report/download");
//       if (!response.ok) {
//         alert("Failed to download");
//         return;
//       }
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "RegularisationReport.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download error:", error);
//       alert("An error occurred while downloading the report.");
//     }
//   };

//   const handleSubmit = async () => {
//     if (newEntries.length === 0) {
//       alert("No new entries to submit.");
//       return;
//     }
//     const confirmSubmit = window.confirm("Do you want to submit the requests?");
//     if (!confirmSubmit) return;

//     try {
//       const response = await fetch("http://localhost:8081/api/regularisation/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newEntries.map(({ ceid, date, type, reason }) => ({ ceid, date, type, reason })))
//       });

//       if (!response.ok) throw new Error("Failed to submit requests.");

//       alert("Requests submitted successfully!");
//       const submitted = newEntries.map(e => ({ ...e, status: "Pending" }));
//       setEntries([...entries, ...submitted]);
//       setNewEntries([]);
//       setSelectedCeid("");
//       setSelectedDates([]);
//       setSelectedType("");
//       setSelectedReason("");
//       setCustomReason("");
//     } catch (error) {
//       console.error("Error submitting requests:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   const dataSource = activeTab === "Raise Request" ? newEntries : enrichedEntries;

//   const filteredEntries = dataSource.filter(entry => {
//     const matchesName = (entry.name || "").toLowerCase().includes(filterName.toLowerCase());
//     const matchesDate = (entry.date || "").includes(filterDate);
//     const matchesType = (entry.type || "").toLowerCase().includes(filterType.toLowerCase());
//     const matchesStatus = (entry.status || "").toLowerCase().includes(filterStatus.toLowerCase());
//     const matchesReason = (entry.reason || "").toLowerCase().includes(filterReason.toLowerCase());
//    return matchesName && matchesDate && matchesType && (activeTab === "Raise Request" || matchesStatus) && matchesReason;
//   });

//   return (
//     <div className="container" style={{ paddingTop: '140px' }}>
//       <Navbar />
//       <div className="drdo-header-center">Regularisation Portal</div>

//       <div className="tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`ea-tab-button ${activeTab === tab ? "active" : ""}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeTab === "Raise Request" && (
//         <>
//           <div className="filters">
//             <select className="filter-dropdown" value={selectedCeid} onChange={(e) => setSelectedCeid(e.target.value)}>
//               <option value="">Select Name</option>
//               {availableNames.map((emp) => (
//                 <option key={emp.ceid} value={emp.ceid}>
//                   {emp.name} ({emp.ceid})
//                 </option>
//               ))}
//             </select>

//             <div className="filter-dropdown">
//               <DatePicker
//                 multiple
//                 value={selectedDates}
//                 onChange={setSelectedDates}
//                 maxDate={new Date()}
//                 format="YYYY-MM-DD"
//                 placeholder="Select Dates"
//               />
//             </div>

//             <select className="filter-dropdown" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
//               <option value="">Select Type</option>
//               <option value="In-Time">In-Time</option>
//               <option value="Out-Time">Out-Time</option>
//               <option value="Both">Both</option>
//             </select>

//             <select className="filter-dropdown" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
//               <option value="">Select Reason</option>
//               <option value="Traffic">Traffic</option>
//               <option value="Public Transport Delay">Public Transport Delay</option>
//               <option value="Health Issue">Health Issue</option>
//               <option value="Official Work">Official Work</option>
//               <option value="Emergency">Emergency</option>
//               <option value="Other">Other</option>
//             </select>

//             {selectedReason === "Other" && (
//               <input
//                 type="text"
//                 className="filter-dropdown"
//                 placeholder="Enter custom reason"
//                 value={customReason}
//                 onChange={(e) => setCustomReason(e.target.value)}
//               />
//             )}
//           </div>

//           <div className="req-button-wrapper">
//             <button className="req-button" onClick={handleAddClick}>
//               {editIndex !== null ? "Update" : "+"}
//             </button>
//           </div>
//         </>
//       )}

//       <div className="table-wrapper">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filter" /></div></th>
//               <th>Date<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} placeholder="YYYY-MM-DD" /></div></th>
//               <th>Type<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterType} onChange={(e) => setFilterType(e.target.value)} placeholder="Filter" /></div></th>
//               <th>Reason<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterType} onChange={(e) => setFilterReason(e.target.value)} placeholder="Filter" /></div></th>
//               {activeTab === "Check Status" && (
//                 <th>Status<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} placeholder="Filter" /></div></th>
//               )}
//               {activeTab === "Raise Request" && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEntries.length === 0 ? (
//               <tr><td colSpan="5" className="ea-empty-row">No employee records found.</td></tr>
//             ) : (
//               filteredEntries.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.name}</td>
//                   <td>{entry.date}</td>
//                   <td>{entry.type}</td>
//                   <td>{entry.reason}</td>
//                   {activeTab === "Check Status" && (
//                     <td className={
//                       entry.status === "Approved" ? "status-approved" :
//                       entry.status === "Rejected" ? "status-rejected" : "status-pending"
//                     }>{entry.status}</td>
//                   )}
//                   {activeTab === "Raise Request" && (
//                     <td>
//                       <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
//                       <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {activeTab === "Raise Request" && (
//         <div className="req-button-wrapper">
//           <button className="req-button" onClick={handleSubmit}>Submit</button>
//         </div>
//       )}

//       {activeTab === "Check Status" && (
//         <div className="req-button-wrapper">
//           <button className="request-button" onClick={handleDownloadReport}>Download Report</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegularisationPage;














import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./divisionpa.css";
import Navbar from "./Navbar.js";

const tabs = ["Raise Request", "Check Status"];

const RegularisationPage = () => {
  const [activeTab, setActiveTab] = useState("Raise Request");
  const [selectedCeid, setSelectedCeid] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [time, setTime] = useState("");
  const [entries, setEntries] = useState([]);
  const [newEntries, setNewEntries] = useState([]);
  const [availableNames, setAvailableNames] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [enrichedEntries, setEnrichedEntries] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterReason, setFilterReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/employees/names")
      .then((res) => res.json())
      .then((data) => setAvailableNames(data))
      .catch((err) => console.error("Error fetching employee names:", err));
  }, []);

  useEffect(() => {
    if (entries.length > 0 && availableNames.length > 0) {
      const enriched = entries.map((entry) => {
        const nameFromEmployee = entry.employee?.name;
        const nameFromList = availableNames.find((emp) => emp.ceid === entry.ceid)?.name;
        return {
          ...entry,
          name: nameFromEmployee || nameFromList || "Unknown"
        };
      });
      setEnrichedEntries(enriched);
    } else {
      setEnrichedEntries([]);
    }
  }, [entries, availableNames]);

  useEffect(() => {
    fetch("http://localhost:8081/api/regularisation/all")
      .then((res) => res.text())
      .then((text) => (text ? JSON.parse(text) : []))
      .then((data) => setEntries(data))
      .catch((err) => console.error("Error fetching submitted entries:", err));
  }, [activeTab]);

  const handleAddClick = () => {
    if (!selectedCeid || selectedDates.length === 0 || !selectedType || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedEmp = availableNames.find((emp) => emp.ceid.toString() === selectedCeid);
    const reasonToUse = selectedReason === "Other" ? customReason.trim() : selectedReason;
    if (!reasonToUse) {
      alert("Please specify a reason for regularisation.");
      return;
    }

    let newEntriesToAdd = [];
    selectedDates.forEach((dateObj) => {
      const date = dateObj.format("YYYY-MM-DD");
      newEntriesToAdd.push({
        ceid: selectedEmp.ceid,
        name: selectedEmp.name,
        date,
        type: selectedType,
        reason: reasonToUse,
        time,
        status: "Pending"
      });
    });

    const nonDuplicate = newEntriesToAdd.filter(
      (newEntry) =>
        !entries.some((e) => e.ceid === newEntry.ceid && e.date === newEntry.date && e.type === newEntry.type) &&
        !newEntries.some((e, i) => i !== editIndex && e.ceid === newEntry.ceid && e.date === newEntry.date && e.type === newEntry.type)
    );

    if (nonDuplicate.length === 0) {
      alert("All selected entries are duplicates.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...newEntries];
      updated[editIndex] = nonDuplicate[0];
      setNewEntries(updated);
      setEditIndex(null);
    } else {
      setNewEntries([...newEntries, ...nonDuplicate]);
    }

    setSelectedCeid("");
    setSelectedDates([]);
    setSelectedType("");
    setSelectedReason("");
    setCustomReason("");
    setTime("");
  };

  
  const handleDownloadReport = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/report/download");
      if (!response.ok) {
        alert("Failed to download");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RegularisationReport.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred while downloading the report.");
    }
  };


  const handleEdit = (index) => {
    const entry = newEntries[index];
    setSelectedCeid(entry.ceid.toString());
    setSelectedDates([{ format: () => entry.date }]);
    setSelectedType(entry.type);
    setTime(entry.time);
    setSelectedReason(
      ["Traffic", "Public Transport Delay", "Health Issue", "Official Work", "Emergency"].includes(entry.reason)
        ? entry.reason
        : "Other"
    );
    setCustomReason(
      !["Traffic", "Public Transport Delay", "Health Issue", "Official Work", "Emergency"].includes(entry.reason)
        ? entry.reason
        : ""
    );
    setEditIndex(index);
    setActiveTab("Raise Request");
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updated = [...newEntries];
      updated.splice(index, 1);
      setNewEntries(updated);
    }
  };

  const handleSubmit = async () => {
    if (newEntries.length === 0) {
      alert("No new entries to submit.");
      return;
    }

    if (!window.confirm("Do you want to submit the requests?")) return;

    try {
      const response = await fetch("http://localhost:8081/api/regularisation/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntries)
      });

      if (!response.ok) throw new Error("Failed to submit requests.");

      alert("Requests submitted successfully!");
      const submitted = newEntries.map((e) => ({ ...e, status: "Pending" }));
      setEntries([...entries, ...submitted]);
      setNewEntries([]);
      setSelectedCeid("");
      setSelectedDates([]);
      setSelectedType("");
      setSelectedReason("");
      setCustomReason("");
      setTime("");
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  const dataSource = activeTab === "Raise Request" ? newEntries : enrichedEntries;
  const filteredEntries = dataSource.filter((entry) => {
    return (
      (entry.name || "").toLowerCase().includes(filterName.toLowerCase()) &&
      (entry.date || "").includes(filterDate) &&
      (entry.type || "").toLowerCase().includes(filterType.toLowerCase()) &&
      (entry.reason || "").toLowerCase().includes(filterReason.toLowerCase()) &&
      (activeTab === "Raise Request" || (entry.status || "").toLowerCase().includes(filterStatus.toLowerCase()))
    );
  });

  return (
    <div className="container" style={{ paddingTop: "140px" }}>
      <Navbar />
      <div className="drdo-header-center">Regularisation Portal</div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`ea-tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Raise Request" && (
        <>
          <div className="filters">
            <select className="filter-dropdown" value={selectedCeid} onChange={(e) => setSelectedCeid(e.target.value)}>
              <option value="">Select Name</option>
              {availableNames.map((emp) => (
                <option key={emp.ceid} value={emp.ceid}>
                  {emp.name} ({emp.ceid})
                </option>
              ))}
            </select>

            <div className="filter-dropdown">
              <DatePicker
                multiple
                value={selectedDates}
                onChange={setSelectedDates}
                maxDate={new Date()}
                format="YYYY-MM-DD"
                placeholder="Select Dates"
              />
            </div>

            <select className="filter-dropdown" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="In-Time">In-Time</option>
              <option value="Out-Time">Out-Time</option>
            </select>

            <div className="filter-dropdown">
              <label>Time:</label>
              <TimePicker onChange={setTime} value={time} disableClock={true} clearIcon={null} />
            </div>

            <select className="filter-dropdown" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
              <option value="">Select Reason</option>
              <option value="Traffic">Traffic</option>
              <option value="Public Transport Delay">Public Transport Delay</option>
              <option value="Health Issue">Health Issue</option>
              <option value="Official Work">Official Work</option>
              <option value="Emergency">Emergency</option>
              <option value="Other">Other</option>
            </select>

            {selectedReason === "Other" && (
              <input
                type="text"
                className="filter-dropdown"
                placeholder="Enter custom reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            )}
          </div>

          <div className="req-button-wrapper">
            <button className="req-button" onClick={handleAddClick}>
              {editIndex !== null ? "Update" : "+"}
            </button>
          </div>
        </>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filter" /></div></th>
              <th>Date<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} placeholder="YYYY-MM-DD" /></div></th>
              <th>Type<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterType} onChange={(e) => setFilterType(e.target.value)} placeholder="Filter" /></div></th>
              <th>Time</th>
              <th>Reason<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterReason} onChange={(e) => setFilterReason(e.target.value)} placeholder="Filter" /></div></th>
              {activeTab === "Check Status" && (
                <th>Status<div className="filter-icon-wrapper"><Filter size={14} className="filter-icon" /><input className="filter-cell" type="text" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} placeholder="Filter" /></div></th>
              )}
              {activeTab === "Raise Request" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan="7" className="ea-empty-row">
                  No employee records found.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.type}</td>
                  {/* <td>{entry.time}</td> */}
                  <td>{entry.time || "-"}</td>
                  <td>{entry.reason}</td>
                  {activeTab === "Check Status" && <td>{entry.status}</td>}
                  {activeTab === "Raise Request" && (
                    <td>
                      <button className="edit" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                      <button className="delete" onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {activeTab === "Raise Request" && (
        <div className="req-button-wrapper">
          <button className="req-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
       {activeTab === "Check Status" && (
        <div className="req-button-wrapper">
            <button className="request-button" onClick={handleDownloadReport}>Download Report</button>
         </div>
      )}
    </div>
  );
};

export default RegularisationPage;