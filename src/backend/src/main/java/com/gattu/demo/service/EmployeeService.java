//package com.gattu.demo.service;
//
//import com.gattu.demo.Employee;
//import com.gattu.demo.dao.EmployeeRepo;
//import com.gattu.demo.dto.EmployeeDTO;
//
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EmployeeService {
//
//    private final EmployeeRepo repository;
//
//    public EmployeeService(EmployeeRepo repository) {
//        this.repository = repository;
//    }
//
//    public List<String> getAllEmployeeNames() {
//        return repository.findAll()
//                         .stream()
//                         .map(Employee::getName)
//                         .toList();
//    }
//    
//    public List<EmployeeDTO> getAllRequestsWithDivisionHead() {
//        return repository.fetchAllWithDivisionHead();
//    }
//
//}


package com.gattu.demo.service;

import com.gattu.demo.Employee;
import com.gattu.demo.dao.EmployeeRepo;
import com.gattu.demo.dto.EmployeeDTO;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepo repository;

    public EmployeeService(EmployeeRepo repository) {
        this.repository = repository;
    }

    public List<String> getAllEmployeeNames() {
        return repository.findAll()
                         .stream()
                         .map(Employee::getName)
                         .collect(Collectors.toList());
    }
    
    public List<EmployeeDTO> getAllRequestsWithDivisionHead() {
        return repository.fetchAllWithDivisionHead();
    }
}

