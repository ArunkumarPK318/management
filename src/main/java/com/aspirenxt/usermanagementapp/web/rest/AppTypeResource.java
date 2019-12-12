package com.aspirenxt.usermanagementapp.web.rest;

import com.aspirenxt.usermanagementapp.domain.AppType;
import com.aspirenxt.usermanagementapp.service.AppTypeService;
import com.aspirenxt.usermanagementapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.aspirenxt.usermanagementapp.domain.AppType}.
 */
@RestController
@RequestMapping("/api")
public class AppTypeResource {

    private final Logger log = LoggerFactory.getLogger(AppTypeResource.class);

    private static final String ENTITY_NAME = "appType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppTypeService appTypeService;

    public AppTypeResource(AppTypeService appTypeService) {
        this.appTypeService = appTypeService;
    }

    /**
     * {@code POST  /app-types} : Create a new appType.
     *
     * @param appType the appType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new appType, or with status {@code 400 (Bad Request)} if the appType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/app-types")
    public ResponseEntity<AppType> createAppType(@Valid @RequestBody AppType appType) throws URISyntaxException {
        log.debug("REST request to save AppType : {}", appType);
        if (appType.getId() != null) {
            throw new BadRequestAlertException("A new appType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppType result = appTypeService.save(appType);
        return ResponseEntity.created(new URI("/api/app-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /app-types} : Updates an existing appType.
     *
     * @param appType the appType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated appType,
     * or with status {@code 400 (Bad Request)} if the appType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the appType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/app-types")
    public ResponseEntity<AppType> updateAppType(@Valid @RequestBody AppType appType) throws URISyntaxException {
        log.debug("REST request to update AppType : {}", appType);
        if (appType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppType result = appTypeService.save(appType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, appType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /app-types} : get all the appTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of appTypes in body.
     */
    @GetMapping("/app-types")
    public List<AppType> getAllAppTypes() {
        log.debug("REST request to get all AppTypes");
        return appTypeService.findAll();
    }

    /**
     * {@code GET  /app-types/:id} : get the "id" appType.
     *
     * @param id the id of the appType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the appType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/app-types/{id}")
    public ResponseEntity<AppType> getAppType(@PathVariable Long id) {
        log.debug("REST request to get AppType : {}", id);
        Optional<AppType> appType = appTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(appType);
    }

    /**
     * {@code DELETE  /app-types/:id} : delete the "id" appType.
     *
     * @param id the id of the appType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/app-types/{id}")
    public ResponseEntity<Void> deleteAppType(@PathVariable Long id) {
        log.debug("REST request to delete AppType : {}", id);
        appTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
