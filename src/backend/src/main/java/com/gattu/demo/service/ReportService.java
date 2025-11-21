package com.gattu.demo.service;

import com.gattu.demo.Report;
import com.gattu.demo.dao.ReportRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;
    
    public byte[] exportReport() throws JRException {
        List<Report> reports = reportRepository.findAll();  // fetch from approved_requests

        InputStream inputStream = getClass().getResourceAsStream("/reports/MyReport.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reports);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "DRDO Portal");
        parameters.put("TABLE_DATA_SOURCE", dataSource); // ✅ this is key

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

}
