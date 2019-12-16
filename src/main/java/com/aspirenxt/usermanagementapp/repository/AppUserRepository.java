package com.aspirenxt.usermanagementapp.repository;
import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.domain.AppUser;
import com.aspirenxt.usermanagementapp.domain.Organization;
import com.aspirenxt.usermanagementapp.domain.Roles;

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

	List<AppUser> findByApp(App app);

    @Query( "select r from AppUser ap " +
            "join Roles r " +
            "on ap = r.appuser " )
    List<Roles> getRolesByAppuser( );
    
//	List<AppUser> findByAppAndRolesIn( App app,List<Roles> role);

	List<AppUser> findByAppAndRolesIn(App app, List<Roles> role);

}
