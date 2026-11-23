-- ========================================================================
-- DAVIS PATHOLOGY LAB - DEMONSTRATION SEED DATA
-- Location: Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, UP
-- NOTE: All data below is fictional demonstration data for development.
-- ========================================================================

-- 1. TEST CATEGORIES
INSERT INTO public.test_categories (id, name, slug, description, icon, is_active) VALUES
('11111111-1111-1111-1111-111111111101', 'Hematology', 'hematology', 'Blood cell analysis and related investigations.', 'Droplets', true),
('11111111-1111-1111-1111-111111111102', 'Biochemistry', 'biochemistry', 'Chemical analysis of blood and body fluids.', 'FlaskConical', true),
('11111111-1111-1111-1111-111111111103', 'Thyroid & Hormonal Testing', 'thyroid', 'Thyroid function and hormonal assessments.', 'Activity', true),
('11111111-1111-1111-1111-111111111104', 'Clinical Pathology', 'clinical-pathology', 'Urine, stool, and other clinical specimen examinations.', 'Microscope', true),
('11111111-1111-1111-1111-111111111105', 'Serology', 'serology', 'Immunological and serological testing for infections.', 'Shield', true),
('11111111-1111-1111-1111-111111111106', 'Vitamins & Other Tests', 'vitamins', 'Vitamin levels and supplementary diagnostics.', 'Sun', true)
ON CONFLICT (slug) DO NOTHING;

