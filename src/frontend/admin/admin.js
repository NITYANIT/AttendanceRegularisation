// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar2.js";
// import { Filter } from "lucide-react";
// import "./admincss.css";

// const AdminPage = () => {
//   const [filterName, setFilterName] = useState("");
//   const [filterDivision, setFilterDivision] = useState("");
//   const [filterHead, setFilterHead] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [approved, setApproved] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]); // ✅ new

//   // Load approved requests from localStorage
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("approvedRequests") || "[]");
//     console.log("from localStorage:", data);
//     setApproved(data);
//   }, []);

//   // Listen for localStorage updates
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "approvedRequests") {
//         const newData = JSON.parse(event.newValue || "[]");
//         setApproved(newData);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   // Fetch employees from backend
//   useEffect(() => {
//     fetch("http://localhost:8081/api/employees/all")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error("Failed to fetch employees:", err));
//   }, []);

//   // ✅ Fetch attendance data
//   useEffect(() => {
//     fetch("http://localhost:8081/api/attendance")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched attendance:", data);
//         setAttendance(data);
//       })
//       .catch((err) => console.error("Attendance fetch error:", err));
//   }, []);

//   const handleAccept = () => {
//     alert("Accepted!");
//   };

//   // ✅ Enrich requests with head + rawin/rawout
//   const enrichedRequests = approved.map((req) => {
//     const emp = employees.find((e) => e.ceid === req.ceid);
//     const match = attendance.find(
//       (a) => a.ceid === req.ceid && a.date === req.date
//     );

//     return {
//       ...req,
//       divheadname: emp?.divheadname || "Unknown Head",
//       rawin: match?.rawin || "NA",
//       rawout: match?.rawout || "NA",
//     };
//   });

//   const filteredRequests = enrichedRequests.filter((req) =>
//     (req.name || "").toLowerCase().includes(filterName.toLowerCase()) &&
//     (req.divpaname || "").toLowerCase().includes(filterDivision.toLowerCase()) &&
//     (req.divheadname || "").toLowerCase().includes(filterHead.toLowerCase()) &&
//     (req.type || "").toLowerCase().includes(filterType.toLowerCase()) &&
//     (req.date || "").includes(filterDate)
//   );

//   const columns = [
//     { label: "Name", value: filterName, onChange: setFilterName },
//     { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
//     { label: "Division Head", value: filterHead, onChange: setFilterHead },
//     { label: "Type", value: filterType, onChange: setFilterType },
//     { label: "Date", value: filterDate, onChange: setFilterDate },
//     // { label: "Raw In", value: "", onChange: () => {} },
//     // { label: "Raw Out", value: "", onChange: () => {} },
//   ];

//   return (
//     <div className="container" style={{ paddingTop: "60px" }}>
//       <Navbar />
//       <h2>Requests</h2>

//       {approved.length === 0 ? (
//         <p>No approved requests available.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="table">
//             <thead>
//               <tr>
//                 {columns.map((col, i) => (
//                   <th key={i}>
//                     {col.label}
//                     {col.onChange !== (() => {}) && (
//                       <div className="filter-icon-wrapper">
//                         <Filter size={14} />
//                         <input
//                           className="filter-cell"
//                           value={col.value}
//                           onChange={(e) => col.onChange(e.target.value)}
//                           placeholder="Filter"
//                         />
//                       </div>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length} style={{ textAlign: "center" }}>
//                     No matching requests
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((req, index) => (
//                   <tr key={index}>
//                     <td>{req.name || "No Name"}</td>
//                     <td>{req.divpaname || "No Division PA"}</td>
//                     <td>{req.divheadname || "Unknown Head"}</td>
//                     <td>{req.type || "No Type"}</td>
//                     <td>{req.date || "No Date"}</td>
//                     {/* <td>{req.rawin}</td>
//                     <td>{req.rawout}</td> */}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <button onClick={handleAccept} className="submit-btn">
//               Accept
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;











// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar2.js";
// import { Filter } from "lucide-react";
// import "./admincss.css";

// const AdminPage = () => {
//   const [filterName, setFilterName] = useState("");
//   const [filterDivision, setFilterDivision] = useState("");
//   const [filterHead, setFilterHead] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [approved, setApproved] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Load approved requests from localStorage
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("approvedRequests") || "[]");
//     console.log("from localStorage:", data);
//     setApproved(data);
//   }, []);

//   // Listen for localStorage updates
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "approvedRequests") {
//         const newData = JSON.parse(event.newValue || "[]");
//         setApproved(newData);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   // Fetch employees from backend
//   useEffect(() => {
//     fetch("http://localhost:8081/api/employees/all")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error("Failed to fetch employees:", err));
//   }, []);

//   // Fetch attendance data
//   useEffect(() => {
//     fetch("http://localhost:8081/api/attendance")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched attendance:", data);
//         setAttendance(data);
//       })
//       .catch((err) => console.error("Attendance fetch error:", err));
//   }, []);

//   const handleApprove = (req) => {
//     console.log("Approved:", req);
//     // Add your API call or logic here
//   };

//   const handleReject = (req) => {
//     console.log("Rejected:", req);
//     // Add your API call or logic here
//   };

//   const enrichedRequests = approved.map((req) => {
//     const emp = employees.find((e) => e.ceid === req.ceid);
//     const match = attendance.find(
//       (a) => a.ceid === req.ceid && a.date === req.date
//     );

//     return {
//       ...req,
//       divheadname: emp?.divheadname || "Unknown Head",
//       rawin: match?.rawin || "NA",
//       rawout: match?.rawout || "NA",
//     };
//   });

//   const filteredRequests = enrichedRequests.filter((req) =>
//     (req.name || "").toLowerCase().includes(filterName.toLowerCase()) &&
//     (req.divpaname || "").toLowerCase().includes(filterDivision.toLowerCase()) &&
//     (req.divheadname || "").toLowerCase().includes(filterHead.toLowerCase()) &&
//     (req.type || "").toLowerCase().includes(filterType.toLowerCase()) &&
//     (req.date || "").includes(filterDate)
//   );

//   const columns = [
//     { label: "Name", value: filterName, onChange: setFilterName },
//     { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
//     { label: "Division Head", value: filterHead, onChange: setFilterHead },
//     { label: "Type", value: filterType, onChange: setFilterType },
//     { label: "Date", value: filterDate, onChange: setFilterDate },
//   ];

//   return (
//     <div className="container" style={{ paddingTop: "60px" }}>
//       <Navbar />
//             {!isSidebarOpen && (
//   <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
//     <div className="line"></div>
//     <div className="line"></div>
//     <div className="line"></div>
//   </div>
// )}
// {/* ✅ Sidebar Overlay */}
//       <div
//         className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
//         onClick={() => setIsSidebarOpen(false)}
//       ></div>
//       <h2>Requests</h2>

//       {approved.length === 0 ? (
//         <p>No approved requests available.</p>
//       ) : (
        
//         <div className="table-wrapper">
//           <table className="table">
//             <thead>
//               <tr>
//                 {columns.map((col, i) => (
//                   <th key={i}>
//                     {col.label}
//                     <div className="filter-icon-wrapper">
//                       <Filter size={14} />
//                       <input
//                         className="filter-cell"
//                         value={col.value}
//                         onChange={(e) => col.onChange(e.target.value)}
//                         placeholder="Filter"
//                       />
//                     </div>
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
//                     No matching requests
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((req, index) => (
//                   <tr key={index}>
//                     <td>{req.name || "No Name"}</td>
//                     <td>{req.divpaname || "No Division PA"}</td>
//                     <td>{req.divheadname || "Unknown Head"}</td>
//                     <td>{req.type || "No Type"}</td>
//                     <td>{req.date || "No Date"}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button className="approve-btn" onClick={() => handleApprove(req)}>
//                         Approve
//                       </button>
//                       <button className="reject-btn" onClick={() => handleReject(req)} style={{ marginLeft: "8px" }}>
//                         Reject
//                       </button>
//                       </div>
                      
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <button onClick={() => alert("Accepted!")} className="submit-btn">
//               Accept
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;









// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar2.js";
// import { Filter, CheckSquare, ListFilter } from "lucide-react";
// import "./admincss.css";

// const AdminPage = () => {
//   const [filterName, setFilterName] = useState("");
//   const [filterDivision, setFilterDivision] = useState("");
//   const [filterHead, setFilterHead] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [requests, setRequests] = useState([]);
//   const [approved, setApproved] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("");

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("approvedRequests") || "[]");
//     setApproved(data);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "approvedRequests") {
//         const newData = JSON.parse(event.newValue || "[]");
//         setApproved(newData);
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/employees/all")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error("Failed to fetch employees:", err));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/attendance")
//       .then((res) => res.json())
//       .then((data) => setAttendance(data))
//       .catch((err) => console.error("Attendance fetch error:", err));
//   }, []);

//   const handleStatusUpdate = (index, newStatus) => {
//      const updated = [...requests];
//     updated[index].status = newStatus;
//     setRequests(updated);
//   };


//   const bulkUpdate = (status) => {
//     console.log(`Bulk ${status}`);
//     // Implement logic for bulk approval or rejection
//      const updated = requests.map((req) =>
//       filteredRequests.includes(req) ? { ...req, status } : req
//     );
//     setRequests(updated);
//   };

//   const enrichedRequests = approved.map((req) => {
//     const emp = employees.find((e) => e.ceid === req.ceid);
//     const match = attendance.find(
//       (a) => a.ceid === req.ceid && a.date === req.date
//     );
//     return {
//       ...req,
//       divheadname: emp?.divheadname || "Unknown Head",
//       rawin: match?.rawin || "NA",
//       rawout: match?.rawout || "NA",
//     };
//   });

//   const filteredRequests = enrichedRequests.filter((req) =>
//     (req.name || "").toLowerCase().includes(filterName.toLowerCase()) &&
//     (req.divpaname || "").toLowerCase().includes(filterDivision.toLowerCase()) &&
//     (req.divheadname || "").toLowerCase().includes(filterHead.toLowerCase()) &&
//     (req.type || "").toLowerCase().includes(filterType.toLowerCase()) &&
//     (req.date || "").includes(filterDate)
//   );

//   const columns = [
//     { label: "Name", value: filterName, onChange: setFilterName },
//     { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
//     { label: "Division Head", value: filterHead, onChange: setFilterHead },
//     { label: "Type", value: filterType, onChange: setFilterType },
//     { label: "Date", value: filterDate, onChange: setFilterDate },
//   ];

//   return (
//     <div className="container" style={{ paddingTop: "60px" }}>
//       <Navbar />

//       {/* Hamburger Icon */}
//       {!isSidebarOpen && (
//         <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
//           <div className="line"></div>
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//       )}

//       {/* Sidebar Overlay */}
//       <div
//         className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
//         onClick={() => setIsSidebarOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <div className={`sidebar-left ${isSidebarOpen ? "open" : ""}`}>
//         <h3 style={{ paddingLeft: "10px" }}>Sidebar Menu</h3>
//         <div className="sidebar-option" title="Sort by" style={{ marginTop: '40px' }}>
//           <ListFilter size={20} style={{ marginBottom: "6px" }} />
//           <span>Sort By</span>
//           <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="">None</option>
//             <option value="name">Name</option>
//             <option value="date">Date</option>
//             <option value="divpaname">Division PA</option>
//           </select>
//         </div>

//         <div className="sidebar-option" title="Bulk Actions">
//           <CheckSquare size={20} style={{ marginBottom: "6px" }} />
//           <span>Bulk Selection</span>
//           <button onClick={() => bulkUpdate("Approved ✅")}>Approve</button>
//           <button onClick={() => bulkUpdate("Rejected ❌")}>Reject</button>
//         </div>
//       </div>

//       <h2>Requests</h2>

//       {approved.length === 0 ? (
//         <p>No approved requests available.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="table">
//             <thead>
//               <tr>
//                 {columns.map((col, i) => (
//                   <th key={i}>
//                     {col.label}
//                     <div className="filter-icon-wrapper">
//                       <Filter size={14} />
//                       <input
//                         className="filter-cell"
//                         value={col.value}
//                         onChange={(e) => col.onChange(e.target.value)}
//                         placeholder="Filter"
//                       />
//                     </div>
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
//                     No matching requests
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((req, index) => (
//                   <tr key={index}>
//                     <td>{req.name || "No Name"}</td>
//                     <td>{req.divpaname || "No Division PA"}</td>
//                     <td>{req.divheadname || "Unknown Head"}</td>
//                     <td>{req.type || "No Type"}</td>
//                     <td>{req.date || "No Date"}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button className="approve-btn" onClick={() => handleStatusUpdate(req)}>
//                           Approve
//                         </button>
//                         <button className="reject-btn" onClick={() => handleStatusUpdate(req)} style={{ marginLeft: "8px" }}>
//                           Reject
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <button onClick={() => alert("Accepted!")} className="submit-btn">
//               Accept
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPage;







import React, { useState, useEffect } from "react";
import Navbar from "./Navbar2.js";
import { Filter, CheckSquare, ListFilter } from "lucide-react";
import "./admincss.css";

const AdminPage = () => {
  const [filterName, setFilterName] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterHead, setFilterHead] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  // const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  const [employees, setEmployees] = useState([]);
   const [attendance, setAttendance] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/employees/all")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Failed to fetch employees:", err));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8081/api/attendance")
  //     .then((res) => res.json())
  //     .then((data) => setAttendance(data))
  //     .catch((err) => console.error("Attendance fetch error:", err));
  // }, []);

  useEffect(() => {
  fetch("http://localhost:8081/api/regularisation/in-progress")
    .then((res) => res.json())
    .then((data) => setApproved(data))  // these are the "in progress" requests
    .catch((err) => console.error("Failed to fetch in-progress requests:", err));
}, []);


  // const enrichedRequests = approved.map((req) => {
  //   const emp = employees.find((e) => e.ceid === req.ceid);
  //   const match = attendance.find((a) => a.ceid === req.ceid && a.date === req.date);
  //   return {
  //     ...req,
  //     divheadname: emp?.divheadname || "Unknown Head",
  //     rawin: match?.rawin || "NA",
  //     rawout: match?.rawout || "NA",
  //   };
  // });
  const enrichedRequests = approved.map((req) => {
  const emp = employees.find((e) => e.ceid === req.ceid);
  const match = attendance.find((a) => a.ceid === req.ceid && a.date === req.date);

  return {
    ...req,
    name: emp?.name || "No Name",
    divpaname: emp?.divpaname || "No Division PA",
    divheadname: emp?.divheadname || "Unknown Head",
    rawin: match?.rawin || "NA",
    rawout: match?.rawout || "NA",
  };
});


  const filteredRequests = enrichedRequests.filter((req) =>
    (req.name || "").toLowerCase().includes(filterName.toLowerCase()) &&
    (req.divpaname || "").toLowerCase().includes(filterDivision.toLowerCase()) &&
    (req.divheadname || "").toLowerCase().includes(filterHead.toLowerCase()) &&
    (req.type || "").toLowerCase().includes(filterType.toLowerCase()) &&
    (req.date || "").includes(filterDate)
  );

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = a[sortBy]?.toLowerCase?.() || "";
    const valB = b[sortBy]?.toLowerCase?.() || "";
    return valA.localeCompare(valB);
  });

  const handleStatusUpdate = (index, newStatus) => {
    const updated = [...approved];
    updated[index].status = newStatus;
    setApproved(updated);
   
  };

 
  const bulkUpdate = (status) => {
  const filteredKeys = new Set(filteredRequests.map(req => `${req.ceid}_${req.date}`));
  const updated = approved.map(req =>
    filteredKeys.has(`${req.ceid}_${req.date}`) ? { ...req, status } : req
  );
  setApproved(updated);
  
};


