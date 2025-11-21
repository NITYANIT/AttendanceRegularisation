//package com.gattu.demo.dao;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import com.gattu.demo.ApprovedRequests;
//import com.gattu.demo.dto.ApprovedRequestDTO;
//
//public interface ApprovedRequestsRepo extends JpaRepository<ApprovedRequests, Integer> {
//	
//	List<ApprovedRequests> findByRegularisationRequest_Ceid(String ceid);
//
//    // ✅ Optional: Eager fetch to avoid N+1 problem
//    @Query("""
//        SELECT a 
//        FROM ApprovedRequests a
//        JOIN FETCH a.regularisationRequest
//    """)
//    List<ApprovedRequests> fetchWithRequestData();
//
//    // ✅ Optional: Projection to DTO if you need flat joined data
// 
//    @Query("""
//    	    SELECT new com.gattu.demo.dto.ApprovedRequestDTO(
//    	        a.sno,
//    	        a.regularisationRequest.ceid,
//    	        a.approvedAt,
//    	        a.regularisationRequest.requestedAt,
//    	        a.regularisationRequest.date,
//    	        a.regularisationRequest.type
//    	    )
//    	    FROM ApprovedRequests a
//    	""")
//    	List<ApprovedRequestDTO> getJoinedApprovedRequests();
//
//
//    // ❌ Removed: findBySno(Integer) – use inherited findById(Integer)
//}
