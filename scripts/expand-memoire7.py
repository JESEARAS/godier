with open('memoire/memoire.html', 'r') as f:
    content = f.read()

# Add content to Chapter VI - after config-driven section
old_config_end = "<p>Le composant <code>CrudPage</code> consomme cette configuration et g\u00e9n\u00e8re automatiquement : un en-t\u00eate de page avec bouton d'ajout, une barre d'outils (recherche, filtres, exports), un tableau pagin\u00e9 avec badges et r\u00e9f\u00e9rences r\u00e9solues, des modales d'ajout/\u00e9dition avec validation, une modale de d\u00e9tail, une confirmation de suppression, et des exports PDF, Excel (CSV) et impression. Cette approche permet d'ajouter un nouveau module en quelques lignes de configuration, sans \u00e9crire la moindre ligne de code suppl\u00e9mentaire.</p>\n  </div>"
new_config_end = """<p>Le composant <code>CrudPage</code> consomme cette configuration et g\u00e9n\u00e8re automatiquement : un en-t\u00eate de page avec bouton d'ajout, une barre d'outils (recherche, filtres, exports), un tableau pagin\u00e9 avec badges et r\u00e9f\u00e9rences r\u00e9solues, des modales d'ajout/\u00e9dition avec validation, une modale de d\u00e9tail, une confirmation de suppression, et des exports PDF, Excel (CSV) et impression. Cette approche permet d'ajouter un nouveau module en quelques lignes de configuration, sans \u00e9crire la moindre ligne de code suppl\u00e9mentaire.</p>
    <p>Pour illustrer concr\u00e8tement l'\u00e9conomie de code r\u00e9alis\u00e9e, consid\u00e9rons l'ajout d'un nouveau module, par exemple la gestion des \u00ab ambulances \u00bb. Sans le pattern config-driven, il aurait fallu cr\u00e9er une page d\u00e9di\u00e9e avec un tableau, un formulaire d'ajout, un formulaire d'\u00e9dition, une modale de d\u00e9tail, une confirmation de suppression, une barre de recherche, des filtres, des boutons d'export et la logique de persistance — soit potentiellement des centaines de lignes de code. Avec le pattern config-driven, il suffit d'ajouter une entr\u00e9e dans le registre RESOURCES d\u00e9finissant les champs, les colonnes, les filtres et les options de recherche du module, soit environ quinze lignes de configuration d\u00e9clarative. Le composant CrudPage se charge du reste. Cette \u00e9conomie se multiplie par le nombre de modules : pour trente modules, l'\u00e9conomie totale est consid\u00e9rable, tant en temps de d\u00e9veloppement qu'en lignes de code \u00e0 maintenir.</p>
  </div>"""
content = content.replace(old_config_end, new_config_end)

with open('memoire/memoire.html', 'w') as f:
    f.write(content)

print(f'File updated. New size: {len(content)} bytes')
