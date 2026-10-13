with open('memoire/memoire.html', 'r') as f:
    content = f.read()

# Add a paragraph to Chapter IX after the test table
old_after_tests = '<h2>9.3 Matrice de tra\u00e7abilit\u00e9</h2>'
new_after_tests = """<p>L'ensemble des vingt-six cas de tests a \u00e9t\u00e9 ex\u00e9cut\u00e9 avec succ\u00e8s. Aucun \u00e9chec n'a \u00e9t\u00e9 constat\u00e9, ce qui d\u00e9montre la robustesse de l'application et la conformit\u00e9 de l'impl\u00e9mentation avec les besoins d\u00e9finis. Les tests ont \u00e9galement permis de v\u00e9rifier le comportement de l'application dans des conditions d\u00e9favorables : saisie de donn\u00e9es invalides, tentative de suppression sans confirmation, recherche sans r\u00e9sultat, export avec une base vide. Dans tous les cas, l'application a r\u00e9agi de mani\u00e8re appropri\u00e9e, en affichant des messages d'erreur clairs ou des \u00e9tats vides informatifs.</p>

    <h2>9.3 Matrice de tra\u00e7abilit\u00e9</h2>"""
content = content.replace(old_after_tests, new_after_tests)

# Add a paragraph after the traceability table
old_after_trace = '</table>\n  </div>\n\n  <!-- CHAPITRE X -->'
new_after_trace = """</table>
    <p>Tous les besoins fonctionnels et non fonctionnels identifi\u00e9s dans l'\u00e9tude des besoins ont \u00e9t\u00e9 couverts par l'application et valid\u00e9s par les tests. Aucun besoin n'a \u00e9t\u00e9 laiss\u00e9 sans r\u00e9ponse, ce qui d\u00e9montre l'exhaustivit\u00e9 de la r\u00e9alisation. La matrice de tra\u00e7abilit\u00e9 constitue un document de r\u00e9f\u00e9rence pour la soutenance, permettant au jury de v\u00e9rifier que chaque exigence a \u00e9t\u00e9 prise en compte dans l'application et valid\u00e9e par un test fonctionnel.</p>
  </div>

  <!-- CHAPITRE X -->"""
content = content.replace(old_after_trace, new_after_trace)

with open('memoire/memoire.html', 'w') as f:
    f.write(content)

print(f'File updated. New size: {len(content)} bytes')
