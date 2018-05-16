package com.bontsi.app.web.rest;

import com.bontsi.app.GettingstatedApp;

import com.bontsi.app.domain.Bill;
import com.bontsi.app.repository.BillRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.bontsi.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BillResource REST controller.
 *
 * @see BillResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GettingstatedApp.class)
public class BillResourceIntTest {

    private static final Integer DEFAULT_BILLID = 1;
    private static final Integer UPDATED_BILLID = 2;

    private static final Integer DEFAULT_PAYTYPE = 1;
    private static final Integer UPDATED_PAYTYPE = 2;

    private static final Instant DEFAULT_PAYDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAYDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_COST = 1;
    private static final Integer UPDATED_COST = 2;

    private static final Integer DEFAULT_CUSTID = 1;
    private static final Integer UPDATED_CUSTID = 2;

    private static final Integer DEFAULT_SERVICEID = 1;
    private static final Integer UPDATED_SERVICEID = 2;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBillMockMvc;

    private Bill bill;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BillResource billResource = new BillResource(billRepository);
        this.restBillMockMvc = MockMvcBuilders.standaloneSetup(billResource)
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
    public static Bill createEntity(EntityManager em) {
        Bill bill = new Bill()
            .billid(DEFAULT_BILLID)
            .paytype(DEFAULT_PAYTYPE)
            .paydate(DEFAULT_PAYDATE)
            .cost(DEFAULT_COST)
            .custid(DEFAULT_CUSTID)
            .serviceid(DEFAULT_SERVICEID);
        return bill;
    }

    @Before
    public void initTest() {
        bill = createEntity(em);
    }

    @Test
    @Transactional
    public void createBill() throws Exception {
        int databaseSizeBeforeCreate = billRepository.findAll().size();

        // Create the Bill
        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isCreated());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeCreate + 1);
        Bill testBill = billList.get(billList.size() - 1);
        assertThat(testBill.getBillid()).isEqualTo(DEFAULT_BILLID);
        assertThat(testBill.getPaytype()).isEqualTo(DEFAULT_PAYTYPE);
        assertThat(testBill.getPaydate()).isEqualTo(DEFAULT_PAYDATE);
        assertThat(testBill.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testBill.getCustid()).isEqualTo(DEFAULT_CUSTID);
        assertThat(testBill.getServiceid()).isEqualTo(DEFAULT_SERVICEID);
    }

    @Test
    @Transactional
    public void createBillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billRepository.findAll().size();

        // Create the Bill with an existing ID
        bill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBillidIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setBillid(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaytypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setPaytype(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaydateIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setPaydate(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCostIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setCost(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCustidIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setCustid(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkServiceidIsRequired() throws Exception {
        int databaseSizeBeforeTest = billRepository.findAll().size();
        // set the field null
        bill.setServiceid(null);

        // Create the Bill, which fails.

        restBillMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isBadRequest());

        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBills() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);

        // Get all the billList
        restBillMockMvc.perform(get("/api/bills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bill.getId().intValue())))
            .andExpect(jsonPath("$.[*].billid").value(hasItem(DEFAULT_BILLID)))
            .andExpect(jsonPath("$.[*].paytype").value(hasItem(DEFAULT_PAYTYPE)))
            .andExpect(jsonPath("$.[*].paydate").value(hasItem(DEFAULT_PAYDATE.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST)))
            .andExpect(jsonPath("$.[*].custid").value(hasItem(DEFAULT_CUSTID)))
            .andExpect(jsonPath("$.[*].serviceid").value(hasItem(DEFAULT_SERVICEID)));
    }

    @Test
    @Transactional
    public void getBill() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);

        // Get the bill
        restBillMockMvc.perform(get("/api/bills/{id}", bill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bill.getId().intValue()))
            .andExpect(jsonPath("$.billid").value(DEFAULT_BILLID))
            .andExpect(jsonPath("$.paytype").value(DEFAULT_PAYTYPE))
            .andExpect(jsonPath("$.paydate").value(DEFAULT_PAYDATE.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST))
            .andExpect(jsonPath("$.custid").value(DEFAULT_CUSTID))
            .andExpect(jsonPath("$.serviceid").value(DEFAULT_SERVICEID));
    }

    @Test
    @Transactional
    public void getNonExistingBill() throws Exception {
        // Get the bill
        restBillMockMvc.perform(get("/api/bills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBill() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);
        int databaseSizeBeforeUpdate = billRepository.findAll().size();

        // Update the bill
        Bill updatedBill = billRepository.findOne(bill.getId());
        // Disconnect from session so that the updates on updatedBill are not directly saved in db
        em.detach(updatedBill);
        updatedBill
            .billid(UPDATED_BILLID)
            .paytype(UPDATED_PAYTYPE)
            .paydate(UPDATED_PAYDATE)
            .cost(UPDATED_COST)
            .custid(UPDATED_CUSTID)
            .serviceid(UPDATED_SERVICEID);

        restBillMockMvc.perform(put("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBill)))
            .andExpect(status().isOk());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeUpdate);
        Bill testBill = billList.get(billList.size() - 1);
        assertThat(testBill.getBillid()).isEqualTo(UPDATED_BILLID);
        assertThat(testBill.getPaytype()).isEqualTo(UPDATED_PAYTYPE);
        assertThat(testBill.getPaydate()).isEqualTo(UPDATED_PAYDATE);
        assertThat(testBill.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testBill.getCustid()).isEqualTo(UPDATED_CUSTID);
        assertThat(testBill.getServiceid()).isEqualTo(UPDATED_SERVICEID);
    }

    @Test
    @Transactional
    public void updateNonExistingBill() throws Exception {
        int databaseSizeBeforeUpdate = billRepository.findAll().size();

        // Create the Bill

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBillMockMvc.perform(put("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bill)))
            .andExpect(status().isCreated());

        // Validate the Bill in the database
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBill() throws Exception {
        // Initialize the database
        billRepository.saveAndFlush(bill);
        int databaseSizeBeforeDelete = billRepository.findAll().size();

        // Get the bill
        restBillMockMvc.perform(delete("/api/bills/{id}", bill.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bill> billList = billRepository.findAll();
        assertThat(billList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bill.class);
        Bill bill1 = new Bill();
        bill1.setId(1L);
        Bill bill2 = new Bill();
        bill2.setId(bill1.getId());
        assertThat(bill1).isEqualTo(bill2);
        bill2.setId(2L);
        assertThat(bill1).isNotEqualTo(bill2);
        bill1.setId(null);
        assertThat(bill1).isNotEqualTo(bill2);
    }
}
