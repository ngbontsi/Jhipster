package com.bontsi.app.web.rest;

import com.bontsi.app.GettingstatedApp;

import com.bontsi.app.domain.RoomService;
import com.bontsi.app.repository.RoomServiceRepository;
import com.bontsi.app.service.RoomServiceService;
import com.bontsi.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.bontsi.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RoomServiceResource REST controller.
 *
 * @see RoomServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GettingstatedApp.class)
public class RoomServiceResourceIntTest {

    private static final Integer DEFAULT_DESCRIPTION = 1;
    private static final Integer UPDATED_DESCRIPTION = 2;

    @Autowired
    private RoomServiceRepository roomServiceRepository;

    @Autowired
    private RoomServiceService roomServiceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRoomServiceMockMvc;

    private RoomService roomService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoomServiceResource roomServiceResource = new RoomServiceResource(roomServiceService);
        this.restRoomServiceMockMvc = MockMvcBuilders.standaloneSetup(roomServiceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoomService createEntity(EntityManager em) {
        RoomService roomService = new RoomService()
            .description(DEFAULT_DESCRIPTION);
        return roomService;
    }

    @Before
    public void initTest() {
        roomService = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoomService() throws Exception {
        int databaseSizeBeforeCreate = roomServiceRepository.findAll().size();

        // Create the RoomService
        restRoomServiceMockMvc.perform(post("/api/room-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomService)))
            .andExpect(status().isCreated());

        // Validate the RoomService in the database
        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeCreate + 1);
        RoomService testRoomService = roomServiceList.get(roomServiceList.size() - 1);
        assertThat(testRoomService.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRoomServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roomServiceRepository.findAll().size();

        // Create the RoomService with an existing ID
        roomService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomServiceMockMvc.perform(post("/api/room-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomService)))
            .andExpect(status().isBadRequest());

        // Validate the RoomService in the database
        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = roomServiceRepository.findAll().size();
        // set the field null
        roomService.setDescription(null);

        // Create the RoomService, which fails.

        restRoomServiceMockMvc.perform(post("/api/room-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomService)))
            .andExpect(status().isBadRequest());

        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRoomServices() throws Exception {
        // Initialize the database
        roomServiceRepository.saveAndFlush(roomService);

        // Get all the roomServiceList
        restRoomServiceMockMvc.perform(get("/api/room-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roomService.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void getRoomService() throws Exception {
        // Initialize the database
        roomServiceRepository.saveAndFlush(roomService);

        // Get the roomService
        restRoomServiceMockMvc.perform(get("/api/room-services/{id}", roomService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roomService.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingRoomService() throws Exception {
        // Get the roomService
        restRoomServiceMockMvc.perform(get("/api/room-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoomService() throws Exception {
        // Initialize the database
        roomServiceService.save(roomService);

        int databaseSizeBeforeUpdate = roomServiceRepository.findAll().size();

        // Update the roomService
        RoomService updatedRoomService = roomServiceRepository.findOne(roomService.getId());
        // Disconnect from session so that the updates on updatedRoomService are not directly saved in db
        em.detach(updatedRoomService);
        updatedRoomService
            .description(UPDATED_DESCRIPTION);

        restRoomServiceMockMvc.perform(put("/api/room-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoomService)))
            .andExpect(status().isOk());

        // Validate the RoomService in the database
        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeUpdate);
        RoomService testRoomService = roomServiceList.get(roomServiceList.size() - 1);
        assertThat(testRoomService.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRoomService() throws Exception {
        int databaseSizeBeforeUpdate = roomServiceRepository.findAll().size();

        // Create the RoomService

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoomServiceMockMvc.perform(put("/api/room-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomService)))
            .andExpect(status().isCreated());

        // Validate the RoomService in the database
        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRoomService() throws Exception {
        // Initialize the database
        roomServiceService.save(roomService);

        int databaseSizeBeforeDelete = roomServiceRepository.findAll().size();

        // Get the roomService
        restRoomServiceMockMvc.perform(delete("/api/room-services/{id}", roomService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RoomService> roomServiceList = roomServiceRepository.findAll();
        assertThat(roomServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomService.class);
        RoomService roomService1 = new RoomService();
        roomService1.setId(1L);
        RoomService roomService2 = new RoomService();
        roomService2.setId(roomService1.getId());
        assertThat(roomService1).isEqualTo(roomService2);
        roomService2.setId(2L);
        assertThat(roomService1).isNotEqualTo(roomService2);
        roomService1.setId(null);
        assertThat(roomService1).isNotEqualTo(roomService2);
    }
}
