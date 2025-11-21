package com.gattu.demo.controller;

import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//import com.gattu.demo.ApprovedRequests;
import com.gattu.demo.RegularisationRequest;

import com.gattu.demo.dao.RegularisationRequestRepository;
import com.gattu.demo.dto.RegularisationRequestDTO;
import com.gattu.demo.service.RegularisationRequestService;

@RestController
@RequestMapping("/api/regularisation")
@CrossOrigin(origins = "http://localhost:3000")
public class RegularisationRequestController {

    @Autowired
    private RegularisationRequestService service;
    
    @Autowired
    private RegularisationRequestRepository requestRepo;

    
    @PostMapping("/submit")
    public ResponseEntity<String> submitRequests(@RequestBody List<RegularisationRequestDTO> requests) {
        System.out.println("==> Submit endpoint HIT!");
        System.out.println("Content Received: " + requests);

        if (requests.isEmpty()) {
            System.out.println("No data received.");
        }

        try {
            service.submitRequests(requests);
            return ResponseEntity.ok("Submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();  // See full error in console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error: " + e.getMessage());
        }
    }


    @PutMapping("/update-status")
    public ResponseEntity<Map<String, String>> updateStatuses(@RequestBody List<RegularisationRequest> updatedRequests) {
        for (RegularisationRequest req : updatedRequests) {
            Optional<RegularisationRequest> existing = requestRepo.findById(req.getSno());
            if (existing.isPresent()) {
                RegularisationRequest toUpdate = existing.get();

//                toUpdate.setStatus(req.getStatus());
                

                // If Division Head accepts
                if ("In Progress".equalsIgnoreCase(req.getStatus())) {
                    toUpdate.setAcceptedAt(LocalDate.now());
                    toUpdate.setStatus("In Progress");
                }

                // If Admin gives final approval
                if ("Approved ✅".equalsIgnoreCase(req.getStatus())) {
                    toUpdate.setApprovedAt(LocalDate.now());
                    toUpdate.setStatus("Approved ✅");
                }

                // If Rejected, you might want to clear both or set both
                if ("Rejected ❌".equalsIgnoreCase(req.getStatus())) {
                    toUpdate.setAcceptedAt(null);
                    toUpdate.setApprovedAt(null); // or keep null if you want
                }

                requestRepo.save(toUpdate);
            }
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Statuses and timestamps updated.");
        return ResponseEntity.ok(response);
    }


//    @PostMapping("/approve-only")
//    public ResponseEntity<String> saveApprovedRequests(@RequestBody List<RegularisationRequestDTO> approvedList) {
//        try {
//            // Filter only "Approved ✅" entries
//            List<RegularisationRequest> approvedEntities = approvedList.stream()
//                .filter(dto -> "Approved ✅".equals(dto.getStatus()))
//                .map(dto -> {
//                    RegularisationRequest entity = new RegularisationRequest();
//                    entity.setCeid(dto.getCeid());
//                    entity.setDate(dto.getDate());  // Consider converting to LocalDate if needed
//                    entity.setType(dto.getType());
//                    entity.setStatus("Approved ✅");
//                    entity.setAcceptedAt(LocalDateTime.now());
//                    return entity;
//                }).toList();
//
//            // Save to approved_requests table
//         
//            approvedRepo.saveAll(approvedEntities);
//
//
//            return ResponseEntity.ok("Approved entries saved successfully.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error while saving approved entries: " + e.getMessage());
//        }
//    }

    


    @PostMapping("/bulk-update")
    public ResponseEntity<?> bulkUpdateStatus(@RequestBody List<RegularisationRequestDTO> requests) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (RegularisationRequestDTO req : requests) {
            LocalDate date = req.getDate();
            service.updateStatus(req.getCeid(), date, req.getStatus());
        }
        return ResponseEntity.ok("Updated");
    }

    @GetMapping("/in-progress")
    public List<RegularisationRequest> getInProgressRequests() {
        return requestRepo.findByStatusIgnoreCase("In Progress");
    }

   
    
    @GetMapping("/all")
    public List<RegularisationRequest> getAllRequests() {
        return service.getAllRequests();
    }
    
    
    @GetMapping("/pending")
    public List<RegularisationRequestDTO> getPendingRequests() {
        return service.getPendingDTOs();
    }

}
