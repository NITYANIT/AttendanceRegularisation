package com.gattu.demo.dao;

import com.gattu.demo.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
}
