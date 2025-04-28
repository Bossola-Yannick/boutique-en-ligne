INSERT INTO user (last_name, first_name, email, password, adress, postal_code, city, role) VALUES
('yannick', 'bossola', 'yannick@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'admin'),
('james', 'sanchez', 'james@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'admin');

INSERT INTO sub_category (id_subcategory, name_subcategory) VALUES
(1, 'Fantastique & Légendaire'),
(2, 'Histoire & Médiéval'),
(3, 'Uniformes'),
(4, 'Humour & Parodie'),
(5, 'Pop Culture'),
(6, 'Epoques & Styles'),
(7, 'Aventure'),
(8, 'Animaux & Créatures'),
(9, 'Nourriture & Nature');

INSERT INTO tag (id_tag, name_tag) VALUES
(1, 'Halloween / Sorcière'),
(2, 'Magique / Féerique'),
(3, 'Chevalier / Héroïque'),
(4, 'Créature / Monstre'),
(5, 'Aventure / Héros'),
(6, 'Fantasy / Médiéval'),
(7, 'Nature / Jardin / Fleur'),
(8, 'Viking / Guerrier'),
(9, 'Far West / Cowboy'),
(10, 'Science-fiction / Futuriste'),
(11, 'Comique / Humour'),
(12, 'Militaire / Camouflage'),
(13, 'Plante / Nature'),
(14, 'Historique / Antique'),
(15, 'Espiègle / Joyeux'),
(16, 'Mystique'),
(17, 'Noël'),
(18, 'Festif'),
(19, 'Élégance'),
(20, 'Majesté'),
(21, 'Gastronomie / Cuisine'),
(22, 'Sauvage / Animal'),
(23, 'Tropical / Fruit'),
(24, 'Western / Aventure'),
(25, 'Japon / Traditionnel'),
(26, 'Glamour / Mode'),
(27, 'Rétro / Vintage');

-- deguisements
INSERT INTO product (name_product, description, stock, price_ht, price_ttc, price_discount, image_link, category, id_subcategory) VALUES
('Abeille', 'Déguisée en abeille bourdonnante, cette poule pollinise les champs... et pique les grains des autres avec style !', 17, 18.15, 21.78, 21.78, 'abeille.png', 'déguisement', 8),
('Alien', 'Venue de la planète Coop-007 pour étudier les humains.', 20, 22.35, 26.82, 26.82, 'alien.png', 'déguisement', 5),
('Ananas', 'Avec sa coiffe feuillue et son corps en écailles dorées, elle est prête pour une parade tropicale.', 41, 19.67, 23.60, 23.60, 'ananas.png', 'déguisement', 9),
('Années 70', 'Afro, pattes d’eph’ et disco dans la basse-cour.', 40, 15.83, 19.00, 19.00, 'annee-70.png', 'déguisement', 6),
('Astronaute', 'Première poule sur la Lune. Elle a pondu dans l’espace.', 35, 22.06, 26.47, 21.18, 'astronaute.png', 'déguisement', 7),
('Banane', 'Attention, elle risque de glisser sur elle-même.', 14, 18.34, 22.01, 22.01, 'banane.png', 'déguisement', 4),
('Bière', 'En canette dorée avec une mousse sur la crête, elle fait pétiller la basse-cour à chaque pas.', 12, 16.29, 19.55, 19.55, 'biere.png', 'déguisement', 9),
('Bonne soeur', "Voile blanc, regard sage : Soeur Poulette prie pour de belles récoltes d'oeufs.", 31, 24.98, 29.98, 29.98, 'bonne-soeur.png', 'déguisement', 3),
('Cactus', 'Recouverte de piquants (inoffensifs), elle garde son calme en milieu aride… ou sur le rebord de fenêtre.', 15, 20.13, 24.16, 24.16, 'cactus.png', 'déguisement', 9),
('Chevalier', 'Défend le poulailler avec courage et cotte de mailles.', 37, 18.76, 22.51, 18.01, 'chevalier.png', 'déguisement', 2),
('Chucky', 'Une poupoule possédée, effrayante mais trop mignonne.', 19, 22.70, 27.24, 27.24, 'chucky.png', 'déguisement', 1),
('Clown', 'Fait rire petits et grands avec ses pirouettes plumées.', 46, 21.29, 25.55, 25.55, 'clown.png', 'déguisement', 4),
('Coquelicot', 'Ce déguisement vous transforme en une fleur éclatante, prête à faire fleurir la basse-cour avec votre charme pétillant.', 50, 15.99, 19.19, 19.19, 'coquelicot.png', 'déguisement', 9),
('Cowboy', 'Galope dans le Far West à dos de cochon miniature.', 27, 21.18, 25.42, 25.42, 'cowboy.png', 'déguisement', 5),
('Cuisinier', 'Prépare la meilleure omelette de toute la basse-cour.', 22, 17.44, 20.93, 20.93, 'cuisinier.png', 'déguisement', 3),
('Dinosaure', 'La vérité éclate : les dinos étaient des poules badass.', 50, 21.90, 26.28, 26.28, 'dinosaure.png', 'déguisement', 8),
('Dracula', 'Transformez-vous en le maître des ténèbres et faites frémir tous les poules avec ce déguisement élégant et effrayant. Soyez le roi de la nuit !', 35, 18.99, 22.79, 22.79, 'dracula.png', 'déguisement', 1),
('Dragon', "Elle crache du feu (ou presque) et garde son trésor d'oeufs avec férocité.", 41, 23.91, 28.69, 28.69, 'dragon.png', 'déguisement', 1),
('Écolière japonaise', 'Sérieuse, studieuse… et fan de mangas bien sûr.', 43, 17.54, 21.05, 21.05, 'ecoliere-japonaise.png', 'déguisement', 6),
('Fée', 'Ajoutez un peu de magie à votre quotidien avec ce déguisement de fée. Parfait pour voler parmi les fleurs et exaucer des vœux… ou juste faire rire vos amis.', 60, 14.50, 17.40, 17.40, 'fee.png', 'déguisement', 1),
('Gladiateur', 'Casque doré, armure brillante et courage inébranlable : elle règne dans l’arène du poulailler, ailes levées pour la gloire !', 15, 19.21, 23.05, 23.05, 'gladiateur.png', 'déguisement', 2),
("Hôtesse de l'air", 'Prenez de l’altitude avec ce déguisement d’hôtesse de l’air, élégant et prêt à servir les graines de manière très classe.', 40, 19.99, 23.99, 23.99, 'hotesse-de-lair.png', 'déguisement', 3),
('Infirmière', 'Soigne les coeurs brisés avec des oeufs tout doux.', 38, 22.23, 26.68, 26.68, 'infirmiere.png', 'déguisement', 3),
('Jedi', 'Elle maîtrise la Force… surtout pour voler du maïs.', 29, 21.54, 25.85, 25.85, 'jedi.png', 'déguisement', 1),
('Chanteur Jul', 'Pas de casque pour pas écraser sa crête : la poule du quartier est là, prête au rodéo.', 16, 19.77, 23.72, 18.98, 'jul.png', 'déguisement', 4),
('Licorne', 'Une poule magique qui pond des arcs-en-ciel.', 21, 24.31, 29.17, 29.17, 'licorne.png', 'déguisement', 1),
('Link', 'Vêtue d’une tunique verte, capuche sur la crête et bouclier miniature attaché à l’aile, cette poule héroïque traverse le royaume de Poulruda pour sauver la princesse oeufda.', 34, 18.47, 22.16, 17.73, 'link.png', 'déguisement', 1),
('Lion', 'Elle règne sur le poulailler avec une crinière majestueuse et un rugissement… très aigu.', 26, 19.04, 22.85, 22.85, 'lion.png', 'déguisement', 8),
('Lutin de Noël', 'Petit chapeau pointu, grelots à la queue, elle emballe les graines pour les fêtes.', 17, 16.74, 20.09, 20.09, 'lutin-de-noel.png', 'déguisement', 1),
('Mercredi Addams', 'Toujours sérieuse, elle prépare des potions sombres avec des plumes noires.', 42, 16.97, 20.36, 20.36, 'mercredi-adams.png', 'déguisement', 5),
('Nain de jardin', 'Immobile la journée, gardienne du potager la nuit.', 45, 17.65, 21.18, 21.18, 'nain-de-jardin.png', 'déguisement', 1),
('Ninja', 'Se déplace dans l’ombre… sauf quand elle caquette.', 33, 18.92, 22.70, 22.70, 'ninja.png', 'déguisement', 5),
('Oeuf', 'Elle rend hommage à ses origines. Costume minimaliste mais philosophique.', 27, 22.44, 26.93, 26.93, 'oeuf.png', 'déguisement', 9),
('Pieuvre', 'Avec huit tentacules cousus à ses ailes, elle nage dans les flaques comme personne.', 38, 23.76, 28.51, 22.81, 'pieuvre.png', 'déguisement', 8),
('Pinup', 'Avec ce déguisement rétro et glamour, vous serez la star de toutes les fêtes. Ajoutez un peu de vintage à votre look et faites tourner les têtes !', 45, 17.49, 20.99, 20.99, 'pinup.png', 'déguisement', 6),
('Pirate', 'À la recherche du trésor… ou d’un ver de terre doré.', 23, 20.47, 24.56, 24.56, 'pirate.png', 'déguisement', 7),
('Policier', 'Fait respecter l’ordre dans le poulailler à coups de klaxon.', 48, 19.12, 22.94, 22.94, 'policier.png', 'déguisement', 3),
('Pompier', 'Éteint les feux… de cuisson trop longue des oeufs !', 25, 20.64, 24.77, 24.77, 'pompier.png', 'déguisement', 3),
('Poulet rôti', 'Le cauchemar existentiel… assumé avec humour.', 39, 24.56, 29.47, 29.47, 'poulet-roti.png', 'déguisement', 4),
('Princesse', 'Sa majesté Plumette Première, prête à régner sur le royaume des graines avec grâce (et un peu de bec) !', 24, 17.88, 21.46, 21.46, 'princesse.png', 'déguisement', 1),
('Prisonnier', 'Évadée du poulailler, mais toujours impeccable en rayures chic !', 28, 22.87, 27.44, 27.44, 'prisonnier.png', 'déguisement', 3),
('Samouraï', 'Son sabre est plus rapide que son propre caquètement.', 12, 23.53, 28.24, 28.24, 'samourai.png', 'déguisement', 2),
('Soldat militaire', 'Camouflée dans les herbes hautes, en mission secrète.', 36, 18.23, 21.88, 21.88, 'soldat-militaire.png', 'déguisement', 3),
('Sorcière', 'Elle prépare des potions à base de graines ensorcelées.', 13, 19.89, 23.87, 23.87, 'sorciere.png', 'déguisement', 1),
('Spiderman', 'Mordu par une araignée radioactive… ou juste par l’envie d’être trop stylé : voici Spider-Poule !', 49, 23.41, 28.09, 28.09, 'spiderman.png', 'déguisement', 5),
('Sushi', 'Nouveau menu du jour : sushi avocat-saumon... avec supplément cacahuètes et coups de bec !', 24, 18.61, 22.33, 22.33, 'sushi.png', 'déguisement', 9),
('Viking', 'Navigue sur un bateau-coquille à la conquête des graines.', 30, 16.82, 20.18, 20.18, 'viking.png', 'déguisement', 2),
('Xénomorphe', 'Une créature alien noire avec queue articulée et bouche secondaire... mais qui continue de pondre.', 32, 20.86, 25.03, 25.03, 'xenomorphe.png', 'déguisement', 5);


--  accessoires 
INSERT INTO product (name_product, description, stock, price_ht, price_ttc, price_discount, image_link, category, id_subcategory) VALUES
('Baguette de Fée', 'Avec cette baguette, vous êtes prête à exaucer tous vos souhaits… ou à jeter un sort aux mauvaises herbes.', 50, 12.99, 15.59, 12.47, 'baguette-fee.png', 'accessoire', 1),
('Casque de Chevalier', 'Enfilez ce casque et devenez la garde royale du poulailler. Un coup d’épée et les graines sont à vous !', 40, 18.47, 22.16, 17.73, 'casque-chevalier.png', 'accessoire', 2),
('Casque Militaire', 'Ce casque est parfait pour les missions secrètes… ou pour cacher des plumes rebelles pendant l’opération "poules en formation".', 35, 20.32, 24.38, 19.50, 'casque-militaire.png', 'accessoire', 3),
('Casque de Viking', 'Soyez prêt à partir à l’assaut des graines avec ce casque orné de cornes. Parfait pour un raid épique… ou un déjeuner !', 28, 19.15, 22.98, 18.38, 'casque-viking.png', 'accessoire', 2),
('Champignon de Nain', 'Un champignon tout droit sorti des montagnes… mais sans la barbe. Juste assez pour protéger votre tête des mauvaises surprises !', 43, 10.50, 12.60, 12.60, 'champignon-nain.png', 'accessoire', 6),
('Chapeau coquelicot', 'Un chapeau qui vous donne l’allure d’une fleur en pleine éclosion. Mettez-le et attirez tous les regards avec style !', 50, 14.76, 17.71, 17.71, 'chapeau-coquelicot.png', 'accessoire', 8),
('Chapeau de Cowboy', 'Pour les journées de rodéo ou juste pour un petit air de Far West, ce chapeau de cowboy vous donne une prestance inimitable.', 30, 16.95, 20.34, 20.34, 'chapeau-cowboy.png', 'accessoire', 5),
('Chapeau de Cuisinier', 'Équipez-vous de ce chapeau pour devenir le chef incontesté du poulailler. Les omelettes n’auront jamais été aussi stylées !', 45, 12.30, 14.76, 14.76, 'toque-cuisinier.png', 'accessoire', 3),
('Chapeau de Fée', 'Petite touche magique pour faire briller la basse-cour. N’oubliez pas de saupoudrer un peu de poudre de fée !', 60, 11.99, 14.39, 14.39, 'chapeau-fee.png', 'accessoire', 1),
("Chapeau d'hotesse de l'air", 'Prenez de l’altitude avec ce chapeau d’hôtesse et laissez votre classe s’envoler avec vous !', 30, 17.62, 21.14, 21.14, 'chapeau-hotesse.png', 'accessoire', 3),
("Chapeau d'Infirmière", 'Un chapeau tout mignon pour soigner vos poules malades. En bonus, il donne une allure de super-héroïne de la basse-cour !', 50, 13.90, 16.68, 16.68, 'chapeau-infirmiere.png', 'accessoire', 3),
('Chapeau de Link', 'Avec ce chapeau pointu, vous êtes prête à partir sauver la princesse Œufda. Attention, les poules veulent aussi leur part du trésor !', 35, 18.60, 22.32, 22.32, 'chapeau-link.png', 'accessoire', 1),
('Chapeau de Lutin', 'Ce chapeau est parfait pour toutes vos escapades de Noël… ou pour apporter un peu de magie à n’importe quel jour de l’année.', 40, 14.22, 17.07, 17.07, 'chapeau-lutin.png', 'accessoire', 2),
('Chapeau de Nain', 'Laissez vos rêves de montagne se réaliser avec ce chapeau de nain. Idéal pour les expéditions secrètes et les feux de camp !', 55, 13.56, 16.27, 16.27, 'chapeau-nain.png', 'accessoire', 6),
('Chapeau et nez de Clown', 'Parce que chaque poule a besoin de rire un peu, voici l’ensemble parfait pour être la star du cirque du poulailler !', 50, 10.35, 12.42, 12.42, 'chapeau-nez-clown.png', 'accessoire', 4),
('Chapeau de pailles', 'Un chapeau tout simple mais efficace pour un look champêtre. Parfait pour vos escapades sous le soleil ou les fêtes de la basse-cour.', 60, 9.47, 11.36, 11.36, 'chapeau-paille-cactus.png', 'accessoire', 9),
('Chapeau de Pinup', 'Un style rétro et glamour pour attirer tous les regards. Préparez-vous à être la star de toutes les fêtes !', 38, 16.88, 20.26, 20.26, 'chapeau-pinup.png', 'accessoire', 6),
('Chapeau de Pirate', 'Joli chapeau pour partir à l’aventure, le vent dans les plumes, et un crâne sous le bras. Le trésor est à portée de bec !', 25, 17.12, 20.54, 20.54, 'chapeau-pirate.png', 'accessoire', 7),
('Chapeau de Policier', 'Haut en couleur et prêt à faire respecter l’ordre. Ce chapeau donnera du panache à vos patrouilles au poulailler.', 50, 14.95, 17.94, 17.94, 'chapeau-policier.png', 'accessoire', 3),
('Chapeau de Pompier', 'Prête à éteindre les incendies de graines avec ce chapeau. Juste assez pour ajouter un peu de glorieuse chaleur à votre look.', 45, 18.22, 21.86, 21.86, 'chapeau-pompier.png', 'accessoire', 3),
('Chapeau de Samouraï', 'Avec ce chapeau, vous serez aussi redoutable qu’un samouraï… mais surtout, incroyablement stylée.', 30, 19.34, 23.21, 23.21, 'chapeau-samourai.png', 'accessoire', 2),
('Chapeau de Sorcière', 'Ajoutez un peu de magie noire (ou peut-être juste un peu de poussière d’œuf) avec ce chapeau de sorcière bien pointu.', 55, 13.76, 16.51, 16.51, 'chapeau-sorciere.png', 'accessoire', 1),
('Chaussures Pots de fleurs', 'Des chaussures pratiques et originales : parfaites pour garder des petites plantes tout en marchant avec style !', 22, 25.43, 30.52, 30.52, 'chaussure-pots-cactus.png', 'accessoire', 9),
('Couteau de Cuisine', 'Pour couper des légumes… ou des graines. Ce couteau tout droit sorti de la cuisine est un allié incontournable pour vos repas festifs.', 40, 15.88, 19.06, 19.06, 'couteau-chucky.png', 'accessoire', 3),
('Cuillère de Cuisinier', 'La cuillère parfaite pour bien mélanger votre mélange secret de graines… ou pour préparer l’omelette la plus magique.', 50, 12.74, 15.29, 15.29, 'cuillere-cuisinier.png', 'accessoire', 3),
('Epee de Link', 'Une épée légendaire pour défendre le royaume des graines. Attention à ne pas couper les plumes avec !', 35, 24.22, 29.06, 29.06, 'epee-link.png', 'accessoire', 1),
('Fusil de Militaire', 'L’arme secrète des poules d’élite pour garder les œufs sous haute protection. Toujours prête pour une mission délicate !', 20, 27.48, 32.98, 32.98, 'famas-militaire.png', 'accessoire', 3),
('Hache de Viking', 'Une hache parfaite pour trancher les obstacles (ou les graines) et partir à l’assaut des grandes aventures !', 22, 23.56, 28.27, 28.27, 'hache-viking.png', 'accessoire', 2),
('Shuriken de Ninja', 'Parfait pour les missions furtives… ou juste pour couper des graines avec une précision ninja.', 50, 10.44, 12.53, 12.53, 'ninja-arme.png', 'accessoire', 5),
('Perruque Blonde', 'Une perruque blonde éclatante pour briller sous le soleil. Attention, les regards ne vous quitteront plus !', 40, 16.77, 20.12, 20.12, 'perruque-blonde-jul.png', 'accessoire', 5),
('Perruque et Lunettes Années70', 'Retour dans le temps avec cette perruque funky et lunettes stylées. Parfait pour une soirée disco ou un rodéo !', 30, 18.99, 22.79, 22.79, 'perruque-lunette-annee-70.png', 'accessoire', 6),
('Perruque Rousse', 'Avec cette perruque, vous serez la star du poulailler. Tous les regards seront tournés vers votre crinière flamboyante !', 50, 17.64, 21.17, 21.17, 'perruque-rousse-chucky.png', 'accessoire', 5),
('Revolver de Cowboy', 'Un revolver stylé pour compléter votre look de cowboy. Attention, les poules un peu trop aventureuses pourraient être effrayées !', 35, 22.10, 26.52, 26.52, 'revolver-cowboy.png', 'accessoire', 5),
('Sabre laser de Jedi', 'Maîtrisez la Force avec ce sabre laser. Préparez-vous à défendre l’Empire des graines avec votre lumière verte.', 30, 27.92, 33.50, 33.50, 'sabre-laser-jedi.png', 'accessoire', 1),
("Sac d'hotesse de l'air", 'Un sac élégant pour vos escapades célestes. Pratique pour ranger vos graines tout en restant chic à 30 000 pieds.', 20, 22.50, 27.00, 27.00, 'sac-hotesse.png', 'accessoire', 3);


INSERT INTO product_tag (id_product, id_tag) VALUES 
(1, 3), -- Link : Chevalier / Héroïque
(1, 6), -- Link : Fantasy / Médiéval
(1, 5), -- Link : Aventure / Héros
(2, 2), -- Licorne : Magique / Féerique
(2, 4), -- Licorne : Créature / Monstre
(2, 5), -- Licorne : Aventure / Héros
(3, 2), -- Sorcière : Magique / Féerique
(3, 16), -- Sorcière : Mystique
(3, 1), -- Sorcière : Halloween
(4, 7), -- Nain de jardin : Nature / Jardin / Fleur
(4, 13), -- Nain de jardin : Plante / Nature
(4, 11), -- Nain de jardin : Comique / Humour
(5, 10), -- Jedi : Science-fiction / Futuriste
(5, 3), -- Jedi : Chevalier / Héroïque
(5, 5), -- Jedi : Aventure / Héros
(6, 4), -- Chucky : Créature / Monstre
(6, 1), -- Chucky : Halloween
(6, 11), -- Chucky : Comique / Humour
(7, 4), -- Dragon : Créature / Monstre
(7, 6), -- Dragon : Fantasy / Médiéval
(7, 5), -- Dragon : Aventure / Héros
(8, 17), -- Lutin de Noël : Noël
(8, 18), -- Lutin de Noël : Festif
(8, 15), -- Lutin de Noël : Espiègle / Joyeux
(9, 6), -- Princesse : Fantasy / Médiéval
(9, 3), -- Princesse : Chevalier / Héroïque
(9, 20), -- Princesse : Majesté
(10, 6), -- Chevalier : Fantasy / Médiéval
(10, 3), -- Chevalier : Chevalier / Héroïque
(10, 5), -- Chevalier : Aventure / Héros
(11, 25), -- Samouraï : Japon / Traditionnel
(11, 8), -- Samouraï : Viking / Guerrier
(11, 5), -- Samouraï : Aventure / Héros
(12, 8), -- Viking : Viking / Guerrier
(12, 14), -- Viking : Historique / Antique
(12, 5), -- Viking : Aventure / Héros
(13, 14), -- Gladiateur : Historique / Antique
(13, 8), -- Gladiateur : Viking / Guerrier
(13, 5), -- Gladiateur : Aventure / Héros
(14, 12), -- Pompier : Militaire / Camouflage
(14, 5), -- Pompier : Aventure / Héros
(14, 11), -- Pompier : Comique / Humour
(15, 5), -- Policier : Aventure / Héros
(15, 12), -- Policier : Sécurité / Autorité
(16, 21), -- Infirmière : Gastronomie / Cuisine
(16, 5), -- Infirmière : Aventure / Héros
(16, 12), -- Infirmière : Militaire / Camouflage
(17, 21), -- Cuisinier : Gastronomie / Cuisine
(17, 5), -- Cuisinier : Aventure / Héros
(18, 21), -- Soldat militaire : Gastronomie / Cuisine
(18, 12), -- Soldat militaire : Militaire / Camouflage
(19, 12), -- Bonne sœur : Militaire / Camouflage
(19, 16), -- Bonne sœur : Mystique
(20, 15), -- Prisonnier : Comique / Humour
(20, 5), -- Prisonnier : Aventure / Héros
(21, 11), -- Banane : Comique / Humour
(21, 23), -- Banane : Tropical / Fruit
(22, 21), -- Poulet rôti : Gastronomie / Cuisine
(22, 11), -- Poulet rôti : Comique / Humour
(23, 6), -- Clown : Fantasy / Médiéval
(23, 11), -- Clown : Comique / Humour
(24, 11), -- Chanteur Jul : Comique / Humour
(24, 27), -- Chanteur Jul : Rétro / Vintage
(25, 10), -- Alien : Science-fiction / Futuriste
(25, 4), -- Alien : Créature / Monstre
(25, 5), -- Alien : Aventure / Héros
(26, 9), -- Cowboy : Far West / Cowboy
(26, 24), -- Cowboy : Western / Aventure
(27, 25), -- Ninja : Japon / Traditionnel
(27, 8), -- Ninja : Viking / Guerrier
(28, 4), -- Mercredi Addams : Créature / Monstre
(28, 16), -- Mercredi Addams : Mystique
(29, 4), -- Xénomorphe : Créature / Monstre
(29, 10), -- Xénomorphe : Science-fiction / Futuriste
(30, 5), -- Spiderman : Aventure / Héros
(30, 4), -- Spiderman : Créature / Monstre
(31, 27), -- Années 70 : Rétro / Vintage
(31, 11), -- Années 70 : Comique / Humour
(32, 25), -- Écolière japonaise : Japon / Traditionnel
(32, 5), -- Écolière japonaise : Aventure / Héros
(33, 9), -- Pirate : Far West / Cowboy
(33, 24), -- Pirate : Western / Aventure
(34, 10), -- Astronaute : Science-fiction / Futuriste
(34, 5), -- Astronaute : Aventure / Héros
(35, 4), -- Dinosaure : Créature / Monstre
(35, 5), -- Dinosaure : Aventure / Héros
(36, 22), -- Lion : Sauvage / Animal
(37, 13), -- Pieuvre : Plante / Nature
(38, 22), -- Abeille : Sauvage / Animal
(39, 23), -- Oeuf : Tropical / Fruit
(40, 11), -- Bière : Comique / Humour
(40, 23), -- Bière : Tropical / Fruit
(41, 23), -- Ananas : Tropical / Fruit
(42, 13), -- Cactus : Plante / Nature
(43, 21), -- Sushi : Gastronomie / Cuisine
(43, 10), -- Sushi : Science-fiction / Futuriste
(44, 13), -- Coquelicot : Plante / Nature
(45, 4), -- Dracula : Créature / Monstre
(45, 1), -- Dracula : Halloween
(46, 2), -- Fée : Magique / Féerique
(46, 5), -- Fée : Aventure / Héros
(47, 2), -- Baguette de Fée : Magique / Féerique
(47, 16), -- Baguette de Fée : Mystique
(48, 6), -- Casque de Chevalier : Fantasy / Médiéval
(48, 3), -- Casque de Chevalier : Chevalier / Héroïque
(49, 12), -- Casque Militaire : Sécurité / Autorité
(50, 8), -- Casque de Viking : Viking / Guerrier
(51, 13), -- Champignon de Nain : Plante / Nature
(52, 7), -- Chapeau Coquelicot : Nature / Jardin / Fleur
(53, 9), -- Chapeau de Cowboy : Far West / Cowboy
(54, 21), -- Chapeau de Cuisinier : Gastronomie / Cuisine
(55, 5), -- Chapeau de Fée : Aventure / Héros
(56, 26), -- Chapeau d'Hôtesse de l'air : Glamour / Mode
(57, 12), -- Chapeau d'Infirmière : Militaire / Camouflage
(58, 5), -- Chapeau de Link : Aventure / Héros
(59, 17), -- Chapeau de Lutin : Noël
(60, 11), -- Chapeau de Nain : Comique / Humour
(61, 21), -- Chapeau de Paille : Gastronomie / Cuisine
(62, 27), -- Chapeau de Pinup : Rétro / Vintage
(63, 24), -- Chapeau de Pirate : Western / Aventure
(64, 12), -- Chapeau de Policier : Militaire / Camouflage
(65, 5), -- Chapeau de Pompier : Aventure / Héros
(66, 25), -- Chapeau de Samouraï : Japon / Traditionnel
(67, 16), -- Chapeau de Sorcière : Mystique
(68, 7), -- Chaussures Pots de fleurs : Nature / Jardin / Fleur
(69, 21), -- Couteau de Cuisine : Gastronomie / Cuisine
(70, 21), -- Cuillère de Cuisinier : Gastronomie / Cuisine
(71, 3), -- Épée de Link : Chevalier / Héroïque
(72, 12), -- Fusil de Militaire : Militaire / Camouflage
(73, 8), -- Hache de Viking : Viking / Guerrier
(74, 27), -- Shuriken de Ninja : Rétro / Vintage
(75, 12), -- Perruque Blonde : Militaire / Camouflage
(76, 21), -- Perruque et Lunettes Années 70 : Gastronomie / Cuisine
(77, 15), -- Perruque Rousse : Espiègle / Joyeux
(78, 12), -- Revolver de Cowboy : Militaire / Camouflage
(79, 3), -- Sabre laser de Jedi : Chevalier / Héroïque
(80, 17); -- Sac d'Hôtesse de l'air : Noël

