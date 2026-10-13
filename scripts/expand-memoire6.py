with open('memoire/memoire.html', 'r') as f:
    content = f.read()

# Add more content to Chapter I - motivation section
old_motiv_end = '<p>L\'objectif est donc de remplacer les proc\u00e9d\u00e9s manuels par une application web centralis\u00e9e, accessible depuis n\'importe quel poste informatique de la clinique, \u00e9volutive et capable de s\'adapter aux besoins futurs de l\'\u00e9tablissement.</p>\n  </div>\n\n  <!-- CHAPITRE II -->'
new_motiv_end = """<p>L'objectif est donc de remplacer les proc\u00e9d\u00e9s manuels par une application web centralis\u00e9e, accessible depuis n'importe quel poste informatique de la clinique, \u00e9volutive et capable de s'adapter aux besoins futurs de l'\u00e9tablissement.</p>
    <p>Il convient \u00e9galement de mentionner que ce projet s'inscrit dans un cadre acad\u00e9mique : il constitue un m\u00e9moire de fin d'\u00e9tudes en vue de l'obtention du dipl\u00f4me de Licence Professionnelle Informatique \u00e0 l'Universit\u00e9 d'Antsiranana. \u00c0 ce titre, il doit non seulement r\u00e9pondre \u00e0 un besoin r\u00e9el identifi\u00e9 aupr\u00e8s de la Clinique GODIE, mais \u00e9galement d\u00e9montrer la ma\u00eetrise des comp\u00e9tences acquises durant le cursus universitaire : analyse de besoins, conception de syst\u00e8mes, mod\u00e9lisation UML, programmation web, gestion de base de donn\u00e9es, et r\u00e9daction de documentation technique. Le projet doit \u00e9galement \u00eatre pr\u00e9sent\u00e9 et d\u00e9fendu devant un jury universitaire, ce qui impose un niveau de qualit\u00e9 et de finition professionnel.</p>
  </div>

  <!-- CHAPITRE II -->"""
content = content.replace(old_motiv_end, new_motiv_end)

# Add more to Chapter V - after jsPDF paragraph
old_jspdf_end = '<p>jsPDF est utilis\u00e9 pour la g\u00e9n\u00e9ration de documents PDF c\u00f4t\u00e9 client, sans d\u00e9pendance serveur. Cette biblioth\u00e8que permet de cr\u00e9er des documents PDF personnalis\u00e9s avec du texte, des tableaux et des images, directement dans le navigateur. Elle est utilis\u00e9e pour l\'export des ordonnances, des factures et des rapports.</p>'
new_jspdf_end = """<p>jsPDF est utilis\u00e9 pour la g\u00e9n\u00e9ration de documents PDF c\u00f4t\u00e9 client, sans d\u00e9pendance serveur. Cette biblioth\u00e8que permet de cr\u00e9er des documents PDF personnalis\u00e9s avec du texte, des tableaux et des images, directement dans le navigateur. Elle est utilis\u00e9e pour l'export des ordonnances, des factures et des rapports.</p>
    <p>La biblioth\u00e8que lucide-react a \u00e9t\u00e9 choisie pour les ic\u00f4nes de l'application. Elle offre une collection de plus de 1000 ic\u00f4nes modernes, coh\u00e9rentes et l\u00e9g\u00e8res, avec un style unifi\u00e9 (trait fin, design minimaliste). Son int\u00e9gration avec React est native, et le tree-shaking \u00e9limine automatiquement les ic\u00f4nes non utilis\u00e9es du bundle final, r\u00e9duisant la taille de l'application. Chaque module de l'application est associ\u00e9 \u00e0 une ic\u00f4ne sp\u00e9cifique (par exemple, l'ic\u00f4ne d'h\u00f4pital pour les patients, l'ic\u00f4ne de st\u00e9thoscope pour les consultations, l'ic\u00f4ne de pilule pour les m\u00e9dicaments), facilitant la reconnaissance visuelle des modules dans la navigation.</p>
    <p>Enfin, react-router-dom 7 est utilis\u00e9 pour le routage de l'application. Il permet la navigation entre les pages de l'application c\u00f4t\u00e9 client (Single Page Application), avec des routes param\u00e9tr\u00e9es (par exemple, /m/godie_patients pour acc\u00e9der au module patients), une navigation programmatique (redirection apr\u00e8s une action) et la gestion du scroll (restauration de la position de scroll lors de la navigation). Le routage est configur\u00e9 dans le composant App.tsx, qui d\u00e9finit l'ensemble des routes de l'application.</p>"""
content = content.replace(old_jspdf_end, new_jspdf_end)

with open('memoire/memoire.html', 'w') as f:
    f.write(content)

print(f'File updated. New size: {len(content)} bytes')
