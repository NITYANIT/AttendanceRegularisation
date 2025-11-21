package com.gattu.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gattu.demo.Employee;
import com.gattu.demo.RegularisationRequest;
import com.gattu.demo.dao.EmployeeRepo;
import com.gattu.demo.dao.RegularisationRequestRepository;
import com.gattu.demo.dto.RegularisationRequestDTO;

@Service
public class RegularisationRequestService {

    @Autowired
    private EmployeeRepo empRepo;

    @Autowired
    private RegularisationRequestRepository requestRepo;

    public void submitRequests(List<RegularisationRequestDTO> requests) {
        for (RegularisationRequestDTO dto : requests) {
           Employee emp = empRepo.findByCeid(dto.getCeid());
            if (emp == null) {
                throw new RuntimeException("Employee not found for CEID: " + dto.getCeid());
            }

            RegularisationRequest req = new RegularisationRequest();
            req.setCeid(emp.getCeid());
//            req.setName(emp.getName());
//            req.setDivPaId(emp.getDivpaid());
//            req.setDivPaName(emp.getDivpaname());
            req.setDate(dto.getDate());
            req.setType(dto.getType());
            req.setRequestedAt(LocalDate.now());
            req.setStatus("Pending");
            req.setReason(dto.getReason());
            req.setTime(dto.getTime());
            requestRepo.save(req);
        }
    }

	public List<RegularisationRequest> getAllRequests() {
		// TODO Auto-generated method stub
		
		 return requestRepo.findAll();
	}
	public List<RegularisationRequestDTO> getPendingDTOs() {
	    List<RegularisationRequest> requests = requestRepo.findByStatus("Pending");

	    return requests.stream().map(request -> {
	        Employee emp = request.getEmployee();  // get via @ManyToOne mapping
//	        System.out.println("Request CEID: " + request.getCeid() + ", Employee: " + emp);

	        return new RegularisationRequestDTO(
	            request.getSno(),
	            request.getCeid(),
	            emp != null ? emp.getName() : null,
	            emp != null ? emp.getDivpaid() : null,
	            emp != null ? emp.getDivpaname() : null,
	            request.getDate(),
	            request.getType(),
	            request.getStatus(),
	            request.getRequestedAt(),
	            request.getAcceptedAt(),
	            request.getReason(),
	            request.getTime()
	        );
	    }).toList();
	}

//	 public void updateStatus(String string, LocalDate date, String status) {
//	        requestRepo.updateStatus(string, date, status);
//	    }

	 public void updateStatus(String ceid, LocalDate date, String status) {
		    Optional<RegularisationRequest> optional = requestRepo.findByCeidAndDate(ceid, date);
		    if (optional.isPresent()) {
		        RegularisationRequest req = optional.get();
		        req.setStatus(status);

		        if ("In Progress".equalsIgnoreCase(status)) {
		            req.setAcceptedAt(LocalDate.now());
		        }

		        if ("Approved ✅".equalsIgnoreCase(status)) {
		            req.setApprovedAt(LocalDate.now());
		        }

		        if ("Rejected ❌".equalsIgnoreCase(status)) {
		            req.setAcceptedAt(null);
		            req.setApprovedAt(null);
		        }

		        requestRepo.save(req);
		    }
		}

	
}
