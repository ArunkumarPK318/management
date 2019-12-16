package com.aspirenxt.usermanagementapp.repository;
import com.aspirenxt.usermanagementapp.domain.AppType;
import com.aspirenxt.usermanagementapp.domain.Roles;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Roles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {

	List<Roles> findByApptype(AppType appType);

}
