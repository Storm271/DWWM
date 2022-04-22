

J'ai essayé au maximum de compartimenté mon CSS dans les pages appropriées et en essayant de regrouper 
les classes lors de mes déclarations.

J'ai utilisé un container pour faire entrer ma vidéo dans mon <header> puis j'ai appliqué effet dessus via
un overlay afin de faire ressortir mon texte. 

J'ai également ajouté une animation à ce texte qui comprend mon <h1> et un sous titre via un "@keyframes slideIn"

Pour mon tableau j'ai choisi un design sobre qui, je trouve, s'accordait plutôt bien avec le thème et les couleurs
de ma page. 

J'ai utilisé des ancres dans un de mes textes reliés à des <id> un peu plus bas de ma page pour emmener 
l'utilisateur à un contenu précis s'il le souhaitait. 

Dans l'ensemble je me suis servi de "Cards" avec Bootstrap afin de réaliser des présentations dans mon contenu 
HTML. C'était ce qui me semblait le plus adéquat avec le format de présentation que je voulais pour mon site.

Pour mon <footer> j'ai décidé d'utiliser la propriété "position:fixed" pour qu'il soit toujours visible et
accessible peu importe où l'on se trouve sur la page.

Pour ma mise en page je n'ai pas utilisé de Grid. J'ai préféré opter pour le Flex que je trouve plus pratique
et qui m'apporte plus de libertés. C'est un choix totalement subjectif.

Pour mon resopnsive j'ai utilisé des Media Queries afin de définir des actions précises dans ma mise en page 
afin que mon site soit au maximum responsive. 

Cette fois, contrairement à mon projet My Yuka où j'avais défini mon responsive afin qu'il ne s'adapte 
qu'à 3 formats bien précis, j'ai essayé de faire en sorte que mon site soit responsive sur tous les 
formats jusqu'à 300 pixels de large. Je n'ai pas fait moins car après avoir fait quelques recherches 
je me suis aperçu qu'il n'existait aujourd'hui que très peu de supports représentant une surface Wide 
de moins de 300 pixels.

Le défi de cette responsivité aujourd'hui était de réussir à rendre mon tableau responsive. Chose que je 
n'avais jamais fait jusque là. J'ai donc fait le choix d'implémenter une scrollbar qui me semblait être la 
solution la plus adaptée à mon problème.