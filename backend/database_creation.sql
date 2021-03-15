CREATE TABLE User (
  userId int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE KEY,
  password binary(64) NOT NULL,
  isAdmin boolean NOT NULL DEFAULT 0,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  modifiedAt datetime NOT NULL
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE Post (
    postId int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId int(10) unsigned NOT NULL,
    content varchar(255) NOT NULL,
    imageUrl varchar(255) NOT NULL,
    createdAt datetime NOT NULL,
    modifiedAt datetime NOT NULL,
    active boolean DEFAULT 1,
    CONSTRAINT posts_ibfk_1 FOREIGN KEY (userId) REFERENCES User (userId)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE Comment (
    commentId int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId int(10) unsigned NOT NULL,
    userId int(10) unsigned NOT NULL,
    content varchar(255) NOT NULL,
    createdAt datetime NOT NULL,
    modifiedAt datetime NOT NULL,
    active boolean DEFAULT 1,
    CONSTRAINT comment_ibfk_1 FOREIGN KEY (userId) REFERENCES User (userId), 
    CONSTRAINT comment_ibfk_2 FOREIGN KEY (postId) REFERENCES Post (postId)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;