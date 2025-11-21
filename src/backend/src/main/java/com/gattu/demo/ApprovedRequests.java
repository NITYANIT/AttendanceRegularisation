//
//package com.gattu.demo;
//
//import jakarta.persistence.*;
////jakarta.persistence.* is used for JPA annotations like @Entity, @Id, etc.
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.Date;
//
//@Entity
//@Table(name = "approved_requests")
//@Access(AccessType.FIELD)   //JPA will directly access fields (not through getters/setters)
//public class ApprovedRequests {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) //Uses database's identity column for auto-increment.
//    private Integer sno;
////    private String ceid;
//
//    private LocalDate date;
//
//    public int getSno() {
//		return sno;
//	}
//
//	public void setSno(int sno) {
//		this.sno = sno;
//	}
//
//	public RegularisationRequest getRegularisationRequest() {
//		return regularisationRequest;
//	}
//
//	public void setRegularisationRequest(RegularisationRequest regularisationRequest) {
//		this.regularisationRequest = regularisationRequest;
//	}
//
//	private String type;
//
//    @Column(name = "approved_at")
//    private Date approvedAt;
//
////    @ManyToOne
////    @JoinColumn(name = "ceid", referencedColumnName = "ceid")
////    private RegularisationRequest regularisationRequest;
//    
////    only use @ManyToOne if the join column is unique or a proper FK to a PK.
//
//    
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "regularisation_id", referencedColumnName = "sno")
//    private RegularisationRequest regularisationRequest;
//
//
//    public LocalDate getDate() {
//        return date;
//    }
//
//    public void setDate(LocalDate date) {
//        this.date = date;
//    }
//
//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public Date getApprovedAt() {
//        return approvedAt;
//    }
//
//	
//	public void setApprovedAt(Date approvedAt) {
//	    this.approvedAt = approvedAt;
//	}
//
//
//
//}
