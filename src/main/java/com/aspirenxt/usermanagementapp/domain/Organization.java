package com.aspirenxt.usermanagementapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "org_type")
    private String orgType;

    @Column(name = "org_address")
    private String orgAddress;

    @Column(name = "org_email")
    private String orgEmail;

    @Column(name = "date")
    private ZonedDateTime date;

    @OneToMany(mappedBy = "organization")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AppUser> appusers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrgName() {
        return orgName;
    }

    public Organization orgName(String orgName) {
        this.orgName = orgName;
        return this;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getOrgType() {
        return orgType;
    }

    public Organization orgType(String orgType) {
        this.orgType = orgType;
        return this;
    }

    public void setOrgType(String orgType) {
        this.orgType = orgType;
    }

    public String getOrgAddress() {
        return orgAddress;
    }

    public Organization orgAddress(String orgAddress) {
        this.orgAddress = orgAddress;
        return this;
    }

    public void setOrgAddress(String orgAddress) {
        this.orgAddress = orgAddress;
    }

    public String getOrgEmail() {
        return orgEmail;
    }

    public Organization orgEmail(String orgEmail) {
        this.orgEmail = orgEmail;
        return this;
    }

    public void setOrgEmail(String orgEmail) {
        this.orgEmail = orgEmail;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Organization date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Set<AppUser> getAppusers() {
        return appusers;
    }

    public Organization appusers(Set<AppUser> appUsers) {
        this.appusers = appUsers;
        return this;
    }

    public Organization addAppuser(AppUser appUser) {
        this.appusers.add(appUser);
        appUser.setOrganization(this);
        return this;
    }

    public Organization removeAppuser(AppUser appUser) {
        this.appusers.remove(appUser);
        appUser.setOrganization(null);
        return this;
    }

    public void setAppusers(Set<AppUser> appUsers) {
        this.appusers = appUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organization)) {
            return false;
        }
        return id != null && id.equals(((Organization) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", orgName='" + getOrgName() + "'" +
            ", orgType='" + getOrgType() + "'" +
            ", orgAddress='" + getOrgAddress() + "'" +
            ", orgEmail='" + getOrgEmail() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
