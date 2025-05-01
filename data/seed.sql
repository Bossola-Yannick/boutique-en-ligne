INSERT INTO user (last_name, first_name, email, password, adress, postal_code, city, role) VALUES
('bossola', 'yannick', 'yannick@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'admin'),
('sanchez', 'james', 'james@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'admin'),
('abc', 'test', 'test@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'user'),
('def', 'test2', 'test2@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'user'),
('dgh', 'test3', 'test3@example.io', 'example', 'rue hozier', 13000, 'Marseille', 'user');

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
INSERT INTO product (name_product, description, stock, price_ht, price_ttc, price_discount, image_link, category, id_subcategory, rating_product) VALUES
('Abeille', 'Transforme ta poule en véritable butineuse des jardins ! Avec ce costume rayé noir et jaune, elle bourdonne d’élégance. Attention à ceux qui approchent ses œufs de trop près, elle pourrait les piquer avec son humour acide. Un déguisement doux comme le miel, mais piquant comme elle !', 17, 18.15, 21.78, 21.78, 'abeille.png', 'déguisement', 8, 4),
('Alien', 'Venue d’une autre galaxie (ou juste du poulailler voisin), cette poule cosmique débarque pour une mission top secrète : envahir ton cœur et ton jardin. Son look étrange et ses antennes rigolotes la rendent tout droit sortie d’un film de science-fiction… sans les effets spéciaux.', 20, 22.35, 26.82, 26.82, 'alien.png', 'déguisement', 5, 4),
('Ananas', 'Fraîche, fruitée et fabuleusement funky ! Cette poule tropicale est la star du poulailler avec ses couleurs vives et son look juteux. À défaut de pondre des ananas, elle promet une ambiance exotique dans la basse-cour. Idéale pour les brunchs à thème.', 41, 19.67, 23.60, 23.60, 'ananas.png', 'déguisement', 9, 4),
('Années 70', 'C’est le retour du disco, et ta poule compte bien briller sous la boule à facettes ! Avec son look à paillettes et sa coupe afro (façon plumes décoiffées), elle enflamme la piste du poulailler. Prépare les vinyls et laisse-la groover entre deux grains de maïs.', 40, 15.83, 19.00, 19.00, 'annee-70.png', 'déguisement', 6, 4),
('Astronaute', 'Cette poule a des rêves… lunaires. Parée pour la mission "Apollo-Poule 11", elle explore les confins du jardin comme une vraie exploratrice de l’espace. Gravité zéro ? Pas grave, elle garde les deux pattes sur Terre, mais la tête dans les étoiles.', 35, 22.06, 26.47, 21.18, 'astronaute.png', 'déguisement', 7, 4),
('Banane', 'Un déguisement totalement glissant... de rire ! Ta poule se transforme en délicieuse banane prête à faire sensation dans n’importe quelle cuisine. Bon, pas pour être mangée, évidemment. Elle préfère rester au sommet de la corbeille des stars de la ferme.', 14, 18.34, 22.01, 22.01, 'banane.png', 'déguisement', 4, 4),
('Bière', 'Pour les amateurs de malts et de malice. Cette poule mousse de bonne humeur avec sa tenue houblonnée et sa fraîcheur légendaire. Parfaite pour les apéros du dimanche, elle ne se boit pas, mais elle enivre les regards. Et gare à l’écume !', 12, 16.29, 19.55, 19.55, 'biere.png', 'déguisement', 9, 4),
('Bonne soeur', "Ave cocorico ! Cette poule sainte se consacre à la prière et à la ponte. Avec son voile noir et son regard pieux, elle veille sur le poulailler comme sur un couvent. Très stricte sur les heures de graines… mais pleine de compassion divine.", 31, 24.98, 29.98, 29.98, 'bonne-soeur.png', 'déguisement', 3, 4),
('Cactus', 'Elle ne manque pas de piquant ! Cette poule-cactus est parfaite pour les environnements arides ou les fêtes déguisées du far west. Verte, piquante et pleine de caractère, elle ne se laisse pas caresser dans le sens du plumage. À manipuler avec des gants (de jardin).', 15, 20.13, 24.16, 24.16, 'cactus.png', 'déguisement', 9, 4),
('Chevalier', 'Garde du corps officielle de la basse-cour ! Armée de bravoure et d’un casque scintillant, elle défend ses congénères contre les renards et autres dragons imaginaires. Elle pond pour la paix, mais elle n’hésite pas à se battre pour ses graines.', 37, 18.76, 22.51, 18.01, 'chevalier.png', 'déguisement', 2, 4),
('Chucky', 'Planquez les poussins ! Cette poule n’est pas là pour rigoler… enfin, si, mais avec un couteau en plastique. En mode “poule possédée”, elle fait flipper tout le monde au poulailler. Une vraie terreur… qui pond encore des œufs, mais avec un regard inquiétant.', 19, 22.70, 27.24, 27.24, 'chucky.png', 'déguisement', 1, 4),
('Clown', 'Rires garantis et pirouettes sur deux pattes ! Avec son nez rouge, ses plumes multicolores et son style de cirque, cette poule est la vedette du chapiteau. Gare à la crème chantilly dans les œufs, elle adore les blagues surprises.', 46, 21.29, 25.55, 25.55, 'clown.png', 'déguisement', 4, 4),
('Coquelicot', 'Fleur parmi les plumes, cette poule coquelicot apporte douceur et poésie dans la basse-cour. Un vent printanier souffle sur ses plumes rouges et délicates. Elle ne picore pas, elle caresse. Parfaite pour les pique-niques champêtres… avec style.', 50, 15.99, 19.19, 19.19, 'coquelicot.png', 'déguisement', 9, 4),
('Cowboy', 'Yeehaw ! Cette poule du Far West garde son poulailler comme un vrai shérif. Chapeau vissé sur la tête, éperons au bout des pattes (en peluche, bien sûr), elle dégaine plus vite que son ombre… surtout quand il s’agit de croquer du maïs.', 27, 21.18, 25.42, 25.42, 'cowboy.png', 'déguisement', 5, 4),
('Cuisinier', '"Chef Poule" aux commandes ! Avec sa toque et sa cuillère en bois, elle mijote des recettes 100 % graines. Étoilée au guide Pondeur, elle transforme une simple coquille en chef-d’œuvre gustatif. Attention, elle refuse qu’on la mette au menu !', 22, 17.44, 20.93, 20.93, 'cuisinier.png', 'déguisement', 3, 4),
('Dinosaure', 'Retour au Jurassique ! Digne descendante du T-Rex (selon elle), cette poule préhistorique rugit… enfin, caquète de manière terrifiante. Elle court vite, elle effraie les renards, et surtout : elle pond des œufs fossilisés d’humour.', 50, 21.90, 26.28, 26.28, 'dinosaure.png', 'déguisement', 8, 4),
('Dracula', 'Cette poule a soif… de style. Avec sa cape noire et son col relevé, elle règne sur les ténèbres du poulailler. Pas de panique, elle ne mord que les grains. Idéale pour Halloween ou les soirées “Transylvanie chez mamie”.', 35, 18.99, 22.79, 22.79, 'dracula.png', 'déguisement', 1, 4),
('Dragon', "Elle souffle le feu et fait fondre les cœurs ! Avec ses ailes en feutrine et sa crête de flamme, cette poule-dragon est majestueuse, redoutable et... légèrement dramatique. Une vraie star de fantasy, à la sauce oeuf dur.", 41, 23.91, 28.69, 28.69, 'dragon.png', 'déguisement', 1, 4),
('Écolière japonaise', 'Kawaii jusqu’au bout des plumes ! Cette poule studieuse débarque tout droit d’un manga. Uniforme soigné, sac à dos stylé, elle révise ses leçons entre deux graines. Elle sait lire, écrire, et surtout... faire craquer tout le poulailler.', 43, 17.54, 21.05, 21.05, 'ecoliere-japonaise.png', 'déguisement', 6, 4),
('Fée', 'Un peu de magie dans le poulailler ! Avec ses ailes scintillantes et sa baguette (optionnelle), elle transforme chaque matin en conte de fées. Si vous trouvez un œuf doré… c’est elle. Attention, elle jette des sorts de mignonnerie en continu.', 60, 14.50, 17.40, 17.40, 'fee.png', 'déguisement', 1, 4),
('Gladiateur', 'Dans l’arène du poulailler, seuls les plus courageux pondent avec honneur. Ce costume transforme ta poule en redoutable combattante antique : plastron, jupe en cuir (végétal) et regard de feu. Elle ne craint ni le faucon ni la boue. Ave Poulae, ceux qui vont pondre te saluent !', 15, 19.21, 23.05, 23.05, 'gladiateur.png', 'déguisement', 2, 4),
("Hôtesse de l'air", 'Bienvenue à bord du vol CoCoAirlines ! Avec ce déguisement, ta poule devient une professionnelle du ciel… ou du perchoir. Instructions de sécurité, ailes en position, et distribution de graines à volonté. Attention aux turbulences dans le poulailler.', 40, 19.99, 23.99, 23.99, 'hotesse-de-lair.png', 'déguisement', 3, 4),
('Infirmière', 'Blouse blanche, air rassurant et thermomètre prêt : ta poule devient l’ange gardien du poulailler. Parfaite pour veiller sur les poussins enrhumés ou recoller les plumes froissées après une bagarre de bec. Diagnostic : adorable.', 38, 22.23, 26.68, 26.68, 'infirmiere.png', 'déguisement', 3, 4),
('Jedi', 'Que la bec-force soit avec elle ! Ce costume transforme ta poule en gardienne de la paix intergalactique. Sabre laser invisible (mais ressenti), robe fluide et maîtrise du caquet télékinétique. Prête à affronter le côté obscur… du grillage.', 29, 21.54, 25.85, 25.85, 'jedi.png', 'déguisement', 1, 4),
('Chanteur Jul', 'Pas de casque pour pas écraser sa crête : la poule du quartier est là, prête au rodéo. Cette poule-là ne pond pas, elle balance des œufs en freestyle. Parfait pour ambiancer la basse-cour avec des “Wesh ma poule !” entre deux refrains.', 16, 19.77, 23.72, 18.98, 'jul.png', 'déguisement', 4, 4),
('Licorne', 'Transformez votre poule en créature légendaire avec ce costume de licorne. Crinière arc-en-ciel, corne magique et regard féerique garantissent des œufs enchantés au petit-déjeuner. Attention, elle pourrait vouloir trotter sur un arc-en-ciel.', 21, 24.31, 29.17, 29.17, 'licorne.png', 'déguisement', 1, 4),
('Link', 'Votre poule part à l’aventure ! Avec le costume de Link, elle combattra les Ganon de la basse-cour et protégera la Triforce... ou plutôt le bac à graines. "Cocoricooo… Hyaaah !"', 34, 18.47, 22.16, 17.73, 'link.png', 'déguisement', 1, 4),
('Lion', 'Offrez à votre poule l’attitude du roi de la savane ! Ce costume de lion transforme n’importe quel gallinacé en prédateur à plumes. Le rugissement est remplacé par un caquètement féroce !', 26, 19.04, 22.85, 22.85, 'lion.png', 'déguisement', 8, 4),
('Lutin de Noël', 'Pour les fêtes, habillez votre poule comme un adorable lutin de Noël. Elle aide le Père Poule à distribuer les graines avec bonne humeur. Idéal pour ceux qui aiment les surprises sous la paille.', 17, 16.74, 20.09, 20.09, 'lutin-de-noel.png', 'déguisement', 1, 4),
('Mercredi Addams', 'D’un noir mystérieux, ce déguisement offre à votre poule une allure gothique et imperturbable. Parfait pour pondre des œufs sombres et poétiques.', 42, 16.97, 20.36, 20.36, 'mercredi-adams.png', 'déguisement', 5, 4),
('Nain de jardin', 'Voici un costume pour les poules qui aiment rester immobiles… ou presque. En version nain, elle garde le potager avec autorité et pond à l’abri des regards indiscrets.', 45, 17.65, 21.18, 21.18, 'nain-de-jardin.png', 'déguisement', 1, 4),
('Ninja', 'Discrétion, agilité et maîtrise du lancer de grain… Avec ce déguisement, votre poule devient une ombre dans la nuit. Prouesse : pondre sans bruit.', 33, 18.92, 22.70, 22.70, 'ninja.png', 'déguisement', 5, 4),
('Oeuf', 'Ironie ultime : la poule déguisée en œuf. Un classique du méta-poulailler. Parfait pour les humoristes à plumes qui n’ont pas peur de la coquille.', 27, 22.44, 26.93, 26.93, 'oeuf.png', 'déguisement', 9, 4),
('Pieuvre', "Huit tentacules et zéro peur : votre poule s'improvise pieuvre des champs. Idéal pour garder les gamelles… et caresser les poussins en multitâche.", 38, 23.76, 28.51, 22.81, 'pieuvre.png', 'déguisement', 8, 4),
('Pinup', 'Un style rétro et glamour ! Plumes bien coiffées, robe évasée et regard de braise… votre poule devient l’icône vintage du poulailler. Les coqs vont tourner de la crête.', 45, 17.49, 20.99, 20.99, 'pinup.png', 'déguisement', 6, 4),
('Pirate', 'Arrr, moussaillon ! Ce costume fait de votre poule la terreur des sept flaques. Cachez vos trésors de maïs ! Elle ne recule devant aucun abordage.', 23, 20.47, 24.56, 24.56, 'pirate.png', 'déguisement', 7, 4),
('Policier', 'Attention, contrôle du bec ! La poule en uniforme veille au respect de la loi dans le poulailler. Son arme ? Une amende de picotements pour mauvaise conduite.', 48, 19.12, 22.94, 22.94, 'policier.png', 'déguisement', 3, 4),
('Pompier', "Toujours prête à éteindre les débuts d'incendie (ou d’embrouilles entre poules), ce costume fait d’elle l’héroïne des flammes… et des œufs trop cuits.", 25, 20.64, 24.77, 24.77, 'pompier.png', 'déguisement', 3, 4),
('Poulet rôti', 'Un humour bien croustillant. Déguiser votre poule en poulet rôti, c’est un peu osé, mais tellement drôle. Recommandé pour les poules qui n’ont pas froid aux plumes !', 39, 24.56, 29.47, 29.47, 'poulet-roti.png', 'déguisement', 4, 4),
('Princesse', 'Avec sa robe majestueuse et sa couronne scintillante, votre poule règne sur le royaume du perchoir. Étiquette stricte : ne picorez qu’avec grâce.', 24, 17.88, 21.46, 21.46, 'princesse.png', 'déguisement', 1, 4),
('Prisonnier', 'Barreaux fictifs et rayures réalistes, ce costume donne à votre poule un petit air rebelle. "Je suis innocente, j’ai été piquée à tort !"', 28, 22.87, 27.44, 27.44, 'prisonnier.png', 'déguisement', 3, 4),
('Samouraï', 'Discipline, honneur et sabre de blé. Le costume de samouraï transforme votre poule en guerrière du soleil levant, gardienne du dojo du pondoir.', 12, 23.53, 28.24, 28.24, 'samourai.png', 'déguisement', 2, 4),
('Soldat militaire', 'Pour une poule toujours prête à défendre le territoire contre les intrusions félines. Tenue camouflée, œufs en rang, mission accomplie.', 36, 18.23, 21.88, 21.88, 'soldat-militaire.png', 'déguisement', 3, 4),
('Sorcière', 'Chapeau pointu, robe noire et grimoire de graines, votre poule devient une magicienne du crépuscule. Gare aux sorts de picage et potions de picotements.', 13, 19.89, 23.87, 23.87, 'sorciere.png', 'déguisement', 1, 4),
('Spiderman', 'Une piqûre radioactive et la voilà prête à escalader le grillage du poulailler. Elle ne pond plus, elle tisse ! "Avec un grand bec vient une grande responsabilité."', 49, 23.41, 28.09, 28.09, 'spiderman.png', 'déguisement', 5, 4),
('Sushi', 'Créez la confusion et l’hilarité : une poule déguisée en sushi, c’est une fusion culinaire. À consommer avec humour uniquement.', 24, 18.61, 22.33, 22.33, 'sushi.png', 'déguisement', 9, 4),
('Viking', 'Casque à cornes, cape flottante et cri de guerre : votre poule part en raid pour conquérir les mangeoires. Skål, camarades de la basse-cour !', 30, 16.82, 20.18, 20.18, 'viking.png', 'déguisement', 2, 4),
('Xénomorphe', 'Un hommage à la science-fiction : votre poule devient la créature de l’espace la plus terrifiante. Pond des œufs… surprises.', 32, 20.86, 25.03, 25.03, 'xenomorphe.png', 'déguisement', 5, 4);


--  accessoires 
INSERT INTO product (name_product, description, stock, price_ht, price_ttc, price_discount, image_link, category, id_subcategory, rating_product) VALUES
('Baguette de Fée', 'Ajoute une touche de magie à ta poule ! Cette baguette transforme chaque caquetement en un sort joyeux (ou presque). Un coup de baguette et hop : un grain de maïs apparaît (dans ses rêves).', 50, 12.99, 15.59, 12.47, 'baguette-fee.png', 'accessoire', 1, 4),
('Casque de Chevalier', 'Protège le noble crâne de ta poule en mission. Idéal pour les joutes amicales dans le jardin ou pour surveiller son fief depuis la mangeoire. Le devoir avant la pondeuse !', 40, 18.47, 22.16, 17.73, 'casque-chevalier.png', 'accessoire', 2, 4),
('Casque Militaire', 'Camouflée et prête à l’action ! Ce casque transforme ta poule en stratège de terrain, parfaite pour planifier des assauts sur le compost ou des opérations de reconnaissance au potager.', 35, 20.32, 24.38, 19.50, 'casque-militaire.png', 'accessoire', 3, 4),
('Casque de Viking', 'Cornes imposantes et attitude farouche. Ce casque confère à ta poule la force d’un drakkar ! Idéal pour partir à la conquête du jardin ou piller la mangeoire de la voisine.', 28, 19.15, 22.98, 18.38, 'casque-viking.png', 'accessoire', 2, 4),
('Champignon de Nain', 'Une ambiance de conte de fées au plumage ! Ce chapeau-champignon donne à ta poule un look mystique. Parfait pour se fondre dans le décor de la forêt enchantée (ou le pot de fleurs).', 43, 10.50, 12.60, 12.60, 'champignon-nain.png', 'accessoire', 6, 4),
('Chapeau coquelicot', 'Poétique et printanier, ce chapeau fait de ta poule une fleur parmi les plumes. Idéal pour les shooting champêtres ou les bals de la basse-cour.', 50, 14.76, 17.71, 17.71, 'chapeau-coquelicot.png', 'accessoire', 8, 4),
('Chapeau de Cowboy', 'Yee-haw ! Ce chapeau envoie ta poule tout droit dans un western. Elle gardera le poulailler avec style, tout en grattant la terre comme une véritable shérif du Far West.', 30, 16.95, 20.34, 20.34, 'chapeau-cowboy.png', 'accessoire', 5, 4),
('Chapeau de Cuisinier', 'Chef Coq entre en cuisine ! Avec ce chapeau, ta poule devient la star du barbecue ou du brunch. Idéal pour préparer la meilleure omelette de la basse-cour (sans sacrifier ses propres oeufs).', 45, 12.30, 14.76, 14.76, 'toque-cuisinier.png', 'accessoire', 3, 4),
('Chapeau de Fée', 'Un chapeau conique scintillant pour ajouter un zeste de magie à ses aventures. Elle peut maintenant faire apparaître des miettes par enchantement (ou gratter la terre pour les trouver).', 60, 11.99, 14.39, 14.39, 'chapeau-fee.png', 'accessoire', 1, 4),
("Chapeau d'hotesse de l'air", 'Coiffée pour décoller ! Ce chapeau donne à ta poule un air distingué. Elle ne se contente plus de voler du grain, elle le distribue avec le sourire.', 30, 17.62, 21.14, 21.14, 'chapeau-hotesse.png', 'accessoire', 3, 4),
("Chapeau d'Infirmière", 'Pour une poule attentive au bien-être du poulailler. Ce chapeau rouge et blanc rassure les poussins et veille au moral des troupes. Becs et soins au programme !', 50, 13.90, 16.68, 16.68, 'chapeau-infirmiere.png', 'accessoire', 3, 4),
('Chapeau de Link', 'Une aventure légendaire commence. Avec ce bonnet vert emblématique, ta poule devient une héroïne de la nature, prête à affronter les vers les plus redoutables.', 35, 18.60, 22.32, 22.32, 'chapeau-link.png', 'accessoire', 1, 4),
('Chapeau de Lutin', 'Petit et malin, ce chapeau transforme ta poule en assistante du Père Noël ou en farceuse professionnelle. Parfait pour les fêtes et les oeufs surprises.', 40, 14.22, 17.07, 17.07, 'chapeau-lutin.png', 'accessoire', 2, 4),
('Chapeau de Nain', 'Ta poule devient un ouvrier mystique du jardin. Ce chapeau pointu fait d’elle une créature légendaire... avec des pattes. Idéal pour veiller sur les carottes.', 55, 13.56, 16.27, 16.27, 'chapeau-nain.png', 'accessoire', 6, 4),
('Chapeau et nez de Clown', 'Un look hilarant pour la star du poulailler. Entre roulades dans la paille et jonglage avec les vers, elle fait rire toute la basse-cour. Attention aux poulettes sensibles.', 50, 10.35, 12.42, 12.42, 'chapeau-nez-clown.png', 'accessoire', 4, 4),
('Chapeau de pailles', 'Rustique et stylé, ce chapeau donne à ta poule l’air d’une fermiere aguerrie. Parfait pour la sieste sous le soleil ou le picorage à l’ancienne.', 60, 9.47, 11.36, 11.36, 'chapeau-paille-cactus.png', 'accessoire', 9, 4),
('Chapeau de Pinup', 'Un vent de glamour souffle sur le poulailler ! Ce chapeau vintage est idéal pour les poules qui aiment être admirées (et elles ont raison).', 38, 16.88, 20.26, 20.26, 'chapeau-pinup.png', 'accessoire', 6, 4),
('Chapeau de Pirate', 'Ahoy ! Cap sur la mangeoire ! Ce couvre-chef transforme ta poule en corsaire du compost. Idéal pour partir à la chasse aux trésors (graines cachées).', 25, 17.12, 20.54, 20.54, 'chapeau-pirate.png', 'accessoire', 7, 4),
('Chapeau de Policier', 'À la recherche des graines volées ? Voici la poule de l’ordre ! Ce chapeau assure qu’aucun bec ne franchisse la ligne jaune sans autorisation.', 50, 14.95, 17.94, 17.94, 'chapeau-policier.png', 'accessoire', 3, 4),
('Chapeau de Pompier', 'Urgence dans le poulailler ? Pas de panique, la poule pompier est là ! Ce casque rouge assure style et réactivité. Elle maîtrise aussi bien le feu... que la flemme.', 45, 18.22, 21.86, 21.86, 'chapeau-pompier.png', 'accessoire', 3, 4),
('Chapeau de Samouraï', 'Honneur, discipline et crête créstée. Ce couvre-chef métamorphose ta poule en guerrière silencieuse. Elle coupera le vent avant de couper du pain.', 30, 19.34, 23.21, 23.21, 'chapeau-samourai.png', 'accessoire', 2, 4),
('Chapeau de Sorcière', 'Mystérieuse et un peu perchée, elle sait préparer des potions à base de vers et d’orties. Ce chapeau pointu est idéal pour des sortilèges de picorage.', 55, 13.76, 16.51, 16.51, 'chapeau-sorciere.png', 'accessoire', 1, 4),
('Chaussures Pots de fleurs', 'Des chaussures ? Non. De l’art de jardinage ambulant ! Ta poule devient la fierté de tout balcon fleuri. Elle piétine le style comme personne.', 22, 25.43, 30.52, 30.52, 'chaussure-pots-cactus.png', 'accessoire', 9, 4),
('Couteau de Cuisine', "Une déco redoutable accrochée au flanc. Avec ce faux couteau, ta poule a l'air d'un chef... ou d'un thriller à plumes. Suspense garanti.", 40, 15.88, 19.06, 19.06, 'couteau-chucky.png', 'accessoire', 3, 4),
('Cuillère de Cuisinier', 'Accessoire incontournable pour la poule gourmette. Elle goûte tout, juge avec bec précis et garde toujours sa cuillère prête au cas où.', 50, 12.74, 15.29, 15.29, 'cuillere-cuisinier.png', 'accessoire', 3, 4),
('Epee de Link', 'La quête de l’oeuf d’or commence. Avec cette épée symbolique, ta poule brave tous les dangers du jardin. Un héros ne craint pas les limaces !', 35, 24.22, 29.06, 29.06, 'epee-link.png', 'accessoire', 1, 4),
('Fusil de Militaire', 'Armée jusqu’au bec, ta poule est prête à tout pour protéger sa bande. Ce jouet stratégique donne une allure imposante et beaucoup d’autorégie. Sir, oui sir !', 20, 27.48, 32.98, 32.98, 'famas-militaire.png', 'accessoire', 3, 4),
('Hache de Viking', "Par Odin ! Avec cette hache miniature, ta poule prend d'assaut le compost tel un véritable guerrier nordique. Entre deux beuglements vikings (ou gloussements, ça dépend), elle fend la paille comme un conquérant.", 22, 23.56, 28.27, 28.27, 'hache-viking.png', 'accessoire', 2, 4),
('Shuriken de Ninja', 'Silencieuse, précise, redoutable. Ce petit shuriken sur le plumage donne à ta poule un style furtif inégalé. Tu la vois, tu ne la vois plus. Les vers n’ont qu’à bien se cacher.', 50, 10.44, 12.53, 12.53, 'ninja-arme.png', 'accessoire', 5, 4),
('Perruque Blonde', "Hollywood l'appelle. Cette perruque transforme ta poule en starlette de la basse-cour. Elle boude les graines ordinaires et ne picore que bio, sous les projecteurs.", 40, 16.77, 20.12, 20.12, 'perruque-blonde-jul.png', 'accessoire', 5, 4),
('Perruque et Lunettes Années70', "Flower power au poulailler ! Ta poule groove sur du disco avec ce combo perruque et lunettes rétro. Elle ne pond plus, elle chante de l'oeuf.", 30, 18.99, 22.79, 22.79, 'perruque-lunette-annee-70.png', 'accessoire', 6, 4),
('Perruque Rousse', 'Du caractère et des plumes flamboyantes. Cette perruque donne à ta poule une aura de diva intrépide. Elle mène la danse du poulailler, un pas de bec à la fois.', 50, 17.64, 21.17, 21.17, 'perruque-rousse-chucky.png', 'accessoire', 5, 4),
('Revolver de Cowboy', 'Pan ! Le shérif est en ville. Ce mini revolver accroché au plumage suffit à imposer le respect dans toute la basse-cour. Elle tire plus vite que son ombre… surtout quand il s’agit de voler une graine.', 35, 22.10, 26.52, 26.52, 'revolver-cowboy.png', 'accessoire', 5, 4),
('Sabre laser de Jedi', "La Poule Réveil a son arme. Avec ce sabre lumineux (en plastique, hein), elle garde l'équilibre dans la Force du Picorage. Que le grain soit avec toi.", 30, 27.92, 33.50, 33.50, 'sabre-laser-jedi.png', 'accessoire', 1, 4),
("Sac d'hotesse de l'air", 'Voyageuse élégante, ta poule transporte ses essentiels : miettes de pain, plume de rechange et un plan de vol. Le style cabine, mais version basse-cour.', 20, 22.50, 27.00, 27.00, 'sac-hotesse.png', 'accessoire', 3, 4);

INSERT INTO product_tag (id_product, id_tag) VALUES
(1, 1),   -- Abeille - ID: 1 -> Tag: Halloween / Sorcière, Magique / Féerique
(1, 2),
(2, 2),   -- Alien - ID: 2 -> Tag: Magique / Féerique, Science-fiction / Futuriste
(2, 10),
(3, 23),   -- Ananas - ID: 3 -> Tag: Tropical / Fruit, Gastronomie / Cuisine
(3, 21),
(4, 27),   -- Années 70 - ID: 4 -> Tag: Rétro / Vintage, Festif
(4, 18),
(5, 10),   -- Astronaute - ID: 5 -> Tag: Science-fiction / Futuriste, Aventure / Héros
(5, 5),
(6, 23),   -- Banane - ID: 6 -> Tag: Tropical / Fruit, Gastronomie / Cuisine
(6, 21),
(7, 21),   -- Bière - ID: 7 -> Tag: Gastronomie / Cuisine, Festif
(7, 18),
(8, 14),   -- Bonne soeur - ID: 8 -> Tag: Historique / Antique, Élégance
(8, 19),
(9, 7),   -- Cactus - ID: 9 -> Tag: Nature / Jardin / Fleur, Sauvage / Animal
(9, 13),
(10, 3), -- Chevalier - ID: 10 -> Tag: Chevalier / Héroïque, Fantasy / Médiéval
(10, 6),
(11, 11), -- Chucky - ID: 11 -> Tag: Comique / Humour, Créature / Monstre
(11, 4),
(12, 11), -- Clown - ID: 12 -> Tag: Comique / Humour, Aventure / Héros
(12, 5),
(13, 13), -- Coquelicot - ID: 13 -> Tag: Nature / Jardin / Fleur, Plante / Nature
(13, 7),
(14, 9), -- Cowboy - ID: 14 -> Tag: Far West / Cowboy, Aventure / Héros
(14, 24),
(15, 21), -- Cuisinier - ID: 15 -> Tag: Gastronomie / Cuisine, Comique / Humour
(15, 11),
(16, 4), -- Dinosaure - ID: 16 -> Tag: Créature / Monstre, Aventure / Héros
(16, 5),
(17, 1), -- Dracula - ID: 17 -> Tag: Halloween / Sorcière, Mystique
(17, 16),
(18, 6), -- Dragon - ID: 18 -> Tag: Fantasy / Médiéval, Créature / Monstre
(18, 4),
(19, 25), -- Écolière japonaise - ID: 19 -> Tag: Japon / Traditionnel, Espiègle / Joyeux
(19, 15),
(20, 2), -- Fée - ID: 20 -> Tag: Magique / Féerique, Mystique
(20, 16),
(21, 14), -- Gladiateur - ID: 21 -> Tag: Historique / Antique, Majesté
(21, 20),
(22, 19), -- Hôtesse de l'air - ID: 22 -> Tag: Élégance, Mode
(22, 26),
(23, 12), -- Infirmière - ID: 23 -> Tag: Militaire / Camouflage, Élégance
(23, 19),
(24, 10), -- Jedi - ID: 24 -> Tag: Science-fiction / Futuriste, Aventure / Héros
(24, 5),
(25, 11), -- Chanteur Jul - ID: 25 -> Tag: Comique / Humour
(26, 6), -- Licorne - ID: 26 -> Tag: Fantasy / Médiéval, Magique / Féerique
(26, 2),
(27, 3), -- Link - ID: 27 -> Tag: Fantasy / Médiéval, Chevalier / Héroïque
(27, 6),
(28, 22), -- Lion - ID: 28 -> Tag: Sauvage / Animal, Mystique
(28, 16),
(29, 17), -- Lutin de Noël - ID: 29 -> Tag: Noël, Festif
(29, 18),
(30, 1), -- Mercredi Addams - ID: 30 -> Tag: Halloween / Sorcière, Espiègle / Joyeux
(30, 27),
(31, 27), -- Nain de jardin - ID: 31 -> Tag: Rétro / Vintage, Nature / Jardin / Fleur
(31, 7),
(32, 25), -- Ninja - ID: 32 -> Tag: Japon / Traditionnel, Guerrier
(32, 8),
(33, 21), -- Oeuf - ID: 33 -> Tag: Gastronomie / Cuisine, Festif
(33, 11),
(34, 22), -- Pieuvre - ID: 34 -> Tag: Sauvage / Animal, Mystique
(34, 16),
(35, 27), -- Pinup - ID: 35 -> Tag: Glamour / Mode, Rétro / Vintage
(35, 26),
(36, 5), -- Pirate - ID: 36 -> Tag: Aventure / Héros, Western / Aventure
(36, 24),
(37, 12), -- Policier - ID: 37 -> Tag: Militaire / Camouflage, Aventure / Héros
(37, 5),
(38, 12), -- Pompier - ID: 38 -> Tag: Militaire / Camouflage, Comique / Humour
(38, 5),
(39, 5), -- Poulet rôti - ID: 39 -> Tag: Gastronomie / Cuisine, Festif
(39, 21),
(40, 19), -- Princesse - ID: 40 -> Tag: Élégance, Fantasy / Médiéval
(40, 6),
(41, 14), -- Prisonnier - ID: 41 -> Tag: Historique / Antique, Militaire / Camouflage
(41, 12),
(42, 25), -- Samouraï - ID: 42 -> Tag: Japon / Traditionnel, Guerrier
(42, 8),
(43, 12), -- Soldat militaire - ID: 43 -> Tag: Militaire / Camouflage, Majesté
(43, 5),
(44, 1), -- Sorcière - ID: 44 -> Tag: Halloween / Sorcière, Magique / Féerique
(44, 2),
(45, 11), -- Spiderman - ID: 45 -> Tag: Comique / Humour, Héroïque
(45, 5),
(46, 21), -- Sushi - ID: 46 -> Tag: Gastronomie / Cuisine, Japon / Traditionnel
(46, 25),
(47, 8), -- Viking - ID: 47 -> Tag: Viking / Guerrier, Fantasy / Médiéval
(47, 6),
(48, 10), -- Xénomorphe - ID: 48 -> Tag: Science-fiction / Futuriste, Créature / Monstre
(48, 4),
(49, 2), -- Baguette de Fée - ID: 49 -> Tag: Magique / Féerique, Élégance
(49, 19),
(49, 16),
(50, 3), -- Casque de Chevalier - ID: 50 -> Tag: Chevalier / Héroïque, Fantasy / Médiéval
(50, 6),
(51, 5), -- Casque Militaire - ID: 51 -> Tag: Militaire / Camouflage, Héroïque
(51, 12),
(52, 8), -- Casque de Viking - ID: 52 -> Tag: Viking / Guerrier, Fantasy / Médiéval
(52, 6),
(53, 27), -- Champignon de Nain - ID: 53 -> Tag: Rétro / Vintage, Nature / Jardin / Fleur
(53, 7),
(54, 13), -- Chapeau coquelicot - ID: 54 -> Tag: Nature / Jardin / Fleur, Plante / Nature
(54, 7),
(55, 9), -- Chapeau de Cowboy - ID: 55 -> Tag: Far West / Cowboy, Aventure / Héros
(55, 24),
(56, 21), -- Chapeau de Cuisinier - ID: 56 -> Tag: Gastronomie / Cuisine, Comique / Humour
(56, 11),
(57, 2), -- Chapeau de Fée - ID: 57 -> Tag: Magique / Féerique, Mystique
(57, 16),
(58, 19), -- Chapeau d'hotesse de l'air - ID: 58 -> Tag: Élégance, Mode
(58, 26),
(59, 19), -- Chapeau d'Infirmière - ID: 59 -> Tag: Militaire / Camouflage, Élégance
(59, 12),
(60, 3), -- Chapeau de Link - ID: 60 -> Tag: Fantasy / Médiéval, Chevalier / Héroïque
(60, 6),
(61, 17), -- Chapeau de Lutin - ID: 61 -> Tag: Noël, Espiègle / Joyeux
(61, 18),
(62, 27), -- Chapeau de Nain - ID: 62 -> Tag: Rétro / Vintage, Nature / Jardin / Fleur
(62, 7),
(63, 11), -- Chapeau et nez de Clown - ID: 63 -> Tag: Comique / Humour, Aventure / Héros
(63, 5),
(64, 7), -- Chapeau de pailles - ID: 64 -> Tag: Nature / Jardin / Fleur, Festif
(64, 18),
(65, 27), -- Chapeau de Pinup - ID: 65 -> Tag: Glamour / Mode, Rétro / Vintage
(65, 26),
(66, 5), -- Chapeau de Pirate - ID: 66 -> Tag: Aventure / Héros, Western / Aventure
(66, 24),
(67, 5), -- Chapeau de Policier - ID: 67 -> Tag: Militaire / Camouflage, Héroïque
(67, 12),
(68, 12), -- Chapeau de Pompier - ID: 68 -> Tag: Militaire / Camouflage, Comique / Humour
(68, 5),
(69, 25), -- Chapeau de Samouraï - ID: 69 -> Tag: Japon / Traditionnel, Guerrier
(69, 8),
(70, 1), -- Chapeau de Sorcière - ID: 70 -> Tag: Halloween / Sorcière, Magique / Féerique
(70, 2),
(71, 7), -- Chaussures Pots de fleurs - ID: 71 -> Tag: Nature / Jardin / Fleur, Plante / Nature
(71, 13),
(72, 21), -- Couteau de Cuisine - ID: 72 -> Tag: Gastronomie / Cuisine, Comique / Humour
(72, 11),
(73, 21), -- Cuillère de Cuisinier - ID: 73 -> Tag: Gastronomie / Cuisine, Comique / Humour
(73, 11),
(74, 3), -- Epee de Link - ID: 74 -> Tag: Fantasy / Médiéval, Chevalier / Héroïque
(74, 6),
(75, 5), -- Fusil de Militaire - ID: 75 -> Tag: Militaire / Camouflage, Aventure / Héros
(75, 12);

INSERT INTO comment (rating_comment, comment, date_comment, admin_reply, id_product, id_user)
VALUES 
(5, 'Très bon produit, je recommande !', '2025-04-15', NULL, 20, 1),

(4, 'Livraison rapide, mais l’emballage était abîmé.', '2025-04-18', 'Merci pour votre retour, nous allons améliorer ce point.', 20, 3),

(3, 'Le produit ne correspond pas tout à fait à la description.', '2025-04-20', NULL, 20, 4),

(5, 'Excellente qualité, rien à redire.', '2025-04-22', NULL, 20, 5),

(2, 'Produit défectueux à la réception.', '2025-04-25', 'Nous sommes désolés pour cela. Veuillez contacter notre service client.', 20, 2);
