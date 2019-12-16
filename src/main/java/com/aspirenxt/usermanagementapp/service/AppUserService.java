package com.aspirenxt.usermanagementapp.service;

import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.domain.AppUser;
import com.aspirenxt.usermanagementapp.domain.Organization;
import com.aspirenxt.usermanagementapp.domain.Roles;
import com.aspirenxt.usermanagementapp.repository.AppUserRepository;
import com.aspirenxt.usermanagementapp.repository.RolesRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

/**
 * Service Implementation for managing {@link AppUser}.
 */
@Service
@Transactional
public class AppUserService {

    private final Logger log = LoggerFactory.getLogger(AppUserService.class);
  
    private final AppUserRepository appUserRepository;

     public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
     
    }

    /**
     * Save a appUser.
     *
     * @param appUser the entity to save.
     * @return the persisted entity.
     */
    public AppUser save(AppUser appUser) {
        log.debug("Request to save AppUser : {}", appUser);
        return appUserRepository.save(appUser);
    }

    /**
     * Get all the appUsers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AppUser> findAll() {
        log.debug("Request to get all AppUsers");
        return appUserRepository.findAll();
    }


    /**
     * Get one appUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AppUser> findOne(Long id) {
        log.debug("Request to get AppUser : {}", id);
        return appUserRepository.findById(id);
    }

    /**
     * Delete the appUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AppUser : {}", id);
        appUserRepository.deleteById(id);
    }
    

	public List<AppUser> findUserByOrg(AppUser appUser) {
		// TODO Auto-generated method stub
		Organization org = appUser.getOrganization();
		return  appUserRepository.findByOrganization(org);
		
	}

	public List<AppUser> findByApp(@Valid AppUser appUser) {
		// TODO Auto-generated method stub
		App app = appUser.getApp();
		return appUserRepository.findByApp(app);
	}

	public List<AppUser> getAllUserByRolesAndApp(@Valid AppUser appUser) {
		// TODO Auto-generated method stub
	
		List<Roles> role =(List<Roles>) appUserRepository.getRolesByAppuser();
		System.out.println("get roles by user "+role);
		Set<Roles> hSet = new HashSet<Roles>(role); 
        hSet.addAll(role); 
		appUser.setRoles(hSet);
		App app = appUser.getApp();
		System.out.println("app and roles "+app+"roles =="+role);
		return  appUserRepository.findByAppAndRolesIn(app, role);
//		return null;
	}
}
