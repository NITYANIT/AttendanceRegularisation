//package com.gattu.demo.controller;
//
//import java.time.LocalDateTime;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.gattu.demo.ApprovedRequests;
//import com.gattu.demo.RegularisationRequest;
//import com.gattu.demo.dao.ApprovedRequestsRepo;
//import com.gattu.demo.dao.RegularisationRequestRepository;
//import com.gattu.demo.dto.ApprovedRequestDTO;
//import com.gattu.demo.dto.RegularisationRequestDTO;
//
//@RestController
//@RequestMapping("/approved")
//@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow CORS
//public class ApprovedRequestsController {
//
//    @Autowired
//    private ApprovedRequestsRepo approvedRepo;
//    @Autowired
//	private RegularisationRequestRepository regularisationRequestRepo;
//
//    @PostMapping("/only")
//    public ResponseEntity<String> saveApprovedRequests(@RequestBody List<RegularisationRequestDTO> approvedList) {
//        try {
//            List<ApprovedRequests> approvedEntities = approvedList.stream()
//                .filter(dto -> "Approved ✅".equals(dto.getStatus()))
//                .map(dto -> {
//                    RegularisationRequest req = regularisationRequestRepo.findByCeid(dto.getCeid())
//                        .orElseThrow(() -> new RuntimeException("Request not found for ceid: " + dto.getCeid()));
//
//                    ApprovedRequests entity = new ApprovedRequests();
//                    entity.setRegularisationRequest(req); // ✅ Correct @ManyToOne mapping
//                    entity.setDate(req.getDate());
//                    entity.setType(req.getType());
//                    entity.setApprovedAt(new Date());
//                    return entity;
//                }).toList();
//
//            approvedRepo.saveAll(approvedEntities);
//
//            return ResponseEntity.ok("Approved entries saved.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error: " + e.getMessage());
//        }
//    }
//    
//    
//
//    
//    
//    
////    @PostMapping("/approved-requests")
////    public ResponseEntity<String> approveMultipleRequests(@RequestBody List<Integer> snoList) {
////        for (Integer sno : snoList) {
////        	System.out.println("Processing SNO: " + sno);
////            RegularisationRequest req = regularisationRequestRepo.findById(sno)
////                .orElseThrow(() -> new RuntimeException("Request not found for sno: " + sno));
////
////            ApprovedRequests ar = new ApprovedRequests();
////            ar.setRegularisationRequest(req);
////            ar.setDate(req.getDate());
////            ar.setType(req.getType());
////            ar.setApprovedAt(new Date());
////
////            approvedRepo.save(ar);
////        }
////        return ResponseEntity.ok("All requests approved.");
////    }
//    @PostMapping("/approved-requests")
//    public ResponseEntity<String> approveMultipleRequests(@RequestBody List<Integer> snoList) {
//        for (Integer sno : snoList) {
//        	   System.out.println("Received SNOs for approval: " + snoList); 
//            Optional<RegularisationRequest> optionalReq = regularisationRequestRepo.findById(sno);
//            if (optionalReq.isPresent()) {
//                RegularisationRequest req = optionalReq.get();
//
//                ApprovedRequests ar = new ApprovedRequests();
//                ar.setRegularisationRequest(req);              // assuming you have @ManyToOne
//                ar.setDate(req.getDate());
//                ar.setType(req.getType());
//                ar.setApprovedAt(new Date());
//
//                approvedRepo.save(ar);
//                System.out.println("✅ Saved approval for sno: " + sno);
//            } else {
//                System.out.println("❌ No request found for sno: " + sno);
//            }
//        }
//        return ResponseEntity.ok("All requests approved.");
//    }
//
//    @GetMapping("/approved")
//    public List<ApprovedRequestDTO> getApprovedRequests() {
//        List<ApprovedRequests> approvedList = approvedRepo.findAll();
//        return approvedList.stream()
//            .map(ApprovedRequestDTO::new)
//            .collect(Collectors.toList());
//    }
//
//
////    @GetMapping("/with-details")
////    public ResponseEntity<List<ApprovedRequests>> getAllWithDetails() {
////        List<ApprovedRequests> result = approvedRepo.fetchWithRequestData();
////        return ResponseEntity.ok(result);
////    }
////    
////    @GetMapping("/joined-requests")
////    public ResponseEntity<List<ApprovedRequests>> getJoinedRequests() {
////        List<ApprovedRequests> joined = approvedRepo.fetchWithRequestData();
////        return ResponseEntity.ok(joined);
////    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<ApprovedRequestDTO>> getAllApprovedRequests() {
//        List<ApprovedRequests> approvedList = approvedRepo.findAll();
//
//        List<ApprovedRequestDTO> dtoList = approvedList.stream()
//            .map(ar -> new ApprovedRequestDTO(
//                ar.getRegularisationRequest().getSno(),          // Assuming sno is Integer
//                ar.getRegularisationRequest().getCeid(),
//                ar.getApprovedAt(),
//                ar.getRegularisationRequest().getRequestedAt(),
//                ar.getDate(),
//                ar.getType()
//            ))
//            .toList();
//
//        return ResponseEntity.ok(dtoList);
//    }
//
//
//    
//}
