package com.gattu.demo.dto;

public class EmployeeDTO {

    private String ceid;
    private String name;
    private String type;
    private String date;
    private String divpaid;
    private String divpaname;
    private String divheadid;
    private String divheadname;

    // Constructor for ceid and name
    public EmployeeDTO(String ceid, String name) {
        this.ceid = ceid;
        this.name = name;
    }

    // Constructor: ceid, name, divpaid, divpaname
    public EmployeeDTO(String ceid, String name, String divpaid, String divpaname) {
        this.ceid = ceid;
        this.name = name;
        this.divpaid = divpaid;
        this.divpaname = divpaname;
    }

    // Constructor: ceid, name, divpaid, divpaname, divheadid, divheadname
    public EmployeeDTO(String ceid, String name, String divpaid, String divpaname, String divheadid, String divheadname) {
        this.ceid = ceid;
        this.name = name;
        this.divpaid = divpaid;
        this.divpaname = divpaname;
        this.divheadid = divheadid;
        this.divheadname = divheadname;
    }

    // Full constructor
    public EmployeeDTO(String ceid, String name, String type, String date,
                       String divpaid, String divpaname, String divheadid, String divheadname) {
        this.ceid = ceid;
        this.name = name;
        this.type = type;
        this.date = date;
        this.divpaid = divpaid;
        this.divpaname = divpaname;
        this.divheadid = divheadid;
        this.divheadname = divheadname;
    }

    // Getters and setters

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDivpaid() {
        return divpaid;
    }

    public void setDivpaid(String divpaid) {
        this.divpaid = divpaid;
    }

    public String getDivpaname() {
        return divpaname;
    }

    public void setDivpaname(String divpaname) {
        this.divpaname = divpaname;
    }

    public String getDivheadid() {
        return divheadid;
    }

    public void setDivheadid(String divheadid) {
        this.divheadid = divheadid;
    }

    public String getDivheadname() {
        return divheadname;
    }

    public void setDivheadname(String divheadname) {
        this.divheadname = divheadname;
    }
}
