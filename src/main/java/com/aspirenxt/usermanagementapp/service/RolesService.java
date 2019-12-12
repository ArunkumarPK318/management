package com.aspirenxt.usermanagementapp.service;

import com.aspirenxt.usermanagementapp.domain.Roles;
import com.aspirenxt.usermanagementapp.repository.RolesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Roles}.
 */
@Service
@Transactional
public class RolesService {

    private final Logger log = LoggerFactory.getLogger(RolesService.class);

    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Save a roles.
     *
     * @param roles the entity to save.
     * @return the persisted entity.
     */
    public Roles save(Roles roles) {
        log.debug("Request to save Roles : {}", roles);
        return rolesRepository.save(roles);
    }

    /**
     * Get all the roles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Roles> findAll() {
        log.debug("Request to get all Roles");
        return rolesRepository.findAll();
    }


    /**
     * Get one roles by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Roles> findOne(Long id) {
        log.debug("Request to get Roles : {}", id);
        return rolesRepository.findById(id);
    }

    /**
     * Delete the roles by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Roles : {}", id);
        rolesRepository.deleteById(id);
    }
}
