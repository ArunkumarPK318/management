package com.aspirenxt.usermanagementapp.repository;
import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.domain.AppType;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the App entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppRepository extends JpaRepository<App, Long> {

	List<App> findByAppType(AppType appType);

}
