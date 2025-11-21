//
//package com.gattu.demo.controller;
//
//import com.gattu.demo.Employee;
//import com.gattu.demo.RegularisationRequest;
//import com.gattu.demo.dao.EmployeeRepo;
//import com.gattu.demo.dto.EmployeeDTO;
//import com.gattu.demo.service.EmployeeService;
//
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/employees")
//@CrossOrigin(origins = "http://localhost:3000")
//public class EmployeeController {
//
//    private final EmployeeRepo repository;
//    private final EmployeeService service;
//
//    public EmployeeController(EmployeeService service, EmployeeRepo repository) {
//        this.service = service;
//        this.repository = repository;
//    }
//
//    @GetMapping("/names")
//    public List<EmployeeDTO> getEmployeeNamesWithCeid() {
//        List<Employee> all = repository.findAll();
//        return all.stream()
//                  .map(emp -> new EmployeeDTO(emp.getCeid(), emp.getName()))
//                  .collect(Collectors.toList());
//    }
//
//    @GetMapping("/all")
//    public List<EmployeeDTO> getAllRequests() {
//        return service.getAllRequestsWithDivisionHead();
//    }
//}


package com.gattu.demo.controller;

//import com.gattu.demo.Employee;
import com.gattu.demo.dao.EmployeeRepo;
import com.gattu.demo.dto.EmployeeDTO;
import com.gattu.demo.service.EmployeeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeRepo repository;
    private final EmployeeService service;

    public EmployeeController(EmployeeService service, EmployeeRepo repository) {
        this.service = service;
        this.repository = repository;
    }

    // Endpoint to return basic employee info (ceid and name)
    @GetMapping("/names")
    public List<EmployeeDTO> getEmployeeNamesWithCeid() {
        return repository.findAll()
                         .stream()
                         .map(emp -> new EmployeeDTO(emp.getCeid(), emp.getName()))
                         .collect(Collectors.toList());
    }

    // Endpoint to return employee info including division head details
    @GetMapping("/all")
    public List<EmployeeDTO> getAllRequests() {
        return service.getAllRequestsWithDivisionHead();
    }
}
