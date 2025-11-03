# Clippd-service
This one will eventually hold your data service application.

## Database schema
**User (ID, firstName, lastName, loginID, passWord, role, nickname, address, city, state, emailAddress, phone, bio, profileImage, createdAt)\
Languages (UserID, language)\
Client (ID, UserID)\
FavoriteClippers (ClientID, ClipperID, favoritedAt)\
Clipper (ID, UserID,)\
Portfolio (ID, ClipperID, shopName, shopAddress, city, state, decription)\
Pictures (ID, PortfolioID, image, addedAt)\
Service (ID, ClipperID, serviceName, price)\
Review (ID, ClientID, ClipperID, rating, comment, createdAt)**