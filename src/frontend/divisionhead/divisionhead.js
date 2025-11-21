// import React, { useState, useEffect } from "react";
// import Navbar from './Navbar1.js';
// import { Filter } from "lucide-react";
// import "./divisionhead.css";

// const HeadPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   const [filterName, setFilterName] = useState("");
//   const [filterDivision, setFilterDivision] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [filterAction, setFilterAction] = useState("");
  

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8081/api/attendance")
//       .then((res) => res.json())
//       .then((data) => setAttendance(data))
//       .catch((err) => console.error("Attendance fetch error:", err));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/regularisation/pending")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch pending requests");
//         return res.json();
//       })
//       .then((data) => setRequests(data))
//       .catch((err) => console.error("Error fetching pending entries:", err));
//   }, []);

//   const filteredRequests = Array.isArray(requests)
//     ? requests.filter((req) =>
//         req.name?.toLowerCase().includes(filterName.toLowerCase()) &&
//         req.divPaName?.toLowerCase().includes(filterDivision.toLowerCase()) &&
//         req.type?.toLowerCase().includes(filterType.toLowerCase()) &&
//         req.date?.includes(filterDate) &&
//         req.status?.toLowerCase().includes(filterAction.toLowerCase())
//       )
//     : [];

//   const mergedRequests = filteredRequests.map((req) => {
//     const match = attendance.find(
//       (a) => a.ceid === req.ceid && a.date === req.date
//     );
//     return {
//       ...req,
//       rawin: match?.rawin || "---",
//       rawout: match?.rawout || "---",
//     };
//   });

//   const sortedRequests = [...mergedRequests].sort((a, b) => {
//     if (!sortBy) return 0;
//     const valA = a[sortBy]?.toLowerCase?.() || "";
//     const valB = b[sortBy]?.toLowerCase?.() || "";
//     return valA.localeCompare(valB);
//   });

//   const handleStatusUpdate = (index, newStatus) => {
//     const updated = [...requests];
//     updated[index].status = newStatus;
//     setRequests(updated);
//   };

//   const bulkUpdate = (status) => {
//     const updated = requests.map((req) =>
//       filteredRequests.includes(req) ? { ...req, status } : req
//     );
//     setRequests(updated);
//   };

//   const handleSubmit = async () => {
//     const hasPending = requests.some(
//       (req) => !req.status || req.status.toLowerCase() === "pending"
//     );
//     if (hasPending) {
//       alert("Please approve or reject all requests before submitting.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to submit the requests?")) return;

//     try {
//       const res = await fetch(
//         "http://localhost:8081/api/regularisation/update-status",
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requests),
//         }
//       );
//       if (!res.ok) throw new Error(`Server: ${res.status} ${res.statusText}`);

//       const data = await res.json();
//       alert(data.message || "Requests submitted successfully!");

//       const approved = requests.filter(
//         (r) => r.status?.toLowerCase().includes("approved")
//       );
//       if (approved.length > 0) {
//         localStorage.setItem("approvedRequests", JSON.stringify(approved));
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Failed to submit statuses: " + err.message);
//     }
//   };

//   const columns = [
//     { label: "Name", value: filterName, onChange: setFilterName },
//     { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
//     { label: "Type", value: filterType, onChange: setFilterType },
//     { label: "Date", value: filterDate, onChange: setFilterDate },
//     { label: "Actions", isFilter: false },
//     { label: "Status", value: filterAction, onChange: setFilterAction },
//   ];

//   return (

      


//     <div className="container" style={{ paddingTop: "60px" }}>
//       <Navbar />

//       {/* Hamburger Menu */}
//       <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div>

