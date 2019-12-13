package com.aspirenxt.usermanagementapp.service;

import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.domain.AppType;
import com.aspirenxt.usermanagementapp.repository.AppRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

/**
 * Service Implementation for managing {@link App}.
 */
@Service
@Transactional
public class AppService {

    private final Logger log = LoggerFactory.getLogger(AppService.class);

    private final AppRepository appRepository;

    public AppService(AppRepository appRepository) {
        this.appRepository = appRepository;
    }

    /**
     * Save a app.
     *
     * @param app the entity to save.
     * @return the persisted entity.
     */
    public App save(App app) {
        log.debug("Request to save App : {}", app);
        return appRepository.save(app);
    }

    /**
     * Get all the apps.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<App> findAll() {
        log.debug("Request to get all Apps");
        return appRepository.findAll();
    }


    /**
     * Get one app by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<App> findOne(Long id) {
        log.debug("Request to get App : {}", id);
        return appRepository.findById(id);
    }

    /**
     * Delete the app by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete App : {}", id);
        appRepository.deleteById(id);
    }

	public List<App> findByApptype(@Valid App app) {
		// TODO Auto-generated method stub
		AppType appType = app.getAppType();
		return appRepository.findByAppType(appType);
	}
}
