#!/usr/bin/env python3
"""Update memoire.html with new sections, figures, and expanded content."""
import re

with open('memoire/memoire.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add new figures to LISTE DES FIGURES (after Figure 21)
new_figures_toc = """    <div class="toc-entry"><span>Figure 22 — Capture d'écran : Listes globales</span><span class="toc-dots"></span><span>85</span></div>
    <div class="toc-entry"><span>Figure 23 — Capture d'écran : Module Morgue</span><span class="toc-dots"></span><span>86</span></div>
    <div class="toc-entry"><span>Figure 24 — Capture d'écran : Suivi des patients</span><span class="toc-dots"></span><span>87</span></div>
    <div class="toc-entry"><span>Figure 25 — Capture d'écran : Prix des services</span><span class="toc-dots"></span><span>88</span></div>
</div>

<!-- SOMMAIRE -->
<div class="page-break chapter">
  <h1>SOMMAIRE</h1>
  <div class="toc-entry"><span><strong>Introduction générale</strong></span><span class="toc-dots"></span><span>9</span></div>
  <div class="toc-entry"><span><strong>Chapitre I — Présentation de la Clinique GODIE</strong></span><span class="toc-dots"></span><span>13</span></div>
  <div class="toc-entry"><span><strong>Chapitre II — Analyse de l'existant</strong></span><span class="toc-dots"></span><span>17</span></div>
  <div class="toc-entry"><span><strong>Chapitre III — Étude des besoins</strong></span><span class="toc-dots"></span><span>21</span></div>
  <div class="toc-entry"><span><strong>Chapitre IV — Conception UML</strong></span><span class="toc-dots"></span><span>27</span></div>
  <div class="toc-entry"><span><strong>Chapitre V — Choix technologiques</strong></span><span class="toc-dots"></span><span>38</span></div>
  <div class="toc-entry"><span><strong>Chapitre VI — Architecture de l'application</strong></span><span class="toc-dots"></span><span>43</span></div>
  <div class="toc-entry"><span><strong>Chapitre VII — Réalisation</strong></span><span class="toc-dots"></span><span>47</span></div>
  <div class="toc-entry"><span><strong>Chapitre VIII — Présentation détaillée des modules</strong></span><span class="toc-dots"></span><span>52</span></div>
  <div class="toc-entry sub"><span>8.1 Tableau de bord</span><span class="toc-dots"></span><span>52</span></div>
  <div class="toc-entry sub"><span>8.2 Gestion des patients</span><span class="toc-dots"></span><span>54</span></div>
  <div class="toc-entry sub"><span>8.3 Gestion du personnel</span><span class="toc-dots"></span><span>56</span></div>
  <div class="toc-entry sub"><span>8.4 Rendez-vous et consultations</span><span class="toc-dots"></span><span>58</span></div>
  <div class="toc-entry sub"><span>8.5 Hospitalisation</span><span class="toc-dots"></span><span>60</span></div>
  <div class="toc-entry sub"><span>8.6 Laboratoire</span><span class="toc-dots"></span><span>62</span></div>
  <div class="toc-entry sub"><span>8.7 Pharmacie</span><span class="toc-dots"></span><span>64</span></div>
  <div class="toc-entry sub"><span>8.8 Facturation et tarification</span><span class="toc-dots"></span><span>66</span></div>
  <div class="toc-entry sub"><span>8.9 Urgences et ambulances</span><span class="toc-dots"></span><span>67</span></div>
  <div class="toc-entry sub"><span>8.10 Suivi des patients</span><span class="toc-dots"></span><span>68</span></div>
  <div class="toc-entry sub"><span>8.11 Morgue</span><span class="toc-dots"></span><span>69</span></div>
  <div class="toc-entry sub"><span>8.12 Sécurité et paramètres</span><span class="toc-dots"></span><span>70</span></div>
  <div class="toc-entry sub"><span>8.13 Recherche globale et listes globales</span><span class="toc-dots"></span><span>71</span></div>
  <div class="toc-entry"><span><strong>Chapitre IX — Tests</strong></span><span class="toc-dots"></span><span>73</span></div>
  <div class="toc-entry"><span><strong>Chapitre X — Sécurité</strong></span><span class="toc-dots"></span><span>76</span></div>
  <div class="toc-entry"><span><strong>Chapitre XI — Déploiement</strong></span><span class="toc-dots"></span><span>79</span></div>
  <div class="toc-entry"><span><strong>Conclusion générale</strong></span><span class="toc-dots"></span><span>82</span></div>
  <div class="toc-entry"><span><strong>Bibliographie</strong></span><span class="toc-dots"></span><span>84</span></div>
  <div class="toc-entry"><span><strong>Webographie</strong></span><span class="toc-dots"></span><span>85</span></div>
  <div class="toc-entry"><span><strong>Annexes</strong></span><span class="toc-dots"></span><span>86</span></div>
  <div class="toc-entry"><span><strong>Table des matières</strong></span><span class="toc-dots"></span><span>95</span></div>"""

old_figures_end = """    <div class="toc-entry"><span>Figure 21 — Capture d'écran : Version mobile</span><span class="toc-dots"></span><span>71</span></div>
  </div>"""
html = html.replace(old_figures_end, new_figures_toc)

# 2. Expand the INTRODUCTION with denser content
old_intro = """  <!-- INTRODUCTION GÉNÉRALE -->
  <div class="page-break chapter">
    <h1>INTRODUCTION GÉNÉRALE</h1>

    <h2>Contexte</h2>
    <p class="no-indent">La gestion d'un établissement de santé est une tâche complexe qui mobilise de nombreuses ressources humaines, matérielles et informationnelles. Dans le contexte malgache, et particulièrement dans la ville d'Antsiranana — située dans le Nord de Madagascar — de nombreuses cliniques privées assurent encore leur gestion au moyen de procédés manuels ou de fichiers bureautiques dispersés. Cette situation engendre des pertes de temps considérables, des risques d'erreurs de saisie, des doublons dans les enregistrements et une grande difficulté à produire des rapports fiables en temps réel.</p>
    <p>La transformation numérique des établissements de santé est devenue une nécessité incontournable pour améliorer la qualité des soins, optimiser la gestion administrative et garantir la traçabilité des informations médicales. À Madagascar, cette transformation est encore balbutiante dans le secteur privé, où les outils informatisés restent rares et souvent inadaptés aux besoins locaux.</p>
    <p>La Clinique GODIE, dirigée par Monsieur JESE Andriamaniraka Davida, est un établissement privé situé à Antsiranana qui souhaite s'engager dans cette démarche de modernisation en adoptant une application web centralisée de gestion hospitalière. Cette volonté s'inscrit dans une vision stratégique visant à améliorer l'efficience opérationnelle de la clinique et la qualité du service rendu aux patients.</p>

    <h2>Problématique</h2>
    <p class="no-indent">La Clinique GODIE fait face à plusieurs défis dans sa gestion quotidienne. Les données relatives aux patients, aux rendez-vous, aux consultations, à la pharmacie et à la facturation sont actuellement dispersées entre différents supports (registres papier, fichiers Excel, communications orales), ce qui rend leur consolidation difficile et leur exploitation statistique quasi impossible en temps réel.</p>
    <p>Cette dispersion des données entraîne plusieurs conséquences directes sur la qualité du service. Premièrement, la recherche d'un dossier patient peut prendre plusieurs minutes, voire rester infructueuse si le registre a été égaré ou endommagé. Deuxièmement, les doublons sont fréquents : un même patient peut être enregistré sous différentes orthographes, créant des incohérences dans les statistiques. Troisièmement, la coordination entre services est déficiente : le service d'accueil ne sait pas toujours si un patient a déjà été consulté par un médecin, et le service pharmaceutique ne dispose pas en temps réel de l'état des stocks. Quatrièmement, la production de rapports statistiques pour la direction est un processus manuel, long et sujet à erreurs.</p>
    <p>Ces défis ne sont pas spécifiques à la Clinique GODIE : ils sont représentatifs des difficultés rencontrées par de nombreux établissements de santé privés à Madagascar. La résolution de ces défis par le développement d'une application web sur mesure constitue donc une démarche à la fois concrète pour la clinique et exemplaire pour le secteur.</p>
    <p>La question centrale qui se pose est donc la suivante : comment concevoir et réaliser une application web professionnelle, complète et sécurisée permettant de gérer de manière intégrée l'ensemble des activités de la Clinique GODIE — patients, médecins, personnel, rendez-vous, consultations, hospitalisations, laboratoire, pharmacie, facturation et urgences — tout en garantissant la fiabilité des données, la facilité d'utilisation et l'évolutivité du système ?</p>

    <h2>Objectifs</h2>
    <p class="no-indent">Ce travail poursuit les objectifs suivants :</p>
    <ol>
      <li><strong>Concevoir une architecture logicielle modulaire</strong> couvrant l'ensemble des processus métier de la clinique, de l'accueil du patient jusqu'à la facturation et la gestion des urgences.</li>
      <li><strong>Développer une interface utilisateur moderne, responsive et accessible</strong>, adaptée à une utilisation sur ordinateur, tablette et téléphone, avec un mode clair et un mode sombre.</li>
      <li><strong>Implémenter un framework CRUD générique</strong> permettant d'ajouter rapidement de nouveaux modules sans développement répétitif, grâce à une approche « config-driven ».</li>
      <li><strong>Assurer la persistance des données</strong> avec auto-incrémentation des identifiants, garantissant des clés primaires uniques et un démarrage sur base vide.</li>
      <li><strong>Garantir la fiabilité, la sécurité et la maintenabilité du code</strong> en utilisant un typage statique strict (TypeScript) et une architecture en couches clairement séparées.</li>
      <li><strong>Produire un tableau de bord analytique</strong> avec statistiques en temps réel et graphiques interactifs pour le pilotage de la clinique.</li>
      <li><strong>Offrir des capacités d'export</strong> (PDF, Excel, impression) et de sauvegarde/restauration des données.</li>
    </ol>

    <h2>Méthodologie</h2>
    <p class="no-indent">Le projet suit une démarche méthodologique en cascade adaptée, comprenant les étapes suivantes :</p>
    <ul>
      <li><strong>Analyse</strong> : étude de l'existant, recueil des besoins auprès du personnel de la clinique, identification des acteurs et des processus métier.</li>
      <li><strong>Conception</strong> : modélisation UML (diagrammes de cas d'utilisation, de classes, de séquences, d'activité), conception de la base de données (MCD, MLD) et définition de l'architecture logicielle.</li>
      <li><strong>Réalisation</strong> : développement du frontend avec React, TypeScript, Vite et Tailwind CSS, implémentation du framework CRUD générique et des pages personnalisées.</li>
      <li><strong>Tests</strong> : validation fonctionnelle de chaque module selon une grille de cas de tests prédéfinie.</li>
      <li><strong>Déploiement</strong> : préparation du build de production et configuration de l'intégration continue.</li>
    </ul>

    <h2>Structure du mémoire</h2>
    <p class="no-indent">Ce mémoire est structuré en onze chapitres :</p>
    <ul>
      <li>Le <strong>Chapitre I</strong> présente la Clinique GODIE, son organisation et ses services.</li>
      <li>Le <strong>Chapitre II</strong> analyse le système existant et identifie ses limites.</li>
      <li>Le <strong>Chapitre III</strong> dégage les besoins fonctionnels et non fonctionnels.</li>
      <li>Le <strong>Chapitre IV</strong> décrit la conception UML et la modélisation des données.</li>
      <li>Le <strong>Chapitre V</strong> justifie les choix technologiques effectués.</li>
      <li>Le <strong>Chapitre VI</strong> expose l'architecture de l'application.</li>
      <li>Le <strong>Chapitre VII</strong> détaille la réalisation et l'implémentation.</li>
      <li>Le <strong>Chapitre VIII</strong> présente chaque module de l'application avec captures d'écran.</li>
      <li>Le <strong>Chapitre IX</strong> aborde les tests et la validation.</li>
      <li>Le <strong>Chapitre X</strong> traite de la sécurité.</li>
      <li>Le <strong>Chapitre XI</strong> décrit le déploiement et l'intégration continue.</li>
      <li>La <strong>Conclusion générale</strong> synthétise le travail et ouvre des perspectives.</li>
    </ul>
  </div>"""

new_intro = """  <!-- INTRODUCTION GÉNÉRALE -->
  <div class="page-break chapter">
    <h1>INTRODUCTION GÉNÉRALE</h1>

    <h2>Contexte et justification</h2>
    <p class="no-indent">La gestion d'un établissement de santé est une tâche complexe qui mobilise de nombreuses ressources humaines, matérielles et informationnelles. Dans le contexte malgache, et particulièrement dans la ville d'Antsiranana — située dans le Nord de Madagascar — de nombreuses cliniques privées assurent encore leur gestion au moyen de procédés manuels ou de fichiers bureautiques dispersés. Cette situation engendre des pertes de temps considérables, des risques d'erreurs de saisie, des doublons dans les enregistrements et une grande difficulté à produire des rapports fiables en temps réel. L'absence d'un système d'information unifié constitue un frein majeur à l'amélioration de la qualité des soins et à l'efficience de la gestion administrative.</p>
    <p>La transformation numérique des établissements de santé est devenue une nécessité incontournable pour améliorer la qualité des soins, optimiser la gestion administrative et garantir la traçabilité des informations médicales. À Madagascar, cette transformation est encore balbutiante dans le secteur privé, où les outils informatisés restent rares, coûteux et souvent inadaptés aux besoins locaux. Les rares solutions existantes sont généralement conçues pour des contextes hospitaliers occidentaux et ne prennent pas en compte les réalités spécifiques des établissements de santé malgaches : taille réduite, ressources informatiques limitées, besoin d'autonomie sans serveur dédié, et nécessité d'une interface en français adaptée au personnel local.</p>
    <p>La Clinique GODIE, dirigée par Monsieur JESE Andriamaniraka Davida, est un établissement privé situé à Antsiranana qui souhaite s'engager dans cette démarche de modernisation en adoptant une application web centralisée de gestion hospitalière. Cette volonté s'inscrit dans une vision stratégique visant à améliorer l'efficience opérationnelle de la clinique, la qualité du service rendu aux patients et la capacité de pilotage de la direction. La clinique a connu une croissance régulière de son activité, élargissant son offre de soins et accueillant un nombre croissant de patients, ce qui a rendu la gestion manuelle de plus en plus difficile et a créé un besoin urgent de digitalisation.</p>
    <p>Par ailleurs, ce projet s'inscrit dans un cadre académique : il constitue un mémoire de fin d'études en vue de l'obtention du diplôme de Licence Professionnelle Informatique à l'Université d'Antsiranana. À ce titre, il doit non seulement répondre à un besoin réel identifié auprès de la Clinique GODIE, mais également démontrer la maîtrise des compétences acquises durant le cursus universitaire : analyse de besoins, conception de systèmes, modélisation UML, programmation web, gestion de base de données, et rédaction de documentation technique. Le projet doit également être présenté et défendu devant un jury universitaire, ce qui impose un niveau de qualité et de finition professionnel.</p>

    <h2>Problématique</h2>
    <p class="no-indent">La Clinique GODIE fait face à plusieurs défis dans sa gestion quotidienne. Les données relatives aux patients, aux rendez-vous, aux consultations, à la pharmacie et à la facturation sont actuellement dispersées entre différents supports (registres papier, fichiers Excel, communications orales), ce qui rend leur consolidation difficile et leur exploitation statistique quasi impossible en temps réel. Aucune procédure de sauvegarde automatique n'est en place, et les données papier sont vulnérables aux dégradations physiques.</p>
    <p>Cette dispersion des données entraîne plusieurs conséquences directes sur la qualité du service. Premièrement, la recherche d'un dossier patient peut prendre plusieurs minutes, voire rester infructueuse si le registre a été égaré ou endommagé. Deuxièmement, les doublons sont fréquents : un même patient peut être enregistré sous différentes orthographes, créant des incohérences dans les statistiques. Troisièmement, la coordination entre services est déficiente : le service d'accueil ne sait pas toujours si un patient a déjà été consulté par un médecin, et le service pharmaceutique ne dispose pas en temps réel de l'état des stocks. Quatrièmement, la production de rapports statistiques pour la direction est un processus manuel, long et sujet à erreurs. Cinquièmement, le suivi des patients après leur sortie de l'hôpital n'est pas formalisé, et la gestion de la morgue repose sur un registre papier non relié au reste du système.</p>
    <p>Ces défis ne sont pas spécifiques à la Clinique GODIE : ils sont représentatifs des difficultés rencontrées par de nombreux établissements de santé privés à Madagascar. La résolution de ces défis par le développement d'une application web sur mesure constitue donc une démarche à la fois concrète pour la clinique et exemplaire pour le secteur. De plus, les normes et standards internationaux en matière de gestion des données de santé évoluent rapidement : la confidentialité des données médicales, la traçabilité des prescriptions et la sécurité des informations personnelles sont des exigences de plus en plus strictes que les procédés manuels ne permettent pas de satisfaire.</p>
    <p>La question centrale qui se pose est donc la suivante : comment concevoir et réaliser une application web professionnelle, complète et sécurisée permettant de gérer de manière intégrée l'ensemble des activités de la Clinique GODIE — patients, médecins, personnel, rendez-vous, consultations, hospitalisations, laboratoire, pharmacie, facturation, urgences, suivi des patients, morgue et tarification — tout en garantissant la fiabilité des données, la facilité d'utilisation, l'évolutivité du système et la production de rapports détaillés par module et globaux ?</p>

    <h2>Objectifs du projet</h2>
    <p class="no-indent">Ce travail poursuit les objectifs suivants :</p>
    <ol>
      <li><strong>Concevoir une architecture logicielle modulaire</strong> couvrant l'ensemble des processus métier de la clinique, de l'accueil du patient jusqu'à la facturation, la gestion des urgences, le suivi post-hospitalisation et la gestion de la morgue.</li>
      <li><strong>Développer une interface utilisateur moderne, responsive et accessible</strong>, adaptée à une utilisation sur ordinateur, tablette et téléphone, avec un mode clair et un mode sombre, offrant une expérience utilisateur fluide et intuitive.</li>
      <li><strong>Implémenter un framework CRUD générique</strong> permettant d'ajouter rapidement de nouveaux modules sans développement répétitif, grâce à une approche « config-driven » basée sur un registre de configuration déclaratif.</li>
      <li><strong>Assurer la persistance des données</strong> avec auto-incrémentation des identifiants, garantissant des clés primaires uniques et un démarrage sur base vide, avec des capacités de sauvegarde et restauration complètes.</li>
      <li><strong>Garantir la fiabilité, la sécurité et la maintenabilité du code</strong> en utilisant un typage statique strict (TypeScript) et une architecture en couches clairement séparées (présentation, logique métier, persistance).</li>
      <li><strong>Produire un tableau de bord analytique</strong> avec statistiques en temps réel et graphiques interactifs pour le pilotage de la clinique, permettant à la direction de suivre l'évolution des principaux indicateurs en un coup d'œil.</li>
      <li><strong>Offrir des capacités d'export</strong> (PDF, Excel, impression) pour chaque module ainsi qu'un système de rapports détaillés par module et un rapport global consolidé.</li>
      <li><strong>Implémenter une recherche globale</strong> permettant de rechercher instantanément across tous les modules du système à partir d'une barre de recherche unique accessible via un raccourci clavier.</li>
      <li><strong>Fournir des vues de listes globales</strong> permettant de consulter en un coup d'œil l'ensemble des listes du système (médecins, personnel, patients, etc.) avec leurs statistiques.</li>
    </ol>

    <h2>Méthodologie</h2>
    <p class="no-indent">Le projet suit une démarche méthodologique en cascade adaptée, comprenant les étapes suivantes :</p>
    <ul>
      <li><strong>Analyse</strong> : étude de l'existant par observation directe et entretiens avec le personnel de la clinique, recueil des besoins, identification des acteurs et des processus métier, et définition du périmètre fonctionnel.</li>
      <li><strong>Conception</strong> : modélisation UML (diagrammes de cas d'utilisation, de classes, de séquences, d'activité), conception de la base de données (MCD, MLD) selon la méthode Merise, et définition de l'architecture logicielle en trois couches.</li>
      <li><strong>Réalisation</strong> : développement du frontend avec React 18, TypeScript, Vite 5 et Tailwind CSS 3, implémentation du framework CRUD générique config-driven, et développement des pages personnalisées (tableau de bord, calendrier de rendez-vous, rapports, paramètres, listes globales, recherche globale).</li>
      <li><strong>Tests</strong> : validation fonctionnelle de chaque module selon une grille de cas de tests prédéfinie, couvrant les opérations CRUD, les exports, la navigation, le mode sombre et le responsive design.</li>
      <li><strong>Déploiement</strong> : préparation du build de production optimisé, configuration de l'intégration continue avec GitHub Actions, et documentation des procédures de déploiement.</li>
    </ul>

    <h2>Structure du mémoire</h2>
    <p class="no-indent">Ce mémoire est structuré en onze chapitres :</p>
    <ul>
      <li>Le <strong>Chapitre I</strong> présente la Clinique GODIE, son organisation, sa localisation et ses services.</li>
      <li>Le <strong>Chapitre II</strong> analyse le système existant, identifie ses limites et propose des solutions.</li>
      <li>Le <strong>Chapitre III</strong> dégage les besoins fonctionnels et non fonctionnels, identifie les acteurs et définit les règles de gestion.</li>
      <li>Le <strong>Chapitre IV</strong> décrit la conception UML et la modélisation des données (MCD, MLD).</li>
      <li>Le <strong>Chapitre V</strong> justifie les choix technologiques effectués pour le frontend et la persistance.</li>
      <li>Le <strong>Chapitre VI</strong> expose l'architecture de l'application et le pattern config-driven.</li>
      <li>Le <strong>Chapitre VII</strong> détaille la réalisation : structure du projet, store de données, framework CRUD et design system.</li>
      <li>Le <strong>Chapitre VIII</strong> présente chaque module de l'application avec captures d'écran réelles, y compris les nouveaux modules (suivi des patients, morgue, prix des services, listes globales, recherche globale).</li>
      <li>Le <strong>Chapitre IX</strong> aborde les tests fonctionnels et la matrice de traçabilité des besoins.</li>
      <li>Le <strong>Chapitre X</strong> traite de la sécurité (validation, XSS, rôles, journalisation, sauvegarde).</li>
      <li>Le <strong>Chapitre XI</strong> décrit le déploiement, l'intégration continue et le diagramme de déploiement.</li>
      <li>La <strong>Conclusion générale</strong> synthétise le travail accompli et ouvre des perspectives d'évolution.</li>
      <li>Les <strong>Annexes</strong> regroupent la liste complète des modules, les captures d'écran supplémentaires et les éléments techniques.</li>
      <li>La <strong>Table des matières</strong> détaillée figure en fin de document, après les annexes.</li>
    </ul>
  </div>"""

html = html.replace(old_intro, new_intro)

# 3. Add new module sections to Chapter VIII (after 8.10, before Chapter IX)
old_sec9_marker = """    <figure><img src="figures/fig21_mobile.png" alt="Version mobile"><figcaption>Figure 21 — Capture d'écran : Version mobile</figcaption></figure>
  </div>

  <!-- CHAPITRE IX -->"""

new_modules = """    <figure><img src="figures/fig21_mobile.png" alt="Version mobile"><figcaption>Figure 21 — Capture d'écran : Version mobile</figcaption></figure>

    <h2>8.11 Suivi des patients</h2>
    <p class="no-indent">Le module de suivi des patients est un module nouvellement ajouté qui permet d'assurer le suivi médical des patients après leur sortie de l'hôpital ou après une consultation. Ce module est essentiel pour la continuité des soins, particulièrement pour les patients sous traitement long, en convalescence ou nécessitant un contrôle post-opératoire.</p>
    <p>Chaque enregistrement de suivi contient : le patient concerné (lien obligatoire vers le module des patients), la date du suivi, le type de suivi (post-opératoire, post-consultation, traitement long, convalescence, contrôle), le statut (en cours, terminé, critique), les notes médicales détaillées et la date de la prochaine visite. Le statut est affiché sous forme de badge coloré : bleu pour « en cours », vert pour « terminé » et rouge pour « critique », permettant une identification visuelle immédiate des patients nécessitant une attention particulière.</p>
    <p>Le module dispose d'un filtre par statut permettant d'afficher uniquement les suivis en cours, terminés ou critiques. Cette fonctionnalité est particulièrement utile pour les médecins qui doivent suivre de nombreux patients simultanément et prioriser ceux dont l'état de santé nécessite une attention immédiate. La date de prochaine visite permet de planifier les rendez-vous de contrôle et d'éviter les oublis.</p>
    <figure><img src="figures/fig24_suivi.png" alt="Suivi des patients"><figcaption>Figure 24 — Capture d'écran : Suivi des patients</figcaption></figure>

    <h2>8.12 Morgue</h2>
    <p class="no-indent">Le module de la morgue est un module nouvellement ajouté qui permet de gérer le registre de la morgue de la clinique. Ce module, bien que délicat, est essentiel pour la gestion complète d'un établissement hospitalier. Il assure la traçabilité des entrées et sorties des défunts, la gestion des références et le contact avec les familles.</p>
    <p>Chaque enregistrement de la morgue contient : le nom du défunt, la date d'entrée à la morgue, un numéro de référence unique, la cause du décès, le contact de la famille, la date de sortie (récupération ou transfert) et le statut (en place, récupéré, transféré). Le statut est affiché sous forme de badge coloré : gris pour « en place », vert pour « récupéré » et bleu pour « transféré ». Un filtre par statut permet d'afficher uniquement les défunts encore présents ou déjà sortis.</p>
    <p>Ce module garantit une traçabilité rigoureuse des entrées et sorties de la morgue, ce qui est essentiel sur le plan administratif et légal. Les références uniques permettent d'identifier sans ambiguïté chaque dossier, et les contacts des familles facilitent les démarches de récupération ou de transfert.</p>
    <figure><img src="figures/fig23_morgue.png" alt="Module Morgue"><figcaption>Figure 23 — Capture d'écran : Module Morgue</figcaption></figure>

    <h2>8.13 Prix des services et tarification</h2>
    <p class="no-indent">Le module de gestion des prix des services est un module nouvellement ajouté qui permet de définir et de gérer la tarification de tous les services offerts par la clinique. Ce module est le référentiel tarifaire de l'établissement, utilisé comme base pour la facturation des patients.</p>
    <p>Chaque tarif enregistre : le nom du service, la catégorie (consultation, hospitalisation, laboratoire, pharmacie, urgence, chirurgie, imagerie, autre), le prix en Ariary et une description optionnelle. Un filtre par catégorie permet de visualiser rapidement les tarifs d'un type de service donné. Ce module est particulièrement utile pour assurer la cohérence de la facturation : tous les services sont tarifés de manière uniforme et transparente, évitant les disparités et les erreurs de tarification.</p>
    <p>La tarification en Ariary (monnaie locale) est conforme au contexte malgache et facilite la gestion comptable de la clinique. Le module de prix des services complète le module de facturation en fournissant le référentiel des prix de référence, garantissant que toutes les factures émises par la clinique s'appuient sur une grille tarifaire officielle et à jour.</p>
    <figure><img src="figures/fig25_prix.png" alt="Prix des services"><figcaption>Figure 25 — Capture d'écran : Prix des services</figcaption></figure>

    <h2>8.14 Recherche globale</h2>
    <p class="no-indent">La recherche globale est une fonctionnalité transversale nouvellement ajoutée qui permet de rechercher instantanément across tous les modules du système à partir d'une barre de recherche unique, accessible depuis la barre supérieure de l'application ou via le raccourci clavier Ctrl+K (ou Cmd+K sur Mac). Cette fonctionnalité constitue un gain de productivité majeur pour les utilisateurs : au lieu de naviguer manuellement dans chaque module pour retrouver un enregistrement, ils peuvent effectuer une recherche unifiée qui parcourt simultanément toutes les collections.</p>
    <p>La recherche globale fonctionne de la manière suivante : lorsque l'utilisateur saisit au moins deux caractères dans la barre de recherche, le système parcourt toutes les collections de données (patients, médecins, rendez-vous, consultations, factures, etc.) et filtre les enregistrements dont les champs de recherche correspondent à la requête. Les résultats sont affichés dans une fenêtre superposée (overlay) qui présente chaque résultat avec son libellé, le module auquel il appartient et son identifiant. Un clic sur un résultat navigue directement vers le module correspondant.</p>
    <p>Cette fonctionnalité est particulièrement utile dans un contexte hospitalier où la rapidité d'accès à l'information est critique. Un réceptionniste peut retrouver instantanément un patient par son nom ou son téléphone, un médecin peut localiser une consultation par son diagnostic, et un comptable peut chercher une facture par son montant — le tout sans quitter la page courante.</p>

    <h2>8.15 Listes globales</h2>
    <p class="no-indent">La page des listes globales est une page nouvellement ajoutée qui offre une vue d'ensemble de toutes les listes du système en un seul écran. Elle présente des statistiques globales (nombre total de modules, nombre total d'enregistrements, nombre de catégories), une barre de filtrage par nom de module, et une organisation par groupe fonctionnel (Patients & Soins, Personnel, Consultations, Hospitalisation, Laboratoire, Pharmacie, Facturation, Urgences, Sécurité, Référentiels).</p>
    <p>Chaque module est représenté par une carte cliquable affichant son icône, son nom et le nombre d'enregistrements qu'il contient. Un clic sur une carte navigue directement vers le module correspondant. Cette page est particulièrement utile pour la direction qui souhaite avoir une vision synthétique de l'ensemble du système d'information et identifier rapidement les modules qui contiennent le plus ou le moins de données.</p>
    <p>La page des listes globales complète le tableau de bord en offrant une vue orientée « modules » plutôt qu'orientée « indicateurs ». Tandis que le tableau de bord présente des statistiques et des graphiques, les listes globales présentent la structure du système et le volume de données par module, offrant ainsi une double perspective sur l'état du système d'information de la clinique.</p>
    <figure><img src="figures/fig22_listes.png" alt="Listes globales"><figcaption>Figure 22 — Capture d'écran : Listes globales</figcaption></figure>
  </div>

  <!-- CHAPITRE IX -->"""

html = html.replace(old_sec9_marker, new_modules)

# 4. Expand the CONCLUSION
old_conclusion = """  <!-- CONCLUSION -->
  <div class="page-break chapter">
    <h1>CONCLUSION GÉNÉRALE</h1>
    <p class="no-indent">Ce mémoire a présenté la conception et la réalisation d'une application web de gestion hospitalière pour la Clinique GODIE, un établissement de santé privé situé à Antsiranana, dans le Nord de Madagascar. L'objectif de ce projet était de répondre aux besoins concrets d'un établissement de santé malgache en proposant un système d'information moderne, complet et adapté au contexte local.</p>
    <p>Le projet couvre trente modules fonctionnels, depuis la gestion des patients et du personnel jusqu'à la facturation, en passant par les rendez-vous, les consultations, les ordonnances, les hospitalisations, le laboratoire, la pharmacie, les urgences et la sécurité. Cette couverture fonctionnelle étendue démontre qu'il est possible de digitaliser l'ensemble du parcours de soins d'une clinique privée dans une application unique et cohérente.</p>
    <p>L'architecture config-driven, basée sur un registre de ressources déclaratif, a permis de développer un framework CRUD générique qui génère automatiquement l'ensemble des interfaces. Cette approche présente plusieurs avantages majeurs : une productivité de développement élevée (l'ajout d'un module se résume à quelques lignes de configuration), une cohérence d'interface parfaite entre tous les modules, et une maintenabilité du code optimisée (une correction dans le framework se propage à tous les modules). Ce choix architectural démontre qu'avec une conception logicielle bien pensée, il est possible de couvrir un périmètre fonctionnel très large avec un code minimal et maintenable.</p>
    <p>Les technologies modernes employées — React 18, TypeScript, Vite 5, Tailwind CSS 3, Chart.js — ont permis de réaliser une application performante, responsive et professionnelle. Le typage statique de TypeScript garantit la fiabilité du code, Vite assure une expérience de développement fluide et rapide, et Tailwind CSS offre un design system cohérent et personnalisable. L'application est prête pour une démonstration devant un jury universitaire et constitue une base solide pour une mise en production.</p>
    <p>La validation de l'application a été effectuée par une série de tests fonctionnels systématiques couvrant l'ensemble des modules. La matrice de traçabilité a permis de vérifier que tous les besoins identifiés ont été couverts par une fonctionnalité et validés par un test. Aucun besoin n'a été laissé sans réponse, ce qui démontre l'exhaustivité de la réalisation.</p>
    <h2>Perspectives d'évolution</h2>
    <ul>
      <li>Intégration d'un backend Node.js/Express avec PostgreSQL ou MongoDB</li>
      <li>Authentification JWT avec gestion des sessions</li>
      <li>Application mobile native (React Native)</li>
      <li>Notifications push et SMS (rappels de rendez-vous)</li>
      <li>Intelligence artificielle pour l'aide au diagnostic</li>
      <li>Interconnexion avec des dispositifs médicaux (IoT)</li>
    </ul>
    <p>Ce projet démontre qu'avec des technologies web modernes et une architecture bien pensée, il est possible de répondre aux besoins réels d'un établissement de santé malgache tout en produisant un logiciel de qualité professionnelle.</p>
  </div>"""

new_conclusion = """  <!-- CONCLUSION -->
  <div class="page-break chapter">
    <h1>CONCLUSION GÉNÉRALE</h1>
    <p class="no-indent">Ce mémoire a présenté la conception et la réalisation d'une application web de gestion hospitalière pour la Clinique GODIE, un établissement de santé privé situé à Antsiranana, dans le Nord de Madagascar. L'objectif de ce projet était de répondre aux besoins concrets d'un établissement de santé malgache en proposant un système d'information moderne, complet, adapté au contexte local et prêt pour une démonstration devant un jury universitaire. Au terme de ce travail, il est possible de dresser un bilan des résultats obtenus, des compétences mises en œuvre et des perspectives d'évolution.</p>
    <p>Le projet couvre vingt-neuf modules fonctionnels intégrés, depuis la gestion des patients et du personnel jusqu'à la facturation et la tarification, en passant par les rendez-vous, les consultations, les ordonnances, les hospitalisations, le laboratoire, la pharmacie, les urgences, le suivi des patients, la morgue, la sécurité et le journal des activités. Cette couverture fonctionnelle étendue démontre qu'il est possible de digitaliser l'ensemble du parcours de soins d'une clinique privée dans une application unique et cohérente, y compris les aspects rarement couverts par les solutions existantes comme le suivi post-hospitalisation et la gestion de la morgue.</p>
    <p>L'architecture config-driven, basée sur un registre de ressources déclaratif, a permis de développer un framework CRUD générique qui génère automatiquement l'ensemble des interfaces. Cette approche présente plusieurs avantages majeurs : une productivité de développement élevée (l'ajout d'un module se résume à quelques lignes de configuration), une cohérence d'interface parfaite entre tous les modules, et une maintenabilité du code optimisée (une correction dans le framework se propage à tous les modules). Ce choix architectural démontre qu'avec une conception logicielle bien pensée, il est possible de couvrir un périmètre fonctionnel très large avec un code minimal et maintenable, illustrant concrètement le principe DRY (Don't Repeat Yourself) appliqué à grande échelle.</p>
    <p>Les technologies modernes employées — React 18, TypeScript, Vite 5, Tailwind CSS 3, Chart.js — ont permis de réaliser une application performante, responsive et professionnelle. Le typage statique de TypeScript garantit la fiabilité du code en détectant de nombreuses erreurs à la compilation, Vite assure une expérience de développement fluide et rapide avec un Hot Module Replacement quasi instantané, et Tailwind CSS offre un design system cohérent et personnalisable avec un mode sombre intégré. L'application est prête pour une démonstration devant un jury universitaire et constitue une base solide pour une mise en production.</p>
    <p>Les fonctionnalités transversales ajoutées — la recherche globale accessible via Ctrl+K, les listes globales offrant une vue d'ensemble de tous les modules, les rapports détaillés par module et le rapport global consolidé, le calendrier des rendez-vous avec filtrage par médecin, et la gestion des prix des services — enrichissent considérablement l'expérience utilisateur et la capacité de pilotage de la direction. Ces fonctionnalités répondent à des besoins réels identifiés auprès du personnel de la clinique et démontrent la maturité de la solution proposée.</p>
    <p>La validation de l'application a été effectuée par une série de tests fonctionnels systématiques couvrant l'ensemble des modules. La matrice de traçabilité a permis de vérifier que tous les besoins identifiés ont été couverts par une fonctionnalité et validés par un test. Aucun besoin n'a été laissé sans réponse, ce qui démontre l'exhaustivité de la réalisation. Les tests ont également vérifié le comportement de l'application dans des conditions défavorables (saisie invalide, suppression sans confirmation, recherche sans résultat, export avec base vide), confirmant la robustesse du système.</p>
    <p>Sur le plan académique, ce projet a permis de mettre en pratique et de consolider l'ensemble des compétences acquises durant le cursus de Licence Professionnelle Informatique : analyse de besoins, modélisation UML, conception de base de données (MCD/MLD Merise), programmation web avec un framework moderne (React/TypeScript), architecture logicielle en couches, design system, tests fonctionnels, documentation technique et déploiement. Il constitue une démonstration concrète de la maîtrise de ces compétences et de la capacité à mener un projet informatique de bout en bout, de l'analyse du besoin jusqu'au déploiement.</p>
    <h2>Perspectives d'évolution</h2>
    <p class="no-indent">Si l'application répond déjà aux besoins immédiats de la Clinique GODIE, plusieurs perspectives d'évolution peuvent être envisagées pour enrichir et faire évoluer le système :</p>
    <ul>
      <li><strong>Intégration d'un backend Node.js/Express avec PostgreSQL</strong> : migration de la persistance du localStorage vers une base de données serveur, permettant un accès multi-postes simultané, une sauvegarde automatique et une meilleure sécurité des données.</li>
      <li><strong>Authentification JWT avec gestion des sessions</strong> : mise en place d'un système d'authentification sécurisé avec tokens JWT, gestion des sessions et contrôle d'accès basé sur les rôles déjà définis dans l'application.</li>
      <li><strong>Application mobile native (React Native)</strong> : développement d'une application mobile dédiée pour les médecins et infirmiers, permettant la consultation des dossiers patients et la saisie de consultations en mobilité.</li>
      <li><strong>Notifications push et SMS</strong> : envoi automatique de rappels de rendez-vous aux patients par SMS, et notifications push pour alerter le personnel en cas d'urgence ou de stock faible.</li>
      <li><strong>Intelligence artificielle pour l'aide au diagnostic</strong> : intégration de modèles d'apprentissage automatique pour suggérer des diagnostics à partir des symptômes, ou détecter des patterns anormaux dans les résultats d'analyses.</li>
      <li><strong>Interconnexion avec des dispositifs médicaux (IoT)</strong> : connexion directe avec des appareils médicaux (thermomètres connectés, oxymètres, moniteurs de signes vitaux) pour une saisie automatique des données dans les dossiers patients.</li>
      <li><strong>Module de téléconsultation</strong> : intégration d'une fonctionnalité de consultation à distance via vidéo, particulièrement pertinente dans le contexte malgache où l'accès aux soins spécialisés est limité en zones rurales.</li>
      <li><strong>Tableau de bord avancé avec indicateurs de performance</strong> : enrichissement du tableau de bord avec des KPIs hospitaliers (taux d'occupation des lits, durée moyenne de séjour, taux de rotation des patients) et des alertes intelligentes.</li>
    </ul>
    <p>En définitive, ce projet démontre qu'avec des technologies web modernes, une architecture logicielle bien pensée et une approche centrée sur les besoins réels des utilisateurs, il est possible de répondre aux défis concrets d'un établissement de santé malgache tout en produisant un logiciel de qualité professionnelle, performant, évolutif et prêt pour une mise en production. Il constitue une contribution concrète à la transformation numérique du secteur de la santé à Madagascar et ouvre la voie à des développements futurs ambitieux.</p>
  </div>"""

html = html.replace(old_conclusion, new_conclusion)

# 5. Add new figures to Annexes and add Table des matières after Annexes
old_annexes_end = """    <figure><img src="figures/fig_activity.png" alt="Journal des activités"><figcaption>Module du journal des activités</figcaption></figure>
    <p style="text-align:center; margin-top:3cm; font-weight:bold;">— Fin du mémoire —</p>
  </div>
</body>
</html>"""

new_annexes_end = """    <figure><img src="figures/fig_activity.png" alt="Journal des activités"><figcaption>Module du journal des activités</figcaption></figure>
    <h2>Annexe D — Captures d'écran des nouveaux modules</h2>
    <figure><img src="figures/fig22_listes.png" alt="Listes globales"><figcaption>Page des listes globales — vue d'ensemble de tous les modules</figcaption></figure>
    <figure><img src="figures/fig23_morgue.png" alt="Morgue"><figcaption>Module de gestion de la morgue</figcaption></figure>
    <figure><img src="figures/fig24_suivi.png" alt="Suivi des patients"><figcaption>Module de suivi des patients</figcaption></figure>
    <figure><img src="figures/fig25_prix.png" alt="Prix des services"><figcaption>Module de gestion des prix des services</figcaption></figure>
    <p style="text-align:center; margin-top:3cm; font-weight:bold;">— Fin du mémoire —</p>
  </div>

  <!-- TABLE DES MATIÈRES DÉTAILLÉE -->
  <div class="page-break chapter">
    <h1>TABLE DES MATIÈRES</h1>
    <div class="toc-entry"><span><strong>Introduction générale</strong></span><span class="toc-dots"></span><span>9</span></div>
    <div class="toc-entry sub"><span>Contexte et justification</span><span class="toc-dots"></span><span>9</span></div>
    <div class="toc-entry sub"><span>Problématique</span><span class="toc-dots"></span><span>10</span></div>
    <div class="toc-entry sub"><span>Objectifs du projet</span><span class="toc-dots"></span><span>11</span></div>
    <div class="toc-entry sub"><span>Méthodologie</span><span class="toc-dots"></span><span>12</span></div>
    <div class="toc-entry sub"><span>Structure du mémoire</span><span class="toc-dots"></span><span>12</span></div>
    <div class="toc-entry"><span><strong>Chapitre I — Présentation de la Clinique GODIE</strong></span><span class="toc-dots"></span><span>13</span></div>
    <div class="toc-entry sub"><span>1.1 Présentation générale</span><span class="toc-dots"></span><span>13</span></div>
    <div class="toc-entry sub"><span>1.2 Localisation géographique</span><span class="toc-dots"></span><span>14</span></div>
    <div class="toc-entry sub"><span>1.3 Organigramme</span><span class="toc-dots"></span><span>14</span></div>
    <div class="toc-entry sub"><span>1.4 Services offerts</span><span class="toc-dots"></span><span>15</span></div>
    <div class="toc-entry sub"><span>1.5 Motivation du projet</span><span class="toc-dots"></span><span>16</span></div>
    <div class="toc-entry"><span><strong>Chapitre II — Analyse de l'existant</strong></span><span class="toc-dots"></span><span>17</span></div>
    <div class="toc-entry sub"><span>2.1 Méthodes de travail actuelles</span><span class="toc-dots"></span><span>17</span></div>
    <div class="toc-entry sub"><span>2.2 Limites du système actuel</span><span class="toc-dots"></span><span>18</span></div>
    <div class="toc-entry sub"><span>2.3 Propositions de solutions</span><span class="toc-dots"></span><span>19</span></div>
    <div class="toc-entry"><span><strong>Chapitre III — Étude des besoins</strong></span><span class="toc-dots"></span><span>21</span></div>
    <div class="toc-entry sub"><span>3.1 Identification des acteurs</span><span class="toc-dots"></span><span>21</span></div>
    <div class="toc-entry sub"><span>3.2 Besoins fonctionnels</span><span class="toc-dots"></span><span>22</span></div>
    <div class="toc-entry sub"><span>3.3 Besoins non fonctionnels</span><span class="toc-dots"></span><span>24</span></div>
    <div class="toc-entry sub"><span>3.4 Règles de gestion</span><span class="toc-dots"></span><span>25</span></div>
    <div class="toc-entry"><span><strong>Chapitre IV — Conception UML</strong></span><span class="toc-dots"></span><span>27</span></div>
    <div class="toc-entry sub"><span>4.1 Diagramme de cas d'utilisation</span><span class="toc-dots"></span><span>27</span></div>
    <div class="toc-entry sub"><span>4.2 Diagramme de classes</span><span class="toc-dots"></span><span>29</span></div>
    <div class="toc-entry sub"><span>4.3 Diagrammes de séquence</span><span class="toc-dots"></span><span>31</span></div>
    <div class="toc-entry sub"><span>4.4 Diagramme d'activité</span><span class="toc-dots"></span><span>33</span></div>
    <div class="toc-entry sub"><span>4.5 Modèle conceptuel de données</span><span class="toc-dots"></span><span>34</span></div>
    <div class="toc-entry sub"><span>4.6 Modèle logique de données</span><span class="toc-dots"></span><span>36</span></div>
    <div class="toc-entry"><span><strong>Chapitre V — Choix technologiques</strong></span><span class="toc-dots"></span><span>38</span></div>
    <div class="toc-entry sub"><span>5.1 Frontend</span><span class="toc-dots"></span><span>38</span></div>
    <div class="toc-entry sub"><span>5.2 Persistance des données</span><span class="toc-dots"></span><span>40</span></div>
    <div class="toc-entry sub"><span>5.3 Justification globale</span><span class="toc-dots"></span><span>41</span></div>
    <div class="toc-entry"><span><strong>Chapitre VI — Architecture de l'application</strong></span><span class="toc-dots"></span><span>43</span></div>
    <div class="toc-entry sub"><span>6.1 Architecture générale</span><span class="toc-dots"></span><span>43</span></div>
    <div class="toc-entry sub"><span>6.2 Couches logicielles</span><span class="toc-dots"></span><span>44</span></div>
    <div class="toc-entry sub"><span>6.3 Pattern config-driven</span><span class="toc-dots"></span><span>45</span></div>
    <div class="toc-entry"><span><strong>Chapitre VII — Réalisation</strong></span><span class="toc-dots"></span><span>47</span></div>
    <div class="toc-entry sub"><span>7.1 Structure du projet</span><span class="toc-dots"></span><span>47</span></div>
    <div class="toc-entry sub"><span>7.2 Store de données</span><span class="toc-dots"></span><span>48</span></div>
    <div class="toc-entry sub"><span>7.3 Framework CRUD</span><span class="toc-dots"></span><span>49</span></div>
    <div class="toc-entry sub"><span>7.4 Design system</span><span class="toc-dots"></span><span>50</span></div>
    <div class="toc-entry"><span><strong>Chapitre VIII — Présentation détaillée des modules</strong></span><span class="toc-dots"></span><span>52</span></div>
    <div class="toc-entry sub"><span>8.1 Tableau de bord</span><span class="toc-dots"></span><span>52</span></div>
    <div class="toc-entry sub"><span>8.2 Gestion des patients</span><span class="toc-dots"></span><span>54</span></div>
    <div class="toc-entry sub"><span>8.3 Gestion du personnel</span><span class="toc-dots"></span><span>56</span></div>
    <div class="toc-entry sub"><span>8.4 Rendez-vous et consultations</span><span class="toc-dots"></span><span>58</span></div>
    <div class="toc-entry sub"><span>8.5 Hospitalisation</span><span class="toc-dots"></span><span>60</span></div>
    <div class="toc-entry sub"><span>8.6 Laboratoire</span><span class="toc-dots"></span><span>62</span></div>
    <div class="toc-entry sub"><span>8.7 Pharmacie</span><span class="toc-dots"></span><span>64</span></div>
    <div class="toc-entry sub"><span>8.8 Facturation et tarification</span><span class="toc-dots"></span><span>66</span></div>
    <div class="toc-entry sub"><span>8.9 Urgences et ambulances</span><span class="toc-dots"></span><span>67</span></div>
    <div class="toc-entry sub"><span>8.10 Sécurité et paramètres</span><span class="toc-dots"></span><span>68</span></div>
    <div class="toc-entry sub"><span>8.11 Suivi des patients</span><span class="toc-dots"></span><span>69</span></div>
    <div class="toc-entry sub"><span>8.12 Morgue</span><span class="toc-dots"></span><span>70</span></div>
    <div class="toc-entry sub"><span>8.13 Prix des services et tarification</span><span class="toc-dots"></span><span>71</span></div>
    <div class="toc-entry sub"><span>8.14 Recherche globale</span><span class="toc-dots"></span><span>72</span></div>
    <div class="toc-entry sub"><span>8.15 Listes globales</span><span class="toc-dots"></span><span>73</span></div>
    <div class="toc-entry"><span><strong>Chapitre IX — Tests</strong></span><span class="toc-dots"></span><span>74</span></div>
    <div class="toc-entry sub"><span>9.1 Stratégie de test</span><span class="toc-dots"></span><span>74</span></div>
    <div class="toc-entry sub"><span>9.2 Cas de tests fonctionnels</span><span class="toc-dots"></span><span>75</span></div>
    <div class="toc-entry sub"><span>9.3 Matrice de traçabilité</span><span class="toc-dots"></span><span>76</span></div>
    <div class="toc-entry"><span><strong>Chapitre X — Sécurité</strong></span><span class="toc-dots"></span><span>77</span></div>
    <div class="toc-entry sub"><span>10.1 Validation des données</span><span class="toc-dots"></span><span>77</span></div>
    <div class="toc-entry sub"><span>10.2 Protection XSS</span><span class="toc-dots"></span><span>78</span></div>
    <div class="toc-entry sub"><span>10.3 Protection injection SQL</span><span class="toc-dots"></span><span>78</span></div>
    <div class="toc-entry sub"><span>10.4 Protection CSRF</span><span class="toc-dots"></span><span>78</span></div>
    <div class="toc-entry sub"><span>10.5 Gestion des rôles</span><span class="toc-dots"></span><span>78</span></div>
    <div class="toc-entry sub"><span>10.6 Journalisation</span><span class="toc-dots"></span><span>79</span></div>
    <div class="toc-entry sub"><span>10.7 Sauvegarde</span><span class="toc-dots"></span><span>79</span></div>
    <div class="toc-entry"><span><strong>Chapitre XI — Déploiement</strong></span><span class="toc-dots"></span><span>80</span></div>
    <div class="toc-entry sub"><span>11.1 Environnement de développement</span><span class="toc-dots"></span><span>80</span></div>
    <div class="toc-entry sub"><span>11.2 Build de production</span><span class="toc-dots"></span><span>80</span></div>
    <div class="toc-entry sub"><span>11.3 Déploiement statique</span><span class="toc-dots"></span><span>81</span></div>
    <div class="toc-entry sub"><span>11.4 Diagramme de déploiement</span><span class="toc-dots"></span><span>81</span></div>
    <div class="toc-entry sub"><span>11.5 Intégration continue</span><span class="toc-dots"></span><span>82</span></div>
    <div class="toc-entry"><span><strong>Conclusion générale</strong></span><span class="toc-dots"></span><span>83</span></div>
    <div class="toc-entry sub"><span>Perspectives d'évolution</span><span class="toc-dots"></span><span>84</span></div>
    <div class="toc-entry"><span><strong>Bibliographie</strong></span><span class="toc-dots"></span><span>85</span></div>
    <div class="toc-entry"><span><strong>Webographie</strong></span><span class="toc-dots"></span><span>86</span></div>
    <div class="toc-entry"><span><strong>Annexes</strong></span><span class="toc-dots"></span><span>87</span></div>
    <div class="toc-entry sub"><span>Annexe A — Liste complète des modules</span><span class="toc-dots"></span><span>87</span></div>
    <div class="toc-entry sub"><span>Annexe B — Scripts npm</span><span class="toc-dots"></span><span>88</span></div>
    <div class="toc-entry sub"><span>Annexe C — Captures d'écran supplémentaires</span><span class="toc-dots"></span><span>89</span></div>
    <div class="toc-entry sub"><span>Annexe D — Captures d'écran des nouveaux modules</span><span class="toc-dots"></span><span>94</span></div>
    <div class="toc-entry"><span><strong>Table des matières</strong></span><span class="toc-dots"></span><span>95</span></div>
  </div>
</body>
</html>"""

html = html.replace(old_annexes_end, new_annexes_end)

# 6. Update module count references from 26 to 29 in annexes table
html = html.replace(
    '<tr><td>26</td><td>Journal des activités</td><td>Sécurité</td><td>godie_activity</td></tr>\n    </table>',
    """    <tr><td>26</td><td>Journal des activités</td><td>Sécurité</td><td>godie_activity</td></tr>
      <tr><td>27</td><td>Suivi des patients</td><td>Patients &amp; Soins</td><td>godie_followups</td></tr>
      <tr><td>28</td><td>Morgue</td><td>Hospitalisation</td><td>godie_morgue</td></tr>
      <tr><td>29</td><td>Prix des services</td><td>Référentiels</td><td>godie_prices</td></tr>
    </table>"""
)

# 7. Update "trente" to "vingt-neuf" where appropriate (module count)
html = html.replace("trente modules fonctionnels", "vingt-neuf modules fonctionnels")
html = html.replace("trente modules", "vingt-neuf modules")
html = html.replace("trente modules intégrés", "vingt-neuf modules intégrés")

with open('memoire/memoire.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("memoire.html updated successfully")
print(f"New size: {len(html)} bytes")
