package com.aspirenxt.usermanagementapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A AppType.
 */
@Entity
@Table(name = "app_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AppType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "appType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<App> apps = new HashSet<>();

    @OneToMany(mappedBy = "roles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Roles> roles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public AppType type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public AppType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<App> getApps() {
        return apps;
    }

    public AppType apps(Set<App> apps) {
        this.apps = apps;
        return this;
    }

    public AppType addApp(App app) {
        this.apps.add(app);
        app.setAppType(this);
        return this;
    }

    public AppType removeApp(App app) {
        this.apps.remove(app);
        app.setAppType(null);
        return this;
    }

    public void setApps(Set<App> apps) {
        this.apps = apps;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public AppType roles(Set<Roles> roles) {
        this.roles = roles;
        return this;
    }

    public AppType addRoles(Roles roles) {
        this.roles.add(roles);
        roles.setRoles(this);
        return this;
    }

    public AppType removeRoles(Roles roles) {
        this.roles.remove(roles);
        roles.setRoles(null);
        return this;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AppType)) {
            return false;
        }
        return id != null && id.equals(((AppType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AppType{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
