package com.aspirenxt.usermanagementapp.web.rest;

import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.domain.AppUser;
import com.aspirenxt.usermanagementapp.service.AppUserService;
import com.aspirenxt.usermanagementapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zalando.problem.Status;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.aspirenxt.usermanagementapp.domain.AppUser}.
 */
@RestController
@RequestMapping("/api")
public class AppUserResource {

    private final Logger log = LoggerFactory.getLogger(AppUserResource.class);

    private static final String ENTITY_NAME = "appUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppUserService appUserService;

    public AppUserResource(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    /**
     * {@code POST  /app-users} : Create a new appUser.
     *
     * @param appUser the appUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appUser, or with status {@code 400 (Bad Request)} if the appUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-users")
    public ResponseEntity<AppUser> createAppUser(@Valid @RequestBody AppUser appUser) throws URISyntaxException {
        log.debug("REST request to save AppUser : {}", appUser);
        if (appUser.getId() != null) {
            throw new BadRequestAlertException("A new appUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppUser result = appUserService.save(appUser);
        return ResponseEntity.created(new URI("/api/app-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-users} : Updates an existing appUser.
     *
     * @param appUser the appUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appUser,
     * or with status {@code 400 (Bad Request)} if the appUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-users")
    public ResponseEntity<AppUser> updateAppUser(@Valid @RequestBody AppUser appUser) throws URISyntaxException {
        log.debug("REST request to update AppUser : {}", appUser);
        if (appUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppUser result = appUserService.save(appUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /app-users} : get all the appUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appUsers in body.
     */
    @GetMapping("/app-users")
    public List<AppUser> getAllAppUsers() {
        log.debug("REST request to get all AppUsers");
        return appUserService.findAll();
    }

    /**
     * {@code GET  /app-users/:id} : get the "id" appUser.
     *
     * @param id the id of the appUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-users/{id}")
    public ResponseEntity<AppUser> getAppUser(@PathVariable Long id) {
        log.debug("REST request to get AppUser : {}", id);
        Optional<AppUser> appUser = appUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appUser);
    }

    /**
     * {@code DELETE  /app-users/:id} : delete the "id" appUser.
     *
     * @param id the id of the appUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-users/{id}")
    public ResponseEntity<Void> deleteAppUser(@PathVariable Long id) {
        log.debug("REST request to delete AppUser : {}", id);
        appUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
    
    @PostMapping("/appUserByOrg")
    public ResponseEntity<List<AppUser>> getAllUserByOrganization(@Valid @RequestBody AppUser appUser) throws URISyntaxException {
        log.debug("REST request to save AppUser : {}", appUser);
        if (appUser.getId() == null) {
            throw new BadRequestAlertException("A appUser cannot have an ID", ENTITY_NAME, "idexists");
        }
        List<AppUser> result = appUserService.findUserByOrg(appUser);
        
        return ResponseEntity.ok(result);
//        return ResponseEntity.created(new URI("/api/appUserByOrg/")
//            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,result.toString()))
//            .body(result);
    }
    
    @PostMapping("/appUsersByApp")
    public ResponseEntity< List<AppUser>> getAllAppsByApptype(@Valid @RequestBody AppUser appUser) throws URISyntaxException {
        log.debug("REST request to update App : {}", appUser);
        if (appUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        List<AppUser> result = appUserService.findByApp(appUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appUser.getId().toString()))
            .body(result);
    }
    
    @PostMapping("/appUsersByRolesAndApp")
    public ResponseEntity< List<AppUser>> getAllUserByRolesAndApp(@Valid @RequestBody AppUser appUser) throws URISyntaxException {
        log.debug("REST request to update App : {}", appUser);
        if (appUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        
        List<AppUser> result = appUserService.getAllUserByRolesAndApp(appUser);
        System.out.println(" get all user by app and roles "+result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appUser.getId().toString()))
            .body(result);
    }
}