//       {/* Sidebar */}
//       <div className={`sidebar-left ${isSidebarOpen ? "open" : ""}`}>
//         {/* <div className="sidebar-option" title="Filter">
//           {/* 🔍 <p>Filter (use table filters)</p>
//         </div> */} 
//         <div className="sidebar-option" title="Sort by">
//           ↕️ <p>Sort By</p>
//           <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="">None</option>
//             <option value="name">Name</option>
//             <option value="date">Date</option>
//             <option value="divPaName">Division PA</option>
//           </select>
//         </div>
//         <div className="sidebar-option" title="Bulk Actions">
//           ☑️ <p>Bulk Selection</p>
//           <button onClick={() => bulkUpdate("Approved ✅")}>Approve</button>
//           <button onClick={() => bulkUpdate("Rejected ❌")}>Reject</button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-wrapper" style={{ marginLeft: "80px" }}>
//         <table className="table">
//           <thead>
//             <tr>
//               {columns.map((col, i) => (
//                 <th key={i}>
//                   {col.label}
//                   {col.isFilter !== false && (
//                     <div className="filter-icon-wrapper">
//                       <Filter size={14} />
//                       <input
//                         className="filter-cell"
//                         value={col.value}
//                         onChange={(e) => col.onChange(e.target.value)}
//                         placeholder="Filter"
//                       />
//                     </div>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedRequests.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>
//                   No matching requests
//                 </td>
//               </tr>
//             ) : (
//               sortedRequests.map((req, index) => (
//                 <tr key={index}>
//                   <td>{req.name}</td>
//                   <td>{req.divPaName || "N/A"}</td>
//                   <td>{req.type}</td>
//                   <td>{req.date}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="approve" onClick={() => handleStatusUpdate(index, "Approved ✅")}>Approve</button>
//                       <button className="reject" onClick={() => handleStatusUpdate(index, "Rejected ❌")}>Reject</button>
//                     </div>
//                   </td>
//                   <td>
//                     <div className={`status ${req.status?.toLowerCase() || "pending"}`}>
//                       {req.status || "Pending ⏳"}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         <div style={{ marginTop: "20px", textAlign: "right" }}>
//           <button onClick={handleSubmit} className="submit-btn">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeadPage;









// import React, { useState, useEffect } from "react";
// import Navbar from './Navbar1.js';
// import { Filter } from "lucide-react";
// import { ListFilter, CheckSquare } from "lucide-react";

// import "./divisionhead.css";

// const HeadPage = () => {
//   const [requests, setRequests] = useState([]);
//   // const [attendance, setAttendance] = useState([]);

//   const [filterName, setFilterName] = useState("");
//   const [filterDivision, setFilterDivision] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [filterAction, setFilterAction] = useState("");

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("");

//   // useEffect(() => {
//   //   fetch("http://localhost:8081/api/attendance")
//   //     .then((res) => res.json())
//   //     .then((data) => setAttendance(data))
//   //     .catch((err) => console.error("Attendance fetch error:", err));
//   // }, []);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/regularisation/pending")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch pending requests");
//         return res.json();
//       })
//       .then((data) => setRequests(data))
//       .catch((err) => console.error("Error fetching pending entries:", err));
//   }, []);

//   const filteredRequests = Array.isArray(requests)
//     ? requests.filter((req) =>
//         req.name?.toLowerCase().includes(filterName.toLowerCase()) &&
//         req.divPaName?.toLowerCase().includes(filterDivision.toLowerCase()) &&
//         req.type?.toLowerCase().includes(filterType.toLowerCase()) &&
//         req.date?.includes(filterDate) &&
//         req.status?.toLowerCase().includes(filterAction.toLowerCase())
//       )
//     : [];

//   // const mergedRequests = filteredRequests.map((req) => {
//   //   const match = attendance.find(
//   //     (a) => a.ceid === req.ceid && a.date === req.date
//   //   );
//   //   return {
//   //     ...req,
//   //     rawin: match?.rawin || "---",
//   //     rawout: match?.rawout || "---",
//   //   };
//   // });


//   const sortedRequests = [...filteredRequests].sort((a, b) => {
//     if (!sortBy) return 0;
//     const valA = a[sortBy]?.toLowerCase?.() || "";
//     const valB = b[sortBy]?.toLowerCase?.() || "";
//     return valA.localeCompare(valB);
//   });

//   const handleStatusUpdate = (index, newStatus) => {
//     const updated = [...requests];
//     updated[index].status = newStatus;
//     setRequests(updated);
//   };

//   const bulkUpdate = (status) => {
//     const updated = requests.map((req) =>
//       filteredRequests.includes(req) ? { ...req, status } : req
//     );
//     setRequests(updated);
//   };

//   const handleSubmit = async () => {
//     const hasPending = requests.some(
//       (req) => !req.status || req.status.toLowerCase() === "pending"
//     );
//     if (hasPending) {
//       alert("Please approve or reject all requests before submitting.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to submit the requests?")) return;

//     try {
//       const res = await fetch(
//         "http://localhost:8081/api/regularisation/update-status",
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requests),
//         }
//       );
//       if (!res.ok) throw new Error(`Server: ${res.status} ${res.statusText}`);

//       const data = await res.json();
//       alert(data.message || "Requests submitted successfully!");

