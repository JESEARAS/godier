with open('memoire/memoire.html', 'r') as f:
    content = f.read()

# Expand Chapter IX strategy section
old_strat = '<p class="no-indent">La validation a \u00e9t\u00e9 r\u00e9alis\u00e9e par des tests fonctionnels syst\u00e9matiques couvrant tous les modules : tests de cr\u00e9ation (validation des champs obligatoires, auto-incr\u00e9mentation des ID), tests de lecture (affichage, recherche, filtres, pagination), tests de mise \u00e0 jour (modification et persistance), tests de suppression (confirmation et effacement), tests d\'export (PDF, CSV, impression), tests de navigation (routage, mode sombre, responsive) et tests de sauvegarde (export/import JSON, r\u00e9initialisation).</p>'
new_strat = """<p class="no-indent">La validation de l'application a \u00e9t\u00e9 r\u00e9alis\u00e9e par une s\u00e9rie de tests fonctionnels syst\u00e9matiques, couvrant l'ensemble des modules et des fonctionnalit\u00e9s de l'application. Chaque test visait \u00e0 v\u00e9rifier qu'un cas d'utilisation sp\u00e9cifique fonctionnait conform\u00e9ment aux attentes d\u00e9finies dans l'\u00e9tude des besoins.</p>
    <p>La strat\u00e9gie de test a couvert plusieurs cat\u00e9gories :</p>
    <ul>
      <li><strong>Tests de cr\u00e9ation (Create)</strong> : v\u00e9rification de l'ajout d'enregistrements dans chaque module, avec validation des champs obligatoires et g\u00e9n\u00e9ration correcte des identifiants auto-incr\u00e9ment\u00e9s. Chaque test a confirm\u00e9 que le premier enregistrement re\u00e7oit l'identifiant 1 et que les enregistrements suivants re\u00e7oivent des identifiants s\u00e9quentiels.</li>
      <li><strong>Tests de lecture (Read)</strong> : v\u00e9rification de l'affichage des listes, de la recherche instantan\u00e9e (filtrage en temps r\u00e9el selon les champs d\u00e9finis dans searchFields), des filtres d\u00e9roulants et de la pagination (navigation entre pages quand le nombre d'enregistrements d\u00e9passe la taille de page).</li>
      <li><strong>Tests de mise \u00e0 jour (Update)</strong> : v\u00e9rification de la modification des enregistrements, de la persistance des modifications dans le localStorage et de la mise \u00e0 jour de l'affichage apr\u00e8s modification.</li>
      <li><strong>Tests de suppression (Delete)</strong> : v\u00e9rification de la confirmation avant suppression (bo\u00eete de dialogue) et de l'effacement effectif des enregistrements. V\u00e9rification \u00e9galement que la suppression ne r\u00e9initialise pas le compteur d'auto-incr\u00e9mentation (le prochain enregistrement garde l'ID suivant).</li>
      <li><strong>Tests d'export</strong> : v\u00e9rification de la g\u00e9n\u00e9ration des fichiers PDF (contenu, format, t\u00e9l\u00e9chargement) et CSV (en-t\u00eates, donn\u00e9es, s\u00e9parateur virgule) et du bon fonctionnement de l'impression (ouverture de la bo\u00eete de dialogue d'impression du navigateur).</li>
      <li><strong>Tests de navigation</strong> : v\u00e9rification du routage entre les pages (toutes les routes accessibles), du mode sombre (basculement et persistance du choix) et du responsive design (adaptation aux diff\u00e9rentes tailles d'\u00e9cran).</li>
      <li><strong>Tests de sauvegarde</strong> : v\u00e9rification de l'export de sauvegarde JSON (toutes les collections s\u00e9rialis\u00e9es), de l'import de restauration (donn\u00e9es restaur\u00e9es correctement) et de la r\u00e9initialisation (effacement complet et remise des compteurs \u00e0 z\u00e9ro).</li>
    </ul>
    <p>Chaque test a \u00e9t\u00e9 ex\u00e9cut\u00e9 manuellement, en suivant un protocole pr\u00e9cis : pr\u00e9paration de l'environnement (base de donn\u00e9es r\u00e9initialis\u00e9e), ex\u00e9cution de l'action, observation du r\u00e9sultat et comparaison avec le r\u00e9sultat attendu. Les r\u00e9sultats ont \u00e9t\u00e9 consign\u00e9s dans le tableau de cas de tests (Tableau 7) et tous les tests ont pass\u00e9 avec succ\u00e8s (statut OK).</p>"""
content = content.replace(old_strat, new_strat)

