//package com.gattu.demo;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "contract_master")
//public class Employee {
//    
//    @Id
//    @Column(name = "ceid")
//    private int ceid;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "divpaid")
//    private int divpaid; // If this is VARCHAR in DB, change it to String here
//
//    @Column(name = "divpaname")
//    private String divpaname;
//
//    @Column(name = "divheadid")
//    private int divheadid;
//
//    @Column(name = "divheadname")
//    private String divheadname;
//
//    @Column(name = "adminame")
//    private String adminame;
//
//    // Getters & Setters
//    public int getCeid() {
//        return ceid;
//    }
//
//    public int getDivheadid() {
//		return divheadid;
//	}
//
//	public void setDivheadid(int divheadid) {
//		this.divheadid = divheadid;
//	}
//
//	public String getDivheadname() {
//		return divheadname;
//	}
//
//	public void setDivheadname(String divheadname) {
//		this.divheadname = divheadname;
//	}
//
//	public String getAdminame() {
//		return adminame;
//	}
//
//	public void setAdminame(String adminame) {
//		this.adminame = adminame;
//	}
//
//	public void setCeid(int ceid) {
//        this.ceid = ceid;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public int getDivpaid() {
//        return divpaid;
//    }
//
//    public void setDivpaid(int divpaid) {
//        this.divpaid = divpaid;
//    }
//
//    public String getDivpaname() {
//        return divpaname;
//    }
//
//    public void setDivpaname(String divpaname) {
//        this.divpaname = divpaname;
//    }
//}


package com.gattu.demo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contract_master")
public class Employee {

    @Id  // Primary key of the table.
    @Column(name = "ceid")
    private String ceid;

    @Column(name = "name")
    private String name;

    @Column(name = "divPaId")
    private String divpaid; // If VARCHAR in DB, change type to String

    @Column(name = "divPaName")
    private String divpaname;

    @Column(name = "divHeadId")
    private String divheadid;

    @Column(name = "divHeadName")
    private String divheadname;
    
    @Column(name = "divId")
    private String divid;
    
    @Column(name = "divName")
    private String divName;

   
    @Column(name = "adminId")
    private String  adminId;

    @Column(name = "adminName")
    private String adminame;

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

	public String getDivid() {
		return divid;
	}

	public void setDivid(String divid) {
		this.divid = divid;
	}

	public String getDivName() {
		return divName;
	}

	public void setDivName(String divName) {
		this.divName = divName;
	}

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public String getAdminame() {
		return adminame;
	}

	public void setAdminame(String adminame) {
		this.adminame = adminame;
	}


}