//       const approved = requests.filter(
//         (r) => r.status?.toLowerCase().includes("approved")
//       );
//       if (approved.length > 0) {
//         localStorage.setItem("approvedRequests", JSON.stringify(approved));
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Failed to submit statuses: " + err.message);
//     }
//   };

//   const columns = [
//     { label: "Name", value: filterName, onChange: setFilterName },
//     { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
//     { label: "Type", value: filterType, onChange: setFilterType },
//     { label: "Date", value: filterDate, onChange: setFilterDate },
//     { label: "Actions", isFilter: false },
//     { label: "Status", value: filterAction, onChange: setFilterAction },
//   ];

//   return (
//     <div className="container" style={{ paddingTop: "150px" }}>
//       <Navbar />

//       {/* Hamburger Menu */}
//       {/* <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div> */}
//       {!isSidebarOpen && (
//   <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
//     <div className="line"></div>
//     <div className="line"></div>
//     <div className="line"></div>
//   </div>
// )}


//       {/* ✅ Sidebar Overlay */}
//       <div
//         className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
//         onClick={() => setIsSidebarOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <div className={`sidebar-left ${isSidebarOpen ? "open" : ""}`}>
//         <h3>Sidebar Menu</h3>
//         <div className="sidebar-option" title="Sort by" style={{ marginTop: '50px' }}>
//           {/* ↕️ <p>Sort By</p> */}
//           <ListFilter size={20}  aria-label="Sort Options" style={{ marginBottom: "6px" }} />
//             <span>Sort By</span>
//           <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="">None</option>
//             <option value="name">Name</option>
//             <option value="date">Date</option>
//             <option value="divPaName">Division PA</option>
//           </select>
//         </div>
//         <div className="sidebar-option" title="Bulk Actions">
//           {/* ☑️ <p>Bulk Selection</p> */}
//           <CheckSquare size={20}  aria-label="Bulk Actions" style={{ marginBottom: "6px" }} />
//           <span>Bulk Selection</span>
//           <button onClick={() => bulkUpdate("Approved ✅")}>Approve</button>
//           <button onClick={() => bulkUpdate("Rejected ❌")}>Reject</button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-wrapper" style={{ marginLeft: "80px" }}>
//         <table className="table">
//           <thead>
//             <tr>
//               {columns.map((col, i) => (
//                 <th key={i}>
//                   {col.label}
//                   {col.isFilter !== false && (
//                     <div className="filter-icon-wrapper">
//                       <Filter size={14} />
//                       <input
//                         className="filter-cell"
//                         value={col.value}
//                         onChange={(e) => col.onChange(e.target.value)}
//                         placeholder="Filter"
//                       />
//                     </div>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedRequests.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>
//                   No matching requests
//                 </td>
//               </tr>
//             ) : (
//               sortedRequests.map((req, index) => (
//                 <tr key={index}>
//                   <td>{req.name}</td>
//                   <td>{req.divPaName || "N/A"}</td>
//                   <td>{req.type}</td>
//                   <td>{req.date}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="approve" onClick={() => handleStatusUpdate(index, "Approved ✅")}>Approve</button>
//                       <button className="reject" onClick={() => handleStatusUpdate(index, "Rejected ❌")}>Reject</button>
//                     </div>
//                   </td>
//                   <td>
//                     <div className={`status ${req.status?.toLowerCase() || "pending"}`}>
//                       {req.status || "Pending ⏳"}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         <div style={{ marginTop: "20px", textAlign: "right" }}>
//           <button onClick={handleSubmit} className="submit-btn">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeadPage;









import React, { useState, useEffect } from "react";
import Navbar from './Navbar1.js';
import { Filter, ListFilter, CheckSquare } from "lucide-react";
import "./divisionhead.css";

