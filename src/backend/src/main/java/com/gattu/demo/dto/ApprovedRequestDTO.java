//package com.gattu.demo.dto;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.Date;
//
//import com.gattu.demo.ApprovedRequests;
//
//public class ApprovedRequestDTO {
//
//	
//    private Integer sno;
//    private String ceid;
//    private Date approvedAt;
//    private LocalDateTime requestedAt;
//    private LocalDate date;
//    private String type;
//
//    public ApprovedRequestDTO(ApprovedRequests approved) {
//        this.date = approved.getRegularisationRequest().getDate();
//        this.type = approved.getRegularisationRequest().getType();
//        this.ceid = approved.getRegularisationRequest().getCeid();
//        this.requestedAt=approved.getRegularisationRequest().getRequestedAt(); 
//        this.sno = approved.getSno();
//        this.approvedAt = approved.getApprovedAt();
//// set other fields from approved itself
//    }
//    
//    
//    public ApprovedRequestDTO(Integer sno, String ceid, Date approvedAt, LocalDateTime requestedAt, LocalDate date, String type) {
//        this.sno = sno;
//        this.ceid = ceid;
//        this.approvedAt = approvedAt;
//        this.requestedAt = requestedAt;
//        this.date = date;
//        this.type = type;
//    }
//    
//
//	public Integer getSno() {
//		return sno;
//	}
//
//	public void setSno(Integer sno) {
//		this.sno = sno;
//	}
//
//	public String getCeid() {
//		return ceid;
//	}
//
//	public void setCeid(String ceid) {
//		this.ceid = ceid;
//	}
//
//	public Date getApprovedAt() {
//		return approvedAt;
//	}
//
//	public void setApprovedAt(Date approvedAt) {
//		this.approvedAt = approvedAt;
//	}
//
//	public LocalDateTime getRequestedAt() {
//		return requestedAt;
//	}
//
//	public void setRequestedAt(LocalDateTime requestedAt) {
//		this.requestedAt = requestedAt;
//	}
//
//	public LocalDate getDate() {
//		return date;
//	}
//
//	public void setDate(LocalDate date) {
//		this.date = date;
//	}
//
//	public String getType() {
//		return type;
//	}
//
//	public void setType(String type) {
//		this.type = type;
//	}
//}
