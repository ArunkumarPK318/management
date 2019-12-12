package com.aspirenxt.usermanagementapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A App.
 */
@Entity
@Table(name = "app")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class App implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "version")
    private String version;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "url_path")
    private String urlPath;

    @OneToMany(mappedBy = "app")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AppUser> appusers = new HashSet<>();

    @OneToMany(mappedBy = "app")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Roles> roles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("apps")
    private AppType appType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public App name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public App version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public App date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public App urlPath(String urlPath) {
        this.urlPath = urlPath;
        return this;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public Set<AppUser> getAppusers() {
        return appusers;
    }

    public App appusers(Set<AppUser> appUsers) {
        this.appusers = appUsers;
        return this;
    }

    public App addAppuser(AppUser appUser) {
        this.appusers.add(appUser);
        appUser.setApp(this);
        return this;
    }

    public App removeAppuser(AppUser appUser) {
        this.appusers.remove(appUser);
        appUser.setApp(null);
        return this;
    }

    public void setAppusers(Set<AppUser> appUsers) {
        this.appusers = appUsers;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public App roles(Set<Roles> roles) {
        this.roles = roles;
        return this;
    }

    public App addRoles(Roles roles) {
        this.roles.add(roles);
        roles.setApp(this);
        return this;
    }

    public App removeRoles(Roles roles) {
        this.roles.remove(roles);
        roles.setApp(null);
        return this;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }

    public AppType getAppType() {
        return appType;
    }

    public App appType(AppType appType) {
        this.appType = appType;
        return this;
    }

    public void setAppType(AppType appType) {
        this.appType = appType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof App)) {
            return false;
        }
        return id != null && id.equals(((App) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "App{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", version='" + getVersion() + "'" +
            ", date='" + getDate() + "'" +
            ", urlPath='" + getUrlPath() + "'" +
            "}";
    }
}
