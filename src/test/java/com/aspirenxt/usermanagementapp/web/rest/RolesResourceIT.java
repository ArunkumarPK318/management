package com.aspirenxt.usermanagementapp.web.rest;

import com.aspirenxt.usermanagementapp.UsermanagementappApp;
import com.aspirenxt.usermanagementapp.domain.Roles;
import com.aspirenxt.usermanagementapp.repository.RolesRepository;
import com.aspirenxt.usermanagementapp.service.RolesService;
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
 * Integration tests for the {@link RolesResource} REST controller.
 */
@SpringBootTest(classes = UsermanagementappApp.class)
public class RolesResourceIT {

    private static final String DEFAULT_ROLE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private RolesService rolesService;

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

    private MockMvc restRolesMockMvc;

    private Roles roles;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolesResource rolesResource = new RolesResource(rolesService);
        this.restRolesMockMvc = MockMvcBuilders.standaloneSetup(rolesResource)
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
    public static Roles createEntity(EntityManager em) {
        Roles roles = new Roles()
            .roleType(DEFAULT_ROLE_TYPE)
            .role(DEFAULT_ROLE)
            .code(DEFAULT_CODE);
        return roles;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Roles createUpdatedEntity(EntityManager em) {
        Roles roles = new Roles()
            .roleType(UPDATED_ROLE_TYPE)
            .role(UPDATED_ROLE)
            .code(UPDATED_CODE);
        return roles;
    }

    @BeforeEach
    public void initTest() {
        roles = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoles() throws Exception {
        int databaseSizeBeforeCreate = rolesRepository.findAll().size();

        // Create the Roles
        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roles)))
            .andExpect(status().isCreated());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeCreate + 1);
        Roles testRoles = rolesList.get(rolesList.size() - 1);
        assertThat(testRoles.getRoleType()).isEqualTo(DEFAULT_ROLE_TYPE);
        assertThat(testRoles.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testRoles.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createRolesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolesRepository.findAll().size();

        // Create the Roles with an existing ID
        roles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roles)))
            .andExpect(status().isBadRequest());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRoleTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setRoleType(null);

        // Create the Roles, which fails.

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roles)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        // Get all the rolesList
        restRolesMockMvc.perform(get("/api/roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roles.getId().intValue())))
            .andExpect(jsonPath("$.[*].roleType").value(hasItem(DEFAULT_ROLE_TYPE)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        // Get the roles
        restRolesMockMvc.perform(get("/api/roles/{id}", roles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roles.getId().intValue()))
            .andExpect(jsonPath("$.roleType").value(DEFAULT_ROLE_TYPE))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingRoles() throws Exception {
        // Get the roles
        restRolesMockMvc.perform(get("/api/roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoles() throws Exception {
        // Initialize the database
        rolesService.save(roles);

        int databaseSizeBeforeUpdate = rolesRepository.findAll().size();

        // Update the roles
        Roles updatedRoles = rolesRepository.findById(roles.getId()).get();
        // Disconnect from session so that the updates on updatedRoles are not directly saved in db
        em.detach(updatedRoles);
        updatedRoles
            .roleType(UPDATED_ROLE_TYPE)
            .role(UPDATED_ROLE)
            .code(UPDATED_CODE);

        restRolesMockMvc.perform(put("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoles)))
            .andExpect(status().isOk());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeUpdate);
        Roles testRoles = rolesList.get(rolesList.size() - 1);
        assertThat(testRoles.getRoleType()).isEqualTo(UPDATED_ROLE_TYPE);
        assertThat(testRoles.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testRoles.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingRoles() throws Exception {
        int databaseSizeBeforeUpdate = rolesRepository.findAll().size();

        // Create the Roles

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolesMockMvc.perform(put("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roles)))
            .andExpect(status().isBadRequest());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoles() throws Exception {
        // Initialize the database
        rolesService.save(roles);

        int databaseSizeBeforeDelete = rolesRepository.findAll().size();

        // Delete the roles
        restRolesMockMvc.perform(delete("/api/roles/{id}", roles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
