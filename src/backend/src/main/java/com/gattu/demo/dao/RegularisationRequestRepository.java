package com.gattu.demo.dao;

import com.gattu.demo.RegularisationRequest;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegularisationRequestRepository extends JpaRepository<RegularisationRequest, Integer> {

    // ✅ Find all requests by status
    List<RegularisationRequest> findByStatus(String status);

    // ✅ Update status by ceid and date
    @Modifying
    @Transactional
    @Query("UPDATE RegularisationRequest r SET r.status = :status WHERE r.ceid = :ceid AND r.date = :date")
    void updateStatus(@Param("ceid") String ceid, @Param("date") LocalDate date, @Param("status") String status);

    // ✅ Get pending requests with joined employee details (for frontend DTO)
    @Query("SELECT r FROM RegularisationRequest r JOIN FETCH r.employee WHERE r.status = 'Pending'")
    List<RegularisationRequest> findPendingWithEmployee();

    // ✅ Find request by ceid
    Optional<RegularisationRequest> findByCeid(String ceid);

	List<RegularisationRequest> findByStatusIgnoreCase(String status);

	Optional<RegularisationRequest> findByCeidAndDate(String ceid, LocalDate date);

	
}