# Add more screenshots to annexes
old_annex_end = '<p style="text-align:center; margin-top:3cm; font-weight:bold;">\u2014 Fin du m\u00e9moire \u2014</p>'
new_annex_end = """<figure><img src="figures/fig_nurses.png" alt="Infirmiers"><figcaption>Module de gestion des infirmiers</figcaption></figure>
    <figure><img src="figures/fig_rooms.png" alt="Chambres"><figcaption>Module de gestion des chambres</figcaption></figure>
    <figure><img src="figures/fig_beds.png" alt="Lits"><figcaption>Module de gestion des lits</figcaption></figure>
    <figure><img src="figures/fig_analyses.png" alt="Analyses"><figcaption>Module de gestion des analyses</figcaption></figure>
    <figure><img src="figures/fig_results.png" alt="R\u00e9sultats"><figcaption>Module de gestion des r\u00e9sultats</figcaption></figure>
    <figure><img src="figures/fig_suppliers.png" alt="Fournisseurs"><figcaption>Module de gestion des fournisseurs</figcaption></figure>
    <figure><img src="figures/fig_stock.png" alt="Stock"><figcaption>Module de gestion du stock</figcaption></figure>
    <figure><img src="figures/fig_payments.png" alt="Paiements"><figcaption>Module de gestion des paiements</figcaption></figure>
    <figure><img src="figures/fig_insurance.png" alt="Assurances"><figcaption>Module de gestion des assurances</figcaption></figure>
    <figure><img src="figures/fig_ambulances.png" alt="Ambulances"><figcaption>Module de gestion des ambulances</figcaption></figure>
    <figure><img src="figures/fig_roles.png" alt="R\u00f4les"><figcaption>Module de gestion des r\u00f4les</figcaption></figure>
    <figure><img src="figures/fig_activity.png" alt="Journal des activit\u00e9s"><figcaption>Module du journal des activit\u00e9s</figcaption></figure>
    <p style="text-align:center; margin-top:3cm; font-weight:bold;">\u2014 Fin du m\u00e9moire \u2014</p>"""
content = content.replace(old_annex_end, new_annex_end)

# Expand Chapter III - add more detail to actors section
old_actors_after = '</table>\n\n    <h2>3.2 Besoins fonctionnels</h2>'
new_actors_after = """</table>
    <p>Chaque acteur interagit avec le syst\u00e8me selon son r\u00f4le et ses responsabilit\u00e9s. L'administrateur est l'acteur le plus privil\u00e9gi\u00e9 : il a acc\u00e8s \u00e0 tous les modules, y compris la gestion des utilisateurs, des r\u00f4les et des param\u00e8tres du syst\u00e8me. Le m\u00e9decin est l'acteur principal du processus de soins : il consulte les patients, pose des diagnostics, \u00e9tablit des ordonnances et g\u00e8re les hospitalisations. Le r\u00e9ceptionniste est le premier point de contact du patient avec le syst\u00e8me : il enregistre les patients et g\u00e8re les rendez-vous. Le pharmacien g\u00e8re le circuit du m\u00e9dicament, de l'approvisionnement \u00e0 la dispensation. Le technicien de laboratoire r\u00e9alise les analyses et communique les r\u00e9sultats. Le comptable g\u00e8re les aspects financiers : facturation, paiements et relations avec les assurances.</p>
    <p>Cette r\u00e9partition des r\u00f4les et des permissions impl\u00e9mente le principe du moindre privil\u00e8ge : chaque utilisateur n'a acc\u00e8s qu'aux modules et aux actions n\u00e9cessaires \u00e0 sa fonction, r\u00e9duisant les risques d'erreurs et de compromission de donn\u00e9es.</p>

    <h2>3.2 Besoins fonctionnels</h2>"""
content = content.replace(old_actors_after, new_actors_after)

# Expand Chapter III - add more detail to besoins fonctionnels
old_bf_after = '</table>\n\n    <h2>3.3 Besoins non fonctionnels</h2>'
new_bf_after = """</table>
    <p>Ces vingt-deux besoins fonctionnels couvrent l'ensemble du p\u00e9rim\u00e8tre fonctionnel de la clinique, depuis l'enregistrement d'un patient jusqu'\u00e0 la facturation et la gestion des urgences. Chaque besoin correspond \u00e0 un module de l'application, et chaque module impl\u00e9mente les quatre op\u00e9rations CRUD (Cr\u00e9er, Lire, Modifier, Supprimer) ainsi que des fonctionnalit\u00e9s sp\u00e9cifiques (recherche, filtres, exports, alertes). La priorit\u00e9 de chaque besoin a \u00e9t\u00e9 d\u00e9finie en concertation avec la direction de la clinique : les besoins de priorit\u00e9 \u00ab haute \u00bb sont ceux qui sont essentiels au fonctionnement de la clinique (patients, rendez-vous, consultations, facturation), tandis que les besoins de priorit\u00e9 \u00ab moyenne \u00bb ou \u00ab basse \u00bb concernent des modules compl\u00e9mentaires mais utiles.</p>

    <h2>3.3 Besoins non fonctionnels</h2>"""
content = content.replace(old_bf_after, new_bf_after)

with open('memoire/memoire.html', 'w') as f:
    f.write(content)

print(f'File updated. New size: {len(content)} bytes')
