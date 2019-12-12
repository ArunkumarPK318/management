package com.aspirenxt.usermanagementapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.aspirenxt.usermanagementapp.web.rest.TestUtil;

public class RolesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Roles.class);
        Roles roles1 = new Roles();
        roles1.setId(1L);
        Roles roles2 = new Roles();
        roles2.setId(roles1.getId());
        assertThat(roles1).isEqualTo(roles2);
        roles2.setId(2L);
        assertThat(roles1).isNotEqualTo(roles2);
        roles1.setId(null);
        assertThat(roles1).isNotEqualTo(roles2);
    }
}
