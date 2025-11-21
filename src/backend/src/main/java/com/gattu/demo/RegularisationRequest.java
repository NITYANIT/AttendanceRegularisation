package com.gattu.demo;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "regularisation_request")

public class RegularisationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sno;

    //✔️ Always point @JoinColumn(... referencedColumnName = "...") to a primary key or unique column in the target entity.
    
    @Column(unique = true, nullable = false)
    private String ceid;
    
//    private String name;
//    private String divPaId;
//    private String divPaName;

    private LocalDate date;
    private String type;
    @Column(name = "requested_at")
    private LocalDate requestedAt;
    @Column(name = "accepted_at")
    private LocalDate acceptedAt;
    
    private String status;
    
    @Column(name = "reason")
    private String reason;
    
    @Column(name = "time")
    private LocalTime time;

    @Column(name = "approved_at")
    private LocalDate approvedAt;
   
    public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ceid", referencedColumnName = "ceid", insertable = false, updatable = false)
    private Employee employee;
    
   
 

    
    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
    public Integer getSno() {
		return sno;
	}

	public void setSno(Integer sno) {
		this.sno = sno;
	}

	public String getCeid() {
		return ceid;
	}

	public void setCeid(String ceid) {
		this.ceid = ceid;
	}

//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getDivPaId() {
//		return divPaId;
//	}
//
//	public void setDivPaId(String divPaId) {
//		this.divPaId = divPaId;
//	}
//
//	public String getDivPaName() {
//		return divPaName;
//	}
//
//	public void setDivPaName(String divPaName) {
//		this.divPaName = divPaName;
//	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getRequestedAt() {
		return requestedAt;
	}

	public void setRequestedAt(LocalDate requestedAt) {
		this.requestedAt = requestedAt;
	}

	public LocalDate getAcceptedAt() {
		return acceptedAt;
	}

	public void setAcceptedAt(LocalDate acceptedAt) {
		this.acceptedAt = acceptedAt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getApprovedAt() {
		return approvedAt;
	}

	public void setApprovedAt(LocalDate approvedAt) {
		this.approvedAt = approvedAt;
	}
}
