package com.gattu.demo.controller;

import com.gattu.demo.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadPdfReport() {
        try {
            byte[] pdf = reportService.exportReport();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition
                    .attachment()
                    .filename("regularisation_report.pdf")
                    .build());

            return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
        } catch (Exception e) {
        	   e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
