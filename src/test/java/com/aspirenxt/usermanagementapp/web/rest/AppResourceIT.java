package com.aspirenxt.usermanagementapp.web.rest;

import com.aspirenxt.usermanagementapp.UsermanagementappApp;
import com.aspirenxt.usermanagementapp.domain.App;
import com.aspirenxt.usermanagementapp.repository.AppRepository;
import com.aspirenxt.usermanagementapp.service.AppService;
import com.aspirenxt.usermanagementapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.aspirenxt.usermanagementapp.web.rest.TestUtil.sameInstant;
import static com.aspirenxt.usermanagementapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AppResource} REST controller.
 */
@SpringBootTest(classes = UsermanagementappApp.class)
public class AppResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_URL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_URL_PATH = "BBBBBBBBBB";

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private AppService appService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAppMockMvc;

    private App app;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppResource appResource = new AppResource(appService);
        this.restAppMockMvc = MockMvcBuilders.standaloneSetup(appResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static App createEntity(EntityManager em) {
        App app = new App()
            .name(DEFAULT_NAME)
            .version(DEFAULT_VERSION)
            .date(DEFAULT_DATE)
            .urlPath(DEFAULT_URL_PATH);
        return app;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static App createUpdatedEntity(EntityManager em) {
        App app = new App()
            .name(UPDATED_NAME)
            .version(UPDATED_VERSION)
            .date(UPDATED_DATE)
            .urlPath(UPDATED_URL_PATH);
        return app;
    }

    @BeforeEach
    public void initTest() {
        app = createEntity(em);
    }

    @Test
    @Transactional
    public void createApp() throws Exception {
        int databaseSizeBeforeCreate = appRepository.findAll().size();

        // Create the App
        restAppMockMvc.perform(post("/api/apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(app)))
            .andExpect(status().isCreated());

        // Validate the App in the database
        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeCreate + 1);
        App testApp = appList.get(appList.size() - 1);
        assertThat(testApp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testApp.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testApp.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testApp.getUrlPath()).isEqualTo(DEFAULT_URL_PATH);
    }

    @Test
    @Transactional
    public void createAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appRepository.findAll().size();

        // Create the App with an existing ID
        app.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppMockMvc.perform(post("/api/apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(app)))
            .andExpect(status().isBadRequest());

        // Validate the App in the database
        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = appRepository.findAll().size();
        // set the field null
        app.setName(null);

        // Create the App, which fails.

        restAppMockMvc.perform(post("/api/apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(app)))
            .andExpect(status().isBadRequest());

        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApps() throws Exception {
        // Initialize the database
        appRepository.saveAndFlush(app);

        // Get all the appList
        restAppMockMvc.perform(get("/api/apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(app.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].urlPath").value(hasItem(DEFAULT_URL_PATH)));
    }
    
    @Test
    @Transactional
    public void getApp() throws Exception {
        // Initialize the database
        appRepository.saveAndFlush(app);

        // Get the app
        restAppMockMvc.perform(get("/api/apps/{id}", app.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(app.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.urlPath").value(DEFAULT_URL_PATH));
    }

    @Test
    @Transactional
    public void getNonExistingApp() throws Exception {
        // Get the app
        restAppMockMvc.perform(get("/api/apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApp() throws Exception {
        // Initialize the database
        appService.save(app);

        int databaseSizeBeforeUpdate = appRepository.findAll().size();

        // Update the app
        App updatedApp = appRepository.findById(app.getId()).get();
        // Disconnect from session so that the updates on updatedApp are not directly saved in db
        em.detach(updatedApp);
        updatedApp
            .name(UPDATED_NAME)
            .version(UPDATED_VERSION)
            .date(UPDATED_DATE)
            .urlPath(UPDATED_URL_PATH);

        restAppMockMvc.perform(put("/api/apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApp)))
            .andExpect(status().isOk());

        // Validate the App in the database
        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeUpdate);
        App testApp = appList.get(appList.size() - 1);
        assertThat(testApp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testApp.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testApp.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testApp.getUrlPath()).isEqualTo(UPDATED_URL_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingApp() throws Exception {
        int databaseSizeBeforeUpdate = appRepository.findAll().size();

        // Create the App

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppMockMvc.perform(put("/api/apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(app)))
            .andExpect(status().isBadRequest());

        // Validate the App in the database
        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApp() throws Exception {
        // Initialize the database
        appService.save(app);

        int databaseSizeBeforeDelete = appRepository.findAll().size();

        // Delete the app
        restAppMockMvc.perform(delete("/api/apps/{id}", app.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<App> appList = appRepository.findAll();
        assertThat(appList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
