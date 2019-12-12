package com.aspirenxt.usermanagementapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.aspirenxt.usermanagementapp.web.rest.TestUtil;

public class AppTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppType.class);
        AppType appType1 = new AppType();
        appType1.setId(1L);
        AppType appType2 = new AppType();
        appType2.setId(appType1.getId());
        assertThat(appType1).isEqualTo(appType2);
        appType2.setId(2L);
        assertThat(appType1).isNotEqualTo(appType2);
        appType1.setId(null);
        assertThat(appType1).isNotEqualTo(appType2);
    }
}
