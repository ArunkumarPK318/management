package com.aspirenxt.usermanagementapp.web.rest;

import com.aspirenxt.usermanagementapp.UsermanagementappApp;
import com.aspirenxt.usermanagementapp.domain.AppType;
import com.aspirenxt.usermanagementapp.repository.AppTypeRepository;
import com.aspirenxt.usermanagementapp.service.AppTypeService;
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
import java.util.List;

import static com.aspirenxt.usermanagementapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AppTypeResource} REST controller.
 */
@SpringBootTest(classes = UsermanagementappApp.class)
public class AppTypeResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AppTypeRepository appTypeRepository;

    @Autowired
    private AppTypeService appTypeService;

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

    private MockMvc restAppTypeMockMvc;

    private AppType appType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppTypeResource appTypeResource = new AppTypeResource(appTypeService);
        this.restAppTypeMockMvc = MockMvcBuilders.standaloneSetup(appTypeResource)
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
    public static AppType createEntity(EntityManager em) {
        AppType appType = new AppType()
            .type(DEFAULT_TYPE)
            .name(DEFAULT_NAME);
        return appType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppType createUpdatedEntity(EntityManager em) {
        AppType appType = new AppType()
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME);
        return appType;
    }

    @BeforeEach
    public void initTest() {
        appType = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppType() throws Exception {
        int databaseSizeBeforeCreate = appTypeRepository.findAll().size();

        // Create the AppType
        restAppTypeMockMvc.perform(post("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appType)))
            .andExpect(status().isCreated());

        // Validate the AppType in the database
        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeCreate + 1);
        AppType testAppType = appTypeList.get(appTypeList.size() - 1);
        assertThat(testAppType.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAppType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAppTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appTypeRepository.findAll().size();

        // Create the AppType with an existing ID
        appType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppTypeMockMvc.perform(post("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appType)))
            .andExpect(status().isBadRequest());

        // Validate the AppType in the database
        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = appTypeRepository.findAll().size();
        // set the field null
        appType.setType(null);

        // Create the AppType, which fails.

        restAppTypeMockMvc.perform(post("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appType)))
            .andExpect(status().isBadRequest());

        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = appTypeRepository.findAll().size();
        // set the field null
        appType.setName(null);

        // Create the AppType, which fails.

        restAppTypeMockMvc.perform(post("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appType)))
            .andExpect(status().isBadRequest());

        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppTypes() throws Exception {
        // Initialize the database
        appTypeRepository.saveAndFlush(appType);

        // Get all the appTypeList
        restAppTypeMockMvc.perform(get("/api/app-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appType.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getAppType() throws Exception {
        // Initialize the database
        appTypeRepository.saveAndFlush(appType);

        // Get the appType
        restAppTypeMockMvc.perform(get("/api/app-types/{id}", appType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appType.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingAppType() throws Exception {
        // Get the appType
        restAppTypeMockMvc.perform(get("/api/app-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppType() throws Exception {
        // Initialize the database
        appTypeService.save(appType);

        int databaseSizeBeforeUpdate = appTypeRepository.findAll().size();

        // Update the appType
        AppType updatedAppType = appTypeRepository.findById(appType.getId()).get();
        // Disconnect from session so that the updates on updatedAppType are not directly saved in db
        em.detach(updatedAppType);
        updatedAppType
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME);

        restAppTypeMockMvc.perform(put("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppType)))
            .andExpect(status().isOk());

        // Validate the AppType in the database
        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeUpdate);
        AppType testAppType = appTypeList.get(appTypeList.size() - 1);
        assertThat(testAppType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAppType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAppType() throws Exception {
        int databaseSizeBeforeUpdate = appTypeRepository.findAll().size();

        // Create the AppType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppTypeMockMvc.perform(put("/api/app-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appType)))
            .andExpect(status().isBadRequest());

        // Validate the AppType in the database
        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAppType() throws Exception {
        // Initialize the database
        appTypeService.save(appType);

        int databaseSizeBeforeDelete = appTypeRepository.findAll().size();

        // Delete the appType
        restAppTypeMockMvc.perform(delete("/api/app-types/{id}", appType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppType> appTypeList = appTypeRepository.findAll();
        assertThat(appTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
