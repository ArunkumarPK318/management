package com.aspirenxt.usermanagementapp.repository;
import com.aspirenxt.usermanagementapp.domain.AppUser;
import com.aspirenxt.usermanagementapp.domain.Organization;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AppUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
	List<AppUser> findByOrganization(Organization org);

}