// const handleAccept = async () => {
//   const toUpdate = approved.filter(req => req.status === "Approved ✅" || req.status === "Rejected ❌");
//   const approvedItems = approved.filter(item => item.status === "Approved ✅");

//   const confirm = window.confirm("Do you really want to submit?");
//   if (!confirm) return;

//   try {
//     // Step 1: Update statuses (Approved + Rejected)
//     const statusResponse = await fetch("http://localhost:8081/api/regularisation/bulk-update", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(toUpdate),
//     });

//     if (!statusResponse.ok) {
//       alert("❌ Failed to update statuses");
//       return;
//     }

//     // Step 2: Send only approved to /approved/only
//     const approvedResponse = await fetch("http://localhost:8081/approved/only", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(approvedItems),
//     });

//     if (!approvedResponse.ok) {
//       throw new Error("❌ Failed to save approved entries");
//     }

//     alert("✅ Statuses updated and approved requests saved!");
//     console.log("Approved entries sent successfully.");
    
//   } catch (err) {
//     console.error("⚠️ Error during backend update:", err);
//     alert("⚠️ Something went wrong during the submission.");
//   }
// };

const handleAccept = async () => {
  const toUpdate = approved.filter(
    (req) => req.status === "Approved ✅" || req.status === "Rejected ❌"
  );

  const confirm = window.confirm("Do you really want to submit?");
  if (!confirm) return;

  try {
    const res = await fetch("http://localhost:8081/api/regularisation/bulk-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toUpdate),
    });

    if (!res.ok) {
      alert("❌ Failed to update statuses");
      return;
    }

    alert("✅ Statuses updated successfully!");

    // Refetch updated data
    const refreshed = await fetch("http://localhost:8081/api/regularisation/in-progress")
      .then((r) => r.json());
    setApproved(refreshed);

  } catch (err) {
    console.error("⚠️ Error during backend update:", err);
    alert("⚠️ Something went wrong during the submission.");
  }
};



  const columns = [
    { label: "Name", value: filterName, onChange: setFilterName },
    // { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
    { label: "Division Head", value: filterHead, onChange: setFilterHead },
    { label: "Type", value: filterType, onChange: setFilterType },
    { label: "Time", value: filterType },
    { label: "Date", value: filterDate, onChange: setFilterDate },
    { label: "Reason", value: filterDate },
  ];

  return (
    <div className="container" style={{ paddingTop: "150px",  paddingLeft:"80px"}}>
      <Navbar />

      {!isSidebarOpen && (
        <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}

      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className={`sidebar-left ${isSidebarOpen ? "open" : ""}`}>
        <h3 style={{ paddingLeft: "10px" }}>Sidebar Menu</h3>
        <div className="sidebar-option" title="Sort by" style={{ marginTop: '40px' }}>
          <ListFilter size={20} style={{ marginBottom: "6px" }} />
          <span>Sort By</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="divpaname">Division Head</option>
          </select>
        </div>

        <div className="sidebar-option" title="Bulk Actions">
          <CheckSquare size={20} style={{ marginBottom: "6px" }} />
          <span>Bulk Selection</span>
          <button onClick={() => bulkUpdate("Approved ✅")}>Approve</button>
          <button onClick={() => bulkUpdate("Rejected ❌")}>Reject</button>
        </div>
      </div>

      
      <div className="drdo-header-center">Requests</div>

      {approved.length === 0 ? (
        <p>No approved requests available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i}>
                    {col.label}
                    <div className="filter-icon-wrapper">
                      <Filter size={14} />
                      <input
                        className="filter-cell"
                        value={col.value}
                        onChange={(e) => col.onChange(e.target.value)}
                        placeholder="Filter"
                      />
                    </div>
                  </th>
                ))}
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} style={{ textAlign: "center" }}>
                    No matching requests
                  </td>
                </tr>
              ) : (
                sortedRequests.map((req, index) => (
                  <tr key={index}>
                    <td>{req.name || "No Name"}</td>
                    {/* <td>{req.divpaname || "No Division PA"}</td> */}
                    <td>{req.divheadname || "Unknown Head"}</td>
                    <td>{req.type || "No Type"}</td>
                    <td>{req.time || "--"}</td>
                    <td>{req.date || "No Date"}</td>
                    <td>{req.reason || "No Reason"}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusUpdate(index, "Approved ✅")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusUpdate(index, "Rejected ❌")}
                          style={{ marginLeft: "8px" }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                    <td>{req.status || "Pending ⏳"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={(handleAccept)} className="submit-btn">
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
