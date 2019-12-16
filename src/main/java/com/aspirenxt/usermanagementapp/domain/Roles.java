package com.aspirenxt.usermanagementapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Roles.
 */
@Entity
@Table(name = "roles")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Roles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "role_type", nullable = false)
    private String roleType;

    @Column(name = "role")
    private String role;

    @Column(name = "code")
    private String code;

    @ManyToOne
    @JsonIgnoreProperties("roles")
    private AppType apptype;

    @ManyToOne
    @JsonIgnoreProperties("roles")
    private App app;

    @ManyToOne
    @JsonIgnoreProperties("roles")
    private AppUser appuser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleType() {
        return roleType;
    }

    public Roles roleType(String roleType) {
        this.roleType = roleType;
        return this;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getRole() {
        return role;
    }

    public Roles role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCode() {
        return code;
    }

    public Roles code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public AppType getApptype() {
        return apptype;
    }

    public Roles apptype(AppType appType) {
        this.apptype = appType;
        return this;
    }

    public void setApptype(AppType appType) {
        this.apptype = appType;
    }

    public App getApp() {
        return app;
    }

    public Roles app(App app) {
        this.app = app;
        return this;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public AppUser getAppuser() {
        return appuser;
    }

    public Roles appuser(AppUser appUser) {
        this.appuser = appUser;
        return this;
    }

    public void setAppuser(AppUser appUser) {
        this.appuser = appUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Roles)) {
            return false;
        }
        return id != null && id.equals(((Roles) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Roles{" +
            "id=" + getId() +
            ", roleType='" + getRoleType() + "'" +
            ", role='" + getRole() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
