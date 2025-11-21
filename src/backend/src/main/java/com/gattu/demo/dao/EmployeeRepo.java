//package com.gattu.demo.dao;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import com.gattu.demo.Employee;
//import com.gattu.demo.dto.EmployeeDTO;
//
//public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
//    Employee findByCeid(int ceid);
//
//    @Query("SELECT new com.gattu.demo.dto.EmployeeDTO(e.ceid, e.name, e.divpaid, e.divpaname)\r\n"
//    		+ "FROM Employee e\r\n"
//    		+ "WHERE e.divpaname IS NOT NULL\r\n"
//    		+ "") 
//	List<EmployeeDTO> fetchAllWithDivisionHead();
//}


package com.gattu.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gattu.demo.Employee;
import com.gattu.demo.dto.EmployeeDTO;

public interface EmployeeRepo extends JpaRepository<Employee, String> {
    
    Employee findByCeid(String ceid);    
    
    @Query("SELECT new com.gattu.demo.dto.EmployeeDTO(e.ceid, e.name, e.divpaid, e.divpaname, e.divheadid, e.divheadname) " +
    	       "FROM Employee e " +
    	       "WHERE e.divpaname IS NOT NULL")
    	List<EmployeeDTO> fetchAllWithDivisionHead();

}
