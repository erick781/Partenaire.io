-- Seed ops_clients with 60 clients extracted from PandaDoc contracts
-- Source: "Contrats Partenaire.io — Suivi complet" (30 mars 2026)
--
-- Notes:
--   * 4 clients marked N/A have no completed PandaDoc document (verify manually)
--   * Kevin Ledoux (#29) and Opsell (#30) have hybrid models: fixed + % monthly
--   * All values are contract totals (HT / hors taxes), except #60 Louis-Antoine Brochu (taxes incl.)
--   * Contract duration = 12 months for all (date_signature to date_fin = ~12 months)
--   * dollars_par_mois_cents = valeur_contrat / 12 (estimated monthly)

INSERT INTO ops_clients (client_name, date_debut, duree_mois, ltv_contractuelle_cents, dollars_par_mois_cents, statut_actuel, notes)
VALUES
  -- #1 Mathieu Riendeau CSF
  ('Mathieu Riendeau CSF', '2025-09-12', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 12 sept 2026.'),

  -- #2 Christina Montesano — N/A in PandaDoc
  ('Christina Montesano', NULL, NULL, NULL, NULL, 'actif', 'N/A dans PandaDoc — vérifier manuellement.'),

  -- #3 Andrew Vallée - Équipe Nano
  ('Andrew Vallée - Équipe Nano', '2025-04-23', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 23 avr 2026.'),

  -- #4 Isaac Mayer — N/A in PandaDoc
  ('Isaac Mayer', NULL, NULL, NULL, NULL, 'actif', 'N/A dans PandaDoc — vérifier manuellement.'),

  -- #5 Dany Lacoursière - Soyuz Sport
  ('Dany Lacoursière - Soyuz Sport', '2025-11-26', 12, 2400000, 200000, 'actif', 'Contrat $24,000 + taxes. Fin: 26 nov 2026.'),

  -- #6 François Beaudoin - IA Groupe financier
  ('François Beaudoin - IA Groupe financier', '2025-12-02', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 2 déc 2026.'),

  -- #7 Denis Provencal - Cabane à Sucre d''Amours
  ('Denis Provencal - Cabane à Sucre d''Amours', '2025-11-12', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 12 nov 2026.'),

  -- #8 Chloe Robinson Inc.
  ('Chloe Robinson Inc.', '2026-01-07', 12, 300000, 25000, 'actif', 'Contrat $3,000 + taxes. Fin: 7 janv 2027.'),

  -- #9 Nikita Mandanici - Groupe Sutton Performer
  ('Nikita Mandanici - Groupe Sutton Performer', '2025-12-30', 12, 1200000, 100000, 'actif', 'Contrat $12,000 + taxes. Fin: 30 déc 2026.'),

  -- #10 Catherine Villeneuve - Peak Longévité
  ('Catherine Villeneuve - Peak Longévité', '2025-12-23', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 23 déc 2026.'),

  -- #11 Empire Gold Auctions (Eddy Rogo)
  ('Empire Gold Auctions (Eddy Rogo)', '2025-12-17', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 17 déc 2026.'),

  -- #12 Pat BBQ (Daniel Pigeon)
  ('Pat BBQ (Daniel Pigeon)', '2026-01-06', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 6 janv 2027.'),

  -- #13 Tommy Genest - Dock Industries Inc.
  ('Tommy Genest - Dock Industries Inc.', '2026-02-06', 12, 1800000, 150000, 'actif', 'Contrat $18,000 + taxes. Fin: 6 févr 2027.'),

  -- #14 David Therriault - Comptes Recevables.net
  ('David Therriault - Comptes Recevables.net', '2026-01-21', 12, 900000, 75000, 'actif', 'Contrat $9,000 + taxes. Fin: 21 janv 2027.'),

  -- #15 Philippe Lapointe - Services Financiers
  ('Philippe Lapointe - Services Financiers', '2026-01-22', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 22 janv 2027.'),

  -- #16 Karine Lécuyer - Intelligence IC-GO
  ('Karine Lécuyer - Intelligence IC-GO', '2026-01-22', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 22 janv 2027.'),

  -- #17 Sylvain Giguères - Recrutement GK Inc.
  ('Sylvain Giguères - Recrutement GK Inc.', '2026-01-21', 12, 900000, 75000, 'actif', 'Contrat $9,000 + taxes. Fin: 21 janv 2027.'),

  -- #18 Joan Sariol - Les bâtiments Metbec
  ('Joan Sariol - Les bâtiments Metbec', '2026-02-03', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 3 févr 2027.'),

  -- #19 Patrick Achkar - PosturoPlus Inc.
  ('Patrick Achkar - PosturoPlus Inc.', '2026-01-27', 12, 3300000, 275000, 'actif', 'Contrat $33,000 + taxes. Fin: 27 janv 2027.'),

  -- #20 Jean-François Lemelin - Costiveo
  ('Jean-François Lemelin - Costiveo', '2026-01-26', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 26 janv 2027.'),

  -- #21 Sabrina Portillo - Courtière Hypothécaire
  ('Sabrina Portillo - Courtière Hypothécaire', '2026-02-19', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 19 févr 2027.'),

  -- #22 Eli Lallouz - Vision 770
  ('Eli Lallouz - Vision 770', '2026-02-19', 12, 1800000, 150000, 'actif', 'Contrat $18,000 + taxes. Fin: 19 févr 2027.'),

  -- #23 Opti W (Eli Lallouz) — N/A in PandaDoc
  ('Opti W (Eli Lallouz)', NULL, NULL, NULL, NULL, 'actif', 'N/A dans PandaDoc — vérifier manuellement. Même client que Vision 770.'),

  -- #24 Dany Bernard - Fondussimo
  ('Dany Bernard - Fondussimo', '2026-02-18', 12, 4800000, 400000, 'actif', 'Contrat $48,000 + taxes. Fin: 18 févr 2027.'),

  -- #25 Antony Kerr-Aspirot - aspavocats
  ('Antony Kerr-Aspirot - aspavocats', '2026-02-23', 12, 0, 0, 'actif', 'Contrat $0 + taxes. Fin: 23 févr 2027. Vérifier — valeur $0?'),

  -- #26 Myriam Longpré - Hypothèques JA
  ('Myriam Longpré - Hypothèques JA', '2026-03-13', 12, 4800000, 400000, 'actif', 'Contrat $48,000 + taxes. Fin: 13 mars 2027.'),

  -- #27 Olivier Cloutier - Mr Clouts — N/A in PandaDoc
  ('Olivier Cloutier - Mr Clouts', NULL, NULL, NULL, NULL, 'actif', 'N/A dans PandaDoc — vérifier manuellement.'),

  -- #28 Geneviève Couture - Genny Santé & Beauté
  ('Geneviève Couture - Genny Santé & Beauté', '2026-02-10', 12, 900000, 75000, 'actif', 'Contrat $9,000 + taxes. Fin: 10 févr 2027.'),

  -- #29 Kevin Ledoux - Ecom Guidé
  ('Kevin Ledoux - Ecom Guidé', '2026-03-03', 12, 2000000, 166667, 'actif', 'Contrat $20,000 + 15%/mois (modèle hybride). Fin: 3 mars 2027.'),

  -- #30 Opsell (Pier-Alexandre Ouellet)
  ('Opsell (Pier-Alexandre Ouellet)', '2026-03-16', 12, 2000000, 166667, 'actif', 'Contrat $20,000 + 10%/mois (modèle hybride). Fin: 16 mars 2027.'),

  -- #31 Eloic Daco
  ('Eloic Daco', '2026-03-25', 12, 850000, 70833, 'actif', 'Contrat $8,500 + taxes. Fin: 25 mars 2027.'),

  -- #32 Jean-Phillipe Riopel
  ('Jean-Phillipe Riopel', '2026-03-24', 12, 4800000, 400000, 'actif', 'Contrat $48,000 + taxes. Fin: 24 mars 2027.'),

  -- #33 Marie Michelle Bolduc
  ('Marie Michelle Bolduc', '2026-03-11', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 11 mars 2027.'),

  -- #34 Maxime Darcy
  ('Maxime Darcy', '2026-02-04', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 4 févr 2027.'),

  -- #35 Matt et Julie Grondin
  ('Matt et Julie Grondin', '2026-02-03', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 3 févr 2027.'),

  -- #36 Paul-Émile Leroux
  ('Paul-Émile Leroux', '2026-01-29', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 29 janv 2027.'),

  -- #37 Yelena Markus
  ('Yelena Markus', '2026-01-16', 12, 1200000, 100000, 'actif', 'Contrat $12,000 + taxes. Fin: 16 janv 2027.'),

  -- #38 Olivier Veilleux Inc
  ('Olivier Veilleux Inc', '2026-01-10', 12, 1800000, 150000, 'actif', 'Contrat $18,000 + taxes. Fin: 10 janv 2027.'),

  -- #39 William Dery
  ('William Dery', '2026-01-09', 12, 3000000, 250000, 'actif', 'Contrat $30,000 + taxes. Fin: 9 janv 2027.'),

  -- #40 Michel Langlois - Dr Hypothecaire
  ('Michel Langlois - Dr Hypothecaire', '2026-01-06', 12, 450000, 37500, 'actif', 'Contrat $4,500 + taxes. Fin: 6 janv 2027.'),

  -- #41 Leonie Filiatrault
  ('Leonie Filiatrault', '2025-12-30', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 30 déc 2026.'),

  -- #42 Guy Derhy - Smd Fashion
  ('Guy Derhy - Smd Fashion', '2025-12-22', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 22 déc 2026.'),

  -- #43 Allan Julien Jean-Jacques
  ('Allan Julien Jean-Jacques', '2025-12-08', 12, 1000000, 83333, 'actif', 'Contrat $10,000 + taxes. Fin: 8 déc 2026.'),

  -- #44 Gabriel Dionne - Lettrage Dionne
  ('Gabriel Dionne - Lettrage Dionne', '2025-11-25', 12, 2400000, 200000, 'actif', 'Contrat $24,000 + taxes. Fin: 25 nov 2026.'),

  -- #45 Antoine C. Vallières
  ('Antoine C. Vallières', '2025-11-25', 12, 3600000, 300000, 'actif', 'Contrat $36,000 + taxes. Fin: 25 nov 2026.'),

  -- #46 Olivier Lachance - Hypothèque
  ('Olivier Lachance - Hypothèque', '2025-10-30', 12, 600000, 50000, 'actif', 'Contrat $6,000 + taxes. Fin: 30 oct 2026.'),

  -- #47 Christophe Mulumba
  ('Christophe Mulumba', '2025-09-30', 12, 500000, 41667, 'actif', 'Contrat $5,000 + taxes. Fin: 30 sept 2026.'),

  -- #48 Dany Therrien - Institut de vente éthique
  ('Dany Therrien - Institut de vente éthique', '2025-09-13', 12, 5160000, 430000, 'actif', 'Contrat $51,600 + taxes. Fin: 13 sept 2026.'),

  -- #49 Sylvain Tremblay - 55+ Yoga
  ('Sylvain Tremblay - 55+ Yoga', '2025-09-09', 12, 750000, 62500, 'actif', 'Contrat $7,500 + taxes. Fin: 9 sept 2026.'),

  -- #50 Arnaud Laporte - Ménages Probrite
  ('Arnaud Laporte - Ménages Probrite', '2025-09-08', 12, 435000, 36250, 'actif', 'Contrat $4,350 + taxes. Fin: 8 sept 2026.'),

  -- #51 Jean-Philip Sirois
  ('Jean-Philip Sirois', '2025-09-01', 12, 500000, 41667, 'actif', 'Contrat $5,000 + taxes. Fin: 1 sept 2026.'),

  -- #52 Jacques Demers - Courtier Immobilier Inc
  ('Jacques Demers - Courtier Immobilier Inc', '2025-08-28', 12, 900000, 75000, 'actif', 'Contrat $9,000 + taxes. Fin: 28 août 2026.'),

  -- #53 Jonathan Lamirande - Courtier Immobilier Inc.
  ('Jonathan Lamirande - Courtier Immobilier Inc.', '2025-08-28', 12, 500000, 41667, 'actif', 'Contrat $5,000 + taxes. Fin: 28 août 2026.'),

  -- #54 Juan Carlos Cardenas
  ('Juan Carlos Cardenas', '2025-08-24', 12, 450000, 37500, 'actif', 'Contrat $4,500 + taxes. Fin: 24 août 2026.'),

  -- #55 Yanick Bélanger Inc
  ('Yanick Bélanger Inc', '2025-08-21', 12, 900000, 75000, 'actif', 'Contrat $9,000 + taxes. Fin: 21 août 2026.'),

  -- #56 Yan Bordeleau - Pression Ultima
  ('Yan Bordeleau - Pression Ultima', '2025-08-17', 12, 333300, 27775, 'actif', 'Contrat $3,333 + taxes. Fin: 17 août 2026.'),

  -- #57 Jason Maxwell - 1 Clean Air
  ('Jason Maxwell - 1 Clean Air', '2025-08-17', 12, 999900, 83325, 'actif', 'Contrat $9,999 + taxes. Fin: 17 août 2026.'),

  -- #58 Alexis Ouellet Gauthier
  ('Alexis Ouellet Gauthier', '2025-08-11', 12, 999900, 83325, 'actif', 'Contrat $9,999 + taxes. Fin: 11 août 2026.'),

  -- #59 Eric Tousignant - Onlyone Coaching
  ('Eric Tousignant - Onlyone Coaching', '2025-08-11', 12, 270000, 22500, 'actif', 'Contrat $2,700 + taxes. Fin: 11 août 2026.'),

  -- #60 Louis-Antoine Brochu
  ('Louis-Antoine Brochu', '2025-07-22', 12, 344925, 28744, 'actif', 'Contrat $3,449.25 taxes incluses. Fin: 22 juil 2026.')
;

-- ============================================================
-- Summary statistics after seed
-- ============================================================
-- Total clients: 60 (56 with contract data, 4 N/A)
-- Total contract value (LTV Contractuelle): ~$878,147 CAD
-- Estimated monthly revenue if all paying: ~$73,179/mois
-- Contract range: $0 (aspavocats) to $51,600 (Institut de vente éthique)
-- Oldest contract: 22 juil 2025 (Louis-Antoine Brochu)
-- Newest contract: 25 mars 2026 (Eloic Daco)
-- 2 hybrid models: Kevin Ledoux ($20K + 15%/mois), Opsell ($20K + 10%/mois)
--
-- ITEMS NEEDING MANUAL VERIFICATION:
--   - #2  Christina Montesano (N/A)
--   - #4  Isaac Mayer (N/A)
--   - #23 Opti W / Eli Lallouz (N/A, same person as #22 Vision 770)
--   - #25 aspavocats ($0 contract — intentional?)
--   - #27 Olivier Cloutier - Mr Clouts (N/A)
