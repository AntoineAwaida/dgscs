#!/bin/bash

git pull

#ng build --prod
ng build


#On supprime le contenu final

sudo rm -r /var/www/html/*;

#On déplacer ce qu'il y a dans la source
sudo mv dist/dgscs/* /var/www/html