-- 2. DIAGNOSTIC TESTS (18 Demonstration Tests)
INSERT INTO public.tests (id, category_id, name, slug, description, sample_type, preparation, turnaround_time, price, is_active) VALUES
('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', 'Complete Blood Count (CBC)', 'complete-blood-count', 'A comprehensive blood test that evaluates circulating cells including RBCs, WBCs, and platelets.', 'Blood (EDTA)', 'No special preparation required. Fasting not necessary.', '4–6 hours', 250.00, true),
('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111101', 'Hemoglobin', 'hemoglobin', 'Measures the concentration of hemoglobin in the bloodstream.', 'Blood (EDTA)', 'No special preparation required.', '2–4 hours', 80.00, true),
('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', 'ESR (Erythrocyte Sedimentation Rate)', 'esr', 'Rates red blood cell settling over 1 hour to detect inflammatory response.', 'Blood (EDTA)', 'No special preparation required.', '2–3 hours', 80.00, true),
('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111102', 'Liver Function Test (LFT)', 'liver-function-test', 'Comprehensive panel assessing Bilirubin, SGOT, SGPT, ALP, and proteins.', 'Blood (Serum)', 'Fasting for 10–12 hours recommended.', '6–8 hours', 450.00, true),
('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111102', 'Kidney Function Test (KFT)', 'kidney-function-test', 'Evaluates renal clearance through Urea, Creatinine, and Electrolytes.', 'Blood (Serum)', 'Fasting for 10–12 hours recommended.', '6–8 hours', 450.00, true),
('22222222-2222-2222-2222-222222222206', '11111111-1111-1111-1111-111111111102', 'Lipid Profile', 'lipid-profile', 'Measures Cholesterol, HDL, LDL, Triglycerides, and VLDL for cardiac health.', 'Blood (Serum)', 'Fasting for 10–12 hours strictly required.', '6–8 hours', 400.00, true),
('22222222-2222-2222-2222-222222222207', '11111111-1111-1111-1111-111111111102', 'Fasting Blood Sugar', 'fasting-blood-sugar', 'Measures fasting plasma glucose after overnight food cessation.', 'Blood (Fluoride)', 'Fasting for 8–12 hours. Only water allowed.', '2–4 hours', 80.00, true),
('22222222-2222-2222-2222-222222222208', '11111111-1111-1111-1111-111111111102', 'HbA1c (Glycated Hemoglobin)', 'hba1c', 'Provides 3-month estimated average blood sugar control levels.', 'Blood (EDTA)', 'No fasting required.', '4–6 hours', 350.00, true),
('22222222-2222-2222-2222-222222222209', '11111111-1111-1111-1111-111111111103', 'Thyroid Profile (T3, T4, TSH)', 'thyroid-profile', 'Triple parameter assessment for hyper/hypo thyroid disorders.', 'Blood (Serum)', 'No fasting necessary. Morning sample suggested.', '6–8 hours', 500.00, true),
('22222222-2222-2222-2222-222222222210', '11111111-1111-1111-1111-111111111103', 'TSH (Thyroid Stimulating Hormone)', 'tsh', 'Primary screening hormone for thyroid feedback regulation.', 'Blood (Serum)', 'No special preparation required.', '4–6 hours', 250.00, true),
('22222222-2222-2222-2222-222222222211', '11111111-1111-1111-1111-111111111106', 'Vitamin D (25-OH)', 'vitamin-d', 'Evaluates bone mineral density risk and immune support status.', 'Blood (Serum)', 'No special preparation required.', '24 hours', 600.00, true),
('22222222-2222-2222-2222-222222222212', '11111111-1111-1111-1111-111111111106', 'Vitamin B12', 'vitamin-b12', 'Assesses neurological integrity and megaloblastic anemia risks.', 'Blood (Serum)', 'No special preparation required.', '24 hours', 600.00, true),
('22222222-2222-2222-2222-222222222213', '11111111-1111-1111-1111-111111111106', 'Calcium', 'calcium', 'Total serum calcium for bone and electrolyte assessment.', 'Blood (Serum)', 'No special preparation required.', '4–6 hours', 150.00, true),
('22222222-2222-2222-2222-222222222214', '11111111-1111-1111-1111-111111111104', 'Urine Routine Examination', 'urine-routine', 'Physical, chemical, and microscopic examination of urine sample.', 'Urine (Mid-stream)', 'Clean catch midstream morning sample preferred.', '2–3 hours', 100.00, true),
('22222222-2222-2222-2222-222222222215', '11111111-1111-1111-1111-111111111104', 'Stool Examination', 'stool-examination', 'Microscopic and occult blood investigation of digestive stool.', 'Stool', 'Fresh specimen collected in sterile container.', '3–4 hours', 100.00, true),
('22222222-2222-2222-2222-222222222216', '11111111-1111-1111-1111-111111111105', 'Dengue Screening (NS1 + IgM + IgG)', 'dengue-screening', 'Combined antigen and antibody test for rapid dengue diagnosis.', 'Blood (Serum)', 'No special preparation required.', '4–6 hours', 500.00, true),
('22222222-2222-2222-2222-222222222217', '11111111-1111-1111-1111-111111111105', 'Malaria Testing (Rapid + Smear)', 'malaria-testing', 'Peripheral smear and rapid antigen card test for Plasmodium.', 'Blood (EDTA)', 'Recommended during pyrexia/fever spikes.', '2–4 hours', 300.00, true),
('22222222-2222-2222-2222-222222222218', '11111111-1111-1111-1111-111111111102', 'Postprandial Blood Sugar', 'postprandial-blood-sugar', 'Blood glucose evaluated exactly 2 hours following food intake.', 'Blood (Fluoride)', 'Draw blood exactly 2 hours after start of meal.', '2–4 hours', 80.00, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. HEALTH PACKAGES
INSERT INTO public.packages (id, name, slug, description, price, preparation, is_active) VALUES
('33333333-3333-3333-3333-333333333301', 'Basic Health Checkup', 'basic-health-checkup', 'An essential health screening package covering blood counts, blood sugar, and urine analysis. Ideal for routine health assessments.', 499.00, 'Fasting for 8–12 hours before test. Only water allowed.', true),
('33333333-3333-3333-3333-333333333302', 'Complete Health Checkup', 'complete-health-checkup', 'A comprehensive health screening package covering major organ functions, blood counts, thyroid screening, lipid levels, and blood sugar.', 999.00, 'Fasting for 10–12 hours before test. Disclose ongoing medication.', true),
('33333333-3333-3333-3333-333333333303', 'Diabetes Screening', 'diabetes-screening', 'A focused screening package for diabetes including Fasting Sugar, Postprandial Sugar, and HbA1c 3-month glycemic indicator.', 399.00, 'Fasting 8–12 hrs for sample 1; meal followed by sample 2 after 2 hrs.', true)
ON CONFLICT (slug) DO NOTHING;

-- 4. PACKAGE TEST ASSOCIATIONS
INSERT INTO public.package_tests (package_id, test_id) VALUES
-- Basic Health Checkup (CBC, Fasting Sugar, Urine)
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222207'),
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222214'),

-- Complete Health Checkup (CBC, LFT, KFT, Lipid, TSH, Fasting Sugar)
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222204'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222205'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222206'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222210'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222207'),

-- Diabetes Screening (Fasting Sugar, PP Sugar, HbA1c)
('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222207'),
('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222218'),
('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222208')
ON CONFLICT DO NOTHING;

-- 5. LABORATORY SETTINGS
INSERT INTO public.laboratory_settings (setting_key, setting_value) VALUES
('laboratory_name', '{"value": "Davis Pathology Lab"}'),
('address', '{"value": "Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh"}'),
('phone', '{"value": "+91 98765 43210"}'),
('email', '{"value": "info@davispathology.com"}'),
('whatsapp_number', '{"value": "919999999999"}'),
('working_hours', '{"weekday": "7:00 AM – 8:00 PM", "sunday": "8:00 AM – 2:00 PM"}')
ON CONFLICT (setting_key) DO NOTHING;
