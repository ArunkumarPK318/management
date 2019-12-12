package com.aspirenxt.usermanagementapp.repository;
import com.aspirenxt.usermanagementapp.domain.AppType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AppType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppTypeRepository extends JpaRepository<AppType, Long> {

}
