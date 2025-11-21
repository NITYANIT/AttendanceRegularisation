package com.gattu.demo;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "regularisation_request")
@Access(AccessType.FIELD)
public class Report {

    @Id
    @GeneratedValue
    private Integer sno;
    private Time time;
    private String divHeadName;
    public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	private String name;
	private String ceid;
    private String reason;
   
    public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Column(name = "requested_at")
    private LocalDate requestedAt;

	 private Date date;
    public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Column(name = "approved_at")
    private LocalDate approvedAt;

    public Report() {}

    public Report(String name, LocalDate requestedAt, LocalDate approvedAt) {
        this.name = name;
        this.requestedAt = requestedAt;
        this.approvedAt = approvedAt;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(LocalDate requestedAt) {
        this.requestedAt = requestedAt;
    }

    public LocalDate getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDate approvedAt) {
        this.approvedAt = approvedAt;
    }

	public String getCeid() {
		return ceid;
	}

	public void setCeid(String ceid) {
		this.ceid = ceid;
	}

	public String getDivHeadName() {
		return divHeadName;
	}

	public void setDivHeadName(String divHeadName) {
		this.divHeadName = divHeadName;
	}
}
