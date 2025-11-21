
CREATE TABLE contract_master (
    sno INT PRIMARY KEY AUTO_INCREMENT,
    ceid VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    divPaId VARCHAR(100) NOT NULL,
    divPaName VARCHAR(100) NOT NULL,
    divHeadId VARCHAR(100) NOT NULL,
    divHeadName VARCHAR(100) NOT NULL,
    divId VARCHAR(100) NOT NULL,
    divName VARCHAR(100) NOT NULL, 
    adminId VARCHAR(100) NOT NULL,
    adminName VARCHAR(100) NOT NULL
);
INSERT INTO contract_master (ceid, name, divPaId, divPaName,divHeadId,divHeadName,divId,divName,adminId,adminName) VALUES
('GASL2501', 'Priya Sharma', 'PA12501', 'Neha','SF12501','Santhosh','DIV2501','Divsion1','AD12500','Vikram'),
('GASL2502', 'Ravi Verma', 'PA12501', 'Neha','SF12501','Santhosh','DIV2501','Divsion1','AD12500','Vikram'),
('GASL2503',  'Sneha Reddy', 'PA12501', 'Neha','SF12501','Santhosh','DIV2501','Divsion1','AD12500','Vikram'),
('GASL2504',  'Vikram Joshi', 'PA12501', 'Neha','SF12501','Santhosh','DIV2501','Divsion1','AD12500','Vikram'),
('GASL2505', 'Neha Patel', 'PA12501', 'Neha','SF12501','Santhosh','DIV2501','Divsion1','AD12500','Vikram'),
('GASL2506', 'Arjun Mehta', 'PA12502', 'Likitha','SF12502','Divya','DIV2502','Divsion2','AD12500','Vikram'),
('GASL2507', 'Kavya Nair', 'PA12502', 'Likitha','SF12502','Divya','DIV2502','Divsion2','AD12500','Vikram'),
('GASL2508', 'Suresh Das', 'PA12502', 'Likitha','SF12502','Divya','DIV2502','Divsion2','AD12500','Vikram'),
('GASL2509', 'Anjali Rao', 'PA12502', 'Likitha','SF12502','Divya','DIV2502','Divsion2','AD12500','Vikram'),
('GASL2510', 'Rahul Singh', 'PA12502', 'Likitha','SF12502','Divya','DIV2502','Divsion2','AD12500','Vikram'),
('GASL2511', 'Meera Iyer', 'PA12503', 'Nikitha','SF12503','Ashwin','DIV2503','Divsion3','AD12500','Vikram'),
('GASL2512', 'Manish Jain', 'PA12503', 'Nikitha','SF12503','Ashwin','DIV2503','Divsion3','AD12500','Vikram'),
('GASL2513', 'Divya Shah', 'PA12503', 'Nikitha','SF12503','Ashwin','DIV2503','Divsion3','AD12500','Vikram'),
('GASL2514', 'Karan Bansal', 'PA12503', 'Nikitha','SF12503','Ashwin','DIV2503','Divsion3','AD12500','Vikram'),
('GASL2515', 'Ritika Chauhan', 'PA12503', 'Nikitha','SF12503','Ashwin','DIV2503','Divsion3','AD12500','Vikram');


ALTER TABLE contract_master
ADD UNIQUE (ceid);


CREATE TABLE regularisation_request (
    sno INT PRIMARY KEY AUTO_INCREMENT,
    ceid  VARCHAR(100) NOT NULL ,
    date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    time TIME,
    reason VARCHAR(255) NOT NULL ,
    requested_at DATE NULL,
    accepted_at DATE NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    approved_at DATE NULL, 
    FOREIGN KEY (ceid) REFERENCES contract_master(ceid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE regularisation_request 
MODIFY COLUMN date DATE;

-- ALTER TABLE regularisation_request ADD COLUMN reason TEXT;
-- ALTER TABLE regularisation_request
-- MODIFY COLUMN reason VARCHAR(255);

-- ALTER TABLE regularisation_request ADD COLUMN time TIME;
-- ALTER TABLE regularisation_request ADD COLUMN approved_at DATE;

-- DELETE FROM regularisation_request;










-- CREATE TABLE approved_requests (
--    sno INT PRIMARY KEY AUTO_INCREMENT,
--     ceid VARCHAR(100) NOT NULL,
--     date DATE NOT NULL,
--     type VARCHAR(50),
--     Status VARCHAR(20) DEFAULT 'Approved',
--     approved_at DATE
-- );
DROP TABLE approved_requests;

-- ALTER TABLE approved_requests
-- MODIFY COLUMN date DATE;

-- ALTER TABLE approved_requests DROP INDEX ceid_2;

-- SHOW INDEX FROM approved_requests;


-- ALTER TABLE approved_requests
-- ADD CONSTRAINT fk_approved_requests_ceid
-- FOREIGN KEY (ceid)
-- REFERENCES regularisation_request(ceid)
-- ON DELETE CASCADE;

-- SHOW CREATE TABLE approved_requests;

-- SELECT * FROM approved_requests WHERE ceid IS NOT NULL;

-- ALTER TABLE approved_requests DROP INDEX ceid;





-- ALTER TABLE approved_requests
-- ADD COLUMN regularisation_id BIGINT;

-- -- Add foreign key relationship to the primary key of regularisation_request
-- ALTER TABLE approved_requests
-- ADD CONSTRAINT fk_regularisation_id
-- FOREIGN KEY (regularisation_id)
-- REFERENCES regularisation_request(sno)
-- ON DELETE CASCADE;


-- ALTER TABLE approved_requests ADD COLUMN Requested TIMESTAMP;

DELETE FROM regularisation_request
WHERE sno>=2;