const HeadPage = () => {
  const [requests, setRequests] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAction, setFilterAction] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Fetch pending regularisation requests from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/regularisation/pending")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pending requests");
        return res.json();
      })
      .then((data) => setRequests(data))
     
      .catch((err) => console.error("Error fetching pending entries:", err));
  }, []);
  

  // const filteredRequests = requests.filter((req) =>
  //   req.name?.toLowerCase().includes(filterName.toLowerCase()) &&
  //   req.divPaName?.toLowerCase().includes(filterDivision.toLowerCase()) &&
  //   req.type?.toLowerCase().includes(filterType.toLowerCase()) &&
  //   req.date?.includes(filterDate) &&
  //   req.status?.toLowerCase().includes(filterStatus.toLowerCase())
  // );
  const filteredRequests = Array.isArray(requests)
  ? requests.filter((req) =>
      (!filterName || req.name?.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterDivision || req.divPaName?.toLowerCase().includes(filterDivision.toLowerCase())) &&
      (!filterType || req.type?.toLowerCase().includes(filterType.toLowerCase())) &&
      (!filterDate || req.date?.includes(filterDate)) &&
      (!filterAction || req.status?.toLowerCase().includes(filterAction.toLowerCase()))
    )
  : [];


  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = a[sortBy]?.toLowerCase?.() || "";
    const valB = b[sortBy]?.toLowerCase?.() || "";
    return valA.localeCompare(valB);
  });

  const handleStatusUpdate = (index, newStatus) => {
    const updated = [...requests];
    updated[index].status = newStatus;
    setRequests(updated);
  };

  const bulkUpdate = (status) => {
    const updated = requests.map((req) =>
      filteredRequests.includes(req) ? { ...req, status } : req
    );
    setRequests(updated);
  };

  const handleSubmit = async () => {
    const hasPending = requests.some(
      (req) => !req.status || req.status.toLowerCase() === "pending"
    );
    if (hasPending) {
      alert("Please approve or reject all requests before submitting.");
      return;
    }

    if (!window.confirm("Are you sure you want to submit the requests?")) return;

    try {
      const res = await fetch(
        "http://localhost:8081/api/regularisation/update-status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requests),
        }
      );

      if (!res.ok) throw new Error(`Server: ${res.status} ${res.statusText}`);

      const data = await res.json();
      alert(data.message || "Requests submitted successfully!");

      const approved = requests.filter((r) => r.status?.toLowerCase().includes("approved"));
      if (approved.length > 0) {
        localStorage.setItem("approvedRequests", JSON.stringify(approved));
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit statuses: " + err.message);
    }
  };

  const columns = [
    { label: "Name", value: filterName, onChange: setFilterName },
    { label: "Division PA", value: filterDivision, onChange: setFilterDivision },
    { label: "Type", value: filterType, onChange: setFilterType },
    { label: "Time", value: filterType },
    { label: "Date", value: filterDate, onChange: setFilterDate },
    { label: "Reason", value: filterDate },
    { label: "Actions", isFilter: false , onChange: setFilterAction },
    { label: "Status", value: filterStatus, onChange: setFilterStatus },
  ];

  return (
    <div className="container" style={{ paddingTop: "150px" }}>
      <Navbar />

      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar-left ${isSidebarOpen ? "open" : ""}`}>
        <h3>Sidebar Menu</h3>
        <div className="sidebar-option" style={{ marginTop: '50px' }}>
          <ListFilter size={20} aria-label="Sort Options" style={{ marginBottom: "6px" }} />
          <span>Sort By</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="divPaName">Division PA</option>
          </select>
        </div>
        <div className="sidebar-option">
          <CheckSquare size={20} aria-label="Bulk Actions" style={{ marginBottom: "6px" }} />
          <span>Bulk Selection</span>
          <button onClick={() => bulkUpdate("In Progress")}>Accept</button>
          <button onClick={() => bulkUpdate("Rejected ❌")}>Reject</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper" style={{ marginLeft: "80px" }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>
                  {col.label}
                  {col.isFilter !== false && (
                    <div className="filter-icon-wrapper">
                      <Filter size={14} />
                      <input
                        className="filter-cell"
                        value={col.value}
                        onChange={(e) => col.onChange(e.target.value)}
                        placeholder="Filter"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRequests.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No matching requests
                </td>
              </tr>
            ) : (
              sortedRequests.map((req, index) => (
                <tr key={index}>
                  <td>{req.name}</td>
                  <td>{req.divPaName || "N/A"}</td>
                  <td>{req.type}</td>
                  <td>{req.time}</td>
                  <td>{req.date}</td>
                  <td>{req.reason}</td>
                  {/* <td>
                    <button className="approve" onClick={() => handleStatusUpdate(index, "Approved ✅")}>Approve</button>
                    <button className="reject" onClick={() => handleStatusUpdate(index, "Rejected ❌")}>Reject</button>
                  </td> */}
                  <td>
  <div className="action-buttons">
    <button className="approve" onClick={() => handleStatusUpdate(index, "In Progress")}>
      Accept
    </button>
    <button className="reject" onClick={() => handleStatusUpdate(index, "Rejected ❌")}>
      Reject
    </button>
  </div>
</td>

                  <td>
                    <div className={`status ${req.status?.toLowerCase() || "pending"}`}>
                      {req.status || "Pending ⏳"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default HeadPage;

