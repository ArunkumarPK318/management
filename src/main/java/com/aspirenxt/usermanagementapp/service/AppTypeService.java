package com.aspirenxt.usermanagementapp.service;

import com.aspirenxt.usermanagementapp.domain.AppType;
import com.aspirenxt.usermanagementapp.repository.AppTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link AppType}.
 */
@Service
@Transactional
public class AppTypeService {

    private final Logger log = LoggerFactory.getLogger(AppTypeService.class);

    private final AppTypeRepository appTypeRepository;

    public AppTypeService(AppTypeRepository appTypeRepository) {
        this.appTypeRepository = appTypeRepository;
    }

    /**
     * Save a appType.
     *
     * @param appType the entity to save.
     * @return the persisted entity.
     */
    public AppType save(AppType appType) {
        log.debug("Request to save AppType : {}", appType);
        return appTypeRepository.save(appType);
    }

    /**
     * Get all the appTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AppType> findAll() {
        log.debug("Request to get all AppTypes");
        return appTypeRepository.findAll();
    }


    /**
     * Get one appType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AppType> findOne(Long id) {
        log.debug("Request to get AppType : {}", id);
        return appTypeRepository.findById(id);
    }

    /**
     * Delete the appType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AppType : {}", id);
        appTypeRepository.deleteById(id);
    }
}
