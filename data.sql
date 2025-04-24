-- EFFACEMENT DES TABLES
DROP TABLE IF EXISTS product_orders;
DROP TABLE IF EXISTS product_subcategory;
DROP TABLE IF EXISTS product_category;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS user;

-- Création de la table USER
CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    postal_code INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Création de la table produit
CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name_product VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    stock INT NOT NULL,
    price_ht DECIMAL(10,2) NOT NULL,
    price_ttc DECIMAL(10,2) NOT NULL,
    price_discount DECIMAL(10,2) NOT NULL,
    image_link VARCHAR(100)
) ENGINE=InnoDB;

-- Création de la table catégorie
CREATE TABLE category (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    name_category VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Création de la table sous-catégorie
CREATE TABLE sub_category (
    id_subcategory INT AUTO_INCREMENT PRIMARY KEY,
    name_subcategory VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Création de la table commande
CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    num_order INT NOT NULL UNIQUE,
    date_order DATE,
    status VARCHAR(100) NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Création de la table commentaire
CREATE TABLE comment (
    id_comment INT AUTO_INCREMENT PRIMARY KEY,
    rating INT,
    comment VARCHAR(2000) NOT NULL,
    admin_reply VARCHAR(2000),
    id_product INT,
    id_user INT,
    FOREIGN KEY (id_product) REFERENCES product(id_product) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON UPDATE CASCADE
) ENGINE=InnoDB;


-- TABLE DE LIAISON --

-- Création de la table produit - catégorie
CREATE TABLE product_category (
    id_product INT,
    id_category INT, 
    PRIMARY KEY (id_product, id_category),
    FOREIGN KEY (id_product) REFERENCES product(id_product),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
) ENGINE=InnoDB;
-- Création de la table produit - sous-catégorie
CREATE TABLE product_subcategory (
    id_product INT,
    id_subcategory INT, 
    PRIMARY KEY (id_product, id_subcategory),
    FOREIGN KEY (id_product) REFERENCES product(id_product),
    FOREIGN KEY (id_subcategory) REFERENCES sub_category(id_subcategory)
) ENGINE=InnoDB;
-- Création de la table produit - commande
CREATE TABLE product_orders (
    id_product_orders INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT,
    id_order INT,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id_product),
    FOREIGN KEY (id_order) REFERENCES orders(id_order)
) ENGINE=InnoDB;

