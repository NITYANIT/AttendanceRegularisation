package com.gattu.demo.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class RegularisationRequestDTO {

    private Integer sno;
    private String ceid;
    private String name;
    private String divPaId;
    private String divPaName;
    private LocalDate date;
    private String type;
    private String status;
    private LocalDate requestedAt;
    private LocalDate acceptedAt;
    private String reason;
    private LocalTime time;


    public RegularisationRequestDTO() {
    }

    public RegularisationRequestDTO(Integer sno, String ceid, String name, String divPaId, String divPaName,
                                    LocalDate date, String type, String status,
                                    LocalDate requestedAt, LocalDate acceptedAt,String reason,LocalTime time) {
        this.sno = sno;
        this.ceid = ceid;
        this.name = name;
        this.divPaId = divPaId;
        this.divPaName = divPaName;
        this.date = date;
        this.type = type;
        this.status = status;
        this.requestedAt = requestedAt;
        this.acceptedAt = acceptedAt;
        this.time=time;
    }

    // Getters and Setters

    public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public RegularisationRequestDTO(Integer sno2, String ceid2, Object object, Object object2, Object object3,
			LocalDate date2, String type2, String status2, LocalDateTime requestedAt2, LocalDateTime acceptedAt2) {
		// TODO Auto-generated constructor stub
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDivPaId() {
        return divPaId;
    }

    public void setDivPaId(String divPaId) {
        this.divPaId = divPaId;
    }

    public String getDivPaName() {
        return divPaName;
    }

    public void setDivPaName(String divPaName) {
        this.divPaName = divPaName;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}

