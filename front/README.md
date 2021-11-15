# Kanap #

![KANAP](front/images/logo.png) 

# Identité

- KANAP ! Est une marque de canapés.

- La marque vend uniquement ses produits depuis sa boutique physique exclusivement.

- Aujourd'hui, KANAP souhaiterait avoir une plateforme de e-commerce en plus de sa
boutique physique pour vendre ses produits sur internet.


# Contraintes

- Développement en pur JavaScript
- Aucun framework ( react, angular, Vue ou jQuery par exemple )

# Livrables

 L’application web sera composée de 4 pages :

1. **Une page d’accueil** montrant (de manière dynamique) tous les articles disponibles à la vente.
2. **Une page “produit”** qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier. 
3. **Une page “panier”.** Celle-ci contient plusieurs parties : 
     1. Un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
     2. Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de chiffre dans un champ prénom.

4. **Une page “confirmation”** : 
    1. Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

  
  
### Projet ###

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You
can then run the server with `node server`.
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

