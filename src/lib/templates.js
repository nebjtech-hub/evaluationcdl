// Généré à partir des modèles Word du Centre Diagnostic de Libreville.
// Une seule source de vérité : la structure des formulaires vit ici,
// la base ne stocke que les réponses (JSON) et la clé du modèle.

export const CATEGORIES = {
  'fin-contrat': {
    label: 'Fin de contrat',
    description: "Grille de notation par critères, de 1 à 5",
    accent: 'teal',
  },
  questionnaire: {
    label: 'Questionnaire métier',
    description: '10 questions ouvertes et un cas pratique',
    accent: 'sky',
  },
  entretien: {
    label: "Grille d'entretien",
    description: "Questions par thème, cas pratiques et retranscription",
    accent: 'warn',
  },
};

export const TEMPLATES = [
  {
    "key": "fc-agent-entretien",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Agent d'Entretien",
    "service": "Services Généraux",
    "missions": [
      "Nettoyage et entretien quotidien des locaux (salles de consultation, couloirs, sanitaires, salle d'attente, bureaux)",
      "Désinfection des surfaces, équipements et zones à risque selon les protocoles d'hygiène en vigueur",
      "Gestion et approvisionnement des stocks de produits d'entretien et de consommables (savon, papier, sacs poubelles)",
      "Collecte, tri et évacuation des déchets selon les procédures de gestion des déchets médicaux et ménagers",
      "Entretien des espaces extérieurs (parking, entrée, abords du bâtiment) si applicable",
      "Signalement immédiat de toute anomalie constatée (dégradation, panne, fuite, nuisible)",
      "Respect strict des protocoles d'hygiène hospitalière et de lutte contre les infections nosocomiales",
      "Participation aux gardes et permanences selon le planning établi",
      "Utilisation correcte et entretien du matériel de nettoyage (chariots, serpillères, aspirateurs, autolaveuses)"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Nettoyage & Entretien Des Locaux",
        "criteres": [
          {
            "id": "c1",
            "label": "Qualité et propreté des locaux entretenus (sols, surfaces, vitres, sanitaires)"
          },
          {
            "id": "c2",
            "label": "Respect du planning et des fréquences de nettoyage par zone"
          },
          {
            "id": "c3",
            "label": "Maîtrise des techniques de nettoyage adaptées à chaque surface"
          },
          {
            "id": "c4",
            "label": "Efficacité et rapidité dans l'exécution des tâches"
          },
          {
            "id": "c5",
            "label": "Propreté et rangement du matériel après utilisation"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Désinfection & Hygiène Hospitalière",
        "criteres": [
          {
            "id": "c6",
            "label": "Respect des protocoles de désinfection des zones à risque (consultations, laboratoire, imagerie)"
          },
          {
            "id": "c7",
            "label": "Utilisation correcte des produits désinfectants (dosage, temps de contact)"
          },
          {
            "id": "c8",
            "label": "Respect des règles de prévention des infections nosocomiales"
          },
          {
            "id": "c9",
            "label": "Port correct des équipements de protection individuelle (gants, masque, tablier)"
          },
          {
            "id": "c10",
            "label": "Gestion correcte des déchets médicaux et ménagers (tri, étiquetage, évacuation)"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Gestion Des Stocks & Matériel",
        "criteres": [
          {
            "id": "c11",
            "label": "Suivi et gestion rigoureuse des stocks de produits d'entretien"
          },
          {
            "id": "c12",
            "label": "Utilisation économe et rationnelle des produits et consommables"
          },
          {
            "id": "c13",
            "label": "Entretien et bon état de conservation du matériel de nettoyage"
          },
          {
            "id": "c14",
            "label": "Signalement des ruptures de stock à temps"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Signalement & Communication",
        "criteres": [
          {
            "id": "c15",
            "label": "Signalement rapide des anomalies, pannes ou dégradations constatées"
          },
          {
            "id": "c16",
            "label": "Transmission des informations utiles à la hiérarchie"
          },
          {
            "id": "c17",
            "label": "Réactivité face aux demandes urgentes de nettoyage ou de désinfection"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Compétences Transversales",
        "criteres": [
          {
            "id": "c18",
            "label": "Ponctualité et assiduité (gardes, permanences, week-ends)"
          },
          {
            "id": "c19",
            "label": "Discrétion et respect de la confidentialité dans les locaux médicaux"
          },
          {
            "id": "c20",
            "label": "Esprit d'équipe et bonne collaboration avec les autres services"
          },
          {
            "id": "c21",
            "label": "Autonomie et sens de l'initiative dans l'organisation du travail"
          },
          {
            "id": "c22",
            "label": "Respect du règlement intérieur et des consignes de la hiérarchie"
          },
          {
            "id": "c23",
            "label": "Bonne tenue vestimentaire et respect des règles d'hygiène personnelle"
          }
        ]
      }
    ],
    "scoreMax": 115,
    "scoreMaxDocument": 120,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 46
      },
      {
        "label": "Satisfaisant",
        "min": 47,
        "max": 69
      },
      {
        "label": "Bien",
        "min": 70,
        "max": 92
      },
      {
        "label": "Excellent",
        "min": 93,
        "max": 115
      }
    ],
    "signatures": [
      "Le/La Responsable Services Généraux",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "fc-brancardier",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Brancardier / Aide-soignant",
    "service": "Soins / Brancardage",
    "missions": [
      "Transport et accompagnement des patients entre les différents services de l'établissement (accueil, consultations, imagerie, hospitalisation, bloc…)",
      "Installation confortable et sécurisée du patient sur le brancard ou fauteuil roulant",
      "Aide à la mobilisation et aux transferts des patients à mobilité réduite ou alités",
      "Vérification de l'identité du patient et du bon de transport avant chaque déplacement",
      "Transmission des informations pertinentes à l'équipe soignante à chaque prise en charge",
      "Entretien, nettoyage et désinfection du matériel de brancardage (brancards, fauteuils, civières)",
      "Respect des règles d'hygiène et de prévention des infections nosocomiales",
      "Participation aux gardes et permanences selon le planning établi",
      "Signalement immédiat de tout incident survenu lors du transport d'un patient",
      "Assistance aux équipes soignantes pour les soins de base si nécessaire"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Transport & Accompagnement Des Patients",
        "criteres": [
          {
            "id": "c1",
            "label": "Rapidité et efficacité dans la prise en charge et le transport des patients"
          },
          {
            "id": "c2",
            "label": "Vérification systématique de l'identité du patient avant chaque transport"
          },
          {
            "id": "c3",
            "label": "Installation correcte et sécurisée du patient sur le brancard / fauteuil"
          },
          {
            "id": "c4",
            "label": "Douceur et précaution lors des manipulations et transferts"
          },
          {
            "id": "c5",
            "label": "Respect du confort et de la dignité du patient tout au long du transport"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Sécurité & Prévention Des Risques",
        "criteres": [
          {
            "id": "c6",
            "label": "Respect des protocoles de sécurité lors des déplacements de patients"
          },
          {
            "id": "c7",
            "label": "Signalement immédiat de tout incident ou chute lors d'un transport"
          },
          {
            "id": "c8",
            "label": "Vigilance face aux risques de chute, de glissade ou de collision"
          },
          {
            "id": "c9",
            "label": "Respect des voies de circulation réservées au brancardage"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Hygiène & Entretien Du Matériel",
        "criteres": [
          {
            "id": "c10",
            "label": "Nettoyage et désinfection systématique du matériel après chaque utilisation"
          },
          {
            "id": "c11",
            "label": "Respect des protocoles d'hygiène et de prévention des infections"
          },
          {
            "id": "c12",
            "label": "Signalement des pannes ou dégradations du matériel de brancardage"
          },
          {
            "id": "c13",
            "label": "Bonne tenue vestimentaire et respect des règles d'hygiène personnelle"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Relation Patient & Communication",
        "criteres": [
          {
            "id": "c14",
            "label": "Qualité de l'accueil et de la communication avec le patient"
          },
          {
            "id": "c15",
            "label": "Capacité à rassurer et à mettre à l'aise le patient pendant le transport"
          },
          {
            "id": "c16",
            "label": "Transmission correcte des informations à l'équipe soignante à chaque prise en charge"
          },
          {
            "id": "c17",
            "label": "Respect de la confidentialité des informations médicales du patient"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Compétences Transversales",
        "criteres": [
          {
            "id": "c18",
            "label": "Ponctualité et assiduité (gardes, nuits, week-ends)"
          },
          {
            "id": "c19",
            "label": "Esprit d'équipe et collaboration avec les soignants et les autres services"
          },
          {
            "id": "c20",
            "label": "Réactivité et disponibilité face aux demandes urgentes"
          },
          {
            "id": "c21",
            "label": "Autonomie et sens des responsabilités"
          },
          {
            "id": "c22",
            "label": "Respect du règlement intérieur et des consignes de la hiérarchie"
          }
        ]
      }
    ],
    "scoreMax": 110,
    "scoreMaxDocument": 115,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 44
      },
      {
        "label": "Satisfaisant",
        "min": 45,
        "max": 66
      },
      {
        "label": "Bien",
        "min": 67,
        "max": 88
      },
      {
        "label": "Excellent",
        "min": 89,
        "max": 110
      }
    ],
    "signatures": [
      "Le/La Responsable du Service",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "fc-cuisiniere",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Cuisinière / Agent de Restauration",
    "service": "Restauration",
    "missions": [
      "Préparation et confection des repas pour les patients hospitalisés, le personnel et les visiteurs selon les menus établis",
      "Respect des régim es alimentaires prescrits par les médecins (diabétique, sans sel, hyposodé, mixé, etc.)",
      "Réception, contrôle et stockage des denrées alimentaires dans le respect de la chaîne du froid",
      "Respect strict des normes HACCP et des règles d'hygiène alimentaire en vigueur",
      "Nettoyage et désinfection quotidienne de la cuisine, des équipements et des ustensiles",
      "Gestion et suivi des stocks alimentaires ; signalement des ruptures et des produits périmés",
      "Distribution des repas dans les délais impartis selon le planning des services",
      "Participation à l'élaboration des menus en lien avec les recommandations médicales et nutritionnelles",
      "Gestion des déchets alimentaires dans le respect des procédures en vigueur",
      "Entretien et signalement de toute panne ou dysfonctionnement du matériel de cuisine"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Qualité Culinaire & Préparation Des Repas",
        "criteres": [
          {
            "id": "c1",
            "label": "Qualité gustative et présentation des repas servis"
          },
          {
            "id": "c2",
            "label": "Respect scrupuleux des menus et des quantités établis"
          },
          {
            "id": "c3",
            "label": "Maîtrise des régimes alimentaires spécifiques prescrits (diabétique, sans sel, mixé, etc.)"
          },
          {
            "id": "c4",
            "label": "Adaptation des préparations aux besoins nutritionnels des patients hospitalisés"
          },
          {
            "id": "c5",
            "label": "Régularité et constance dans la qualité des repas produits"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Hygiène & Sécurité Alimentaire (Normes Haccp)",
        "criteres": [
          {
            "id": "c6",
            "label": "Respect des règles d'hygiène personnelle (tenue, gants, charlotte, lavage des mains)"
          },
          {
            "id": "c7",
            "label": "Respect de la chaîne du froid et des températures de conservation"
          },
          {
            "id": "c8",
            "label": "Nettoyage et désinfection rigoureuse de la cuisine et des équipements"
          },
          {
            "id": "c9",
            "label": "Vérification des dates de péremption et gestion des produits alimentaires"
          },
          {
            "id": "c10",
            "label": "Respect des procédures HACCP et des protocoles de sécurité alimentaire"
          },
          {
            "id": "c11",
            "label": "Gestion correcte des déchets alimentaires"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Gestion Des Stocks & Approvisionnement",
        "criteres": [
          {
            "id": "c12",
            "label": "Réception et contrôle rigoureux des denrées à la livraison"
          },
          {
            "id": "c13",
            "label": "Tenue correcte et à jour des stocks alimentaires"
          },
          {
            "id": "c14",
            "label": "Signalement anticipé des ruptures de stock et des besoins en réapprovisionnement"
          },
          {
            "id": "c15",
            "label": "Utilisation économe et rationnelle des denrées pour limiter le gaspillage"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Respect Des Délais & Organisation",
        "criteres": [
          {
            "id": "c16",
            "label": "Respect des horaires de préparation et de distribution des repas"
          },
          {
            "id": "c17",
            "label": "Organisation efficace du poste de travail avant, pendant et après le service"
          },
          {
            "id": "c18",
            "label": "Réactivité face aux demandes spéciales ou urgentes"
          },
          {
            "id": "c19",
            "label": "Anticipation et planification des préparations selon le nombre de convives"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Compétences Transversales",
        "criteres": [
          {
            "id": "c20",
            "label": "Ponctualité et assiduité (respect des horaires de service)"
          },
          {
            "id": "c21",
            "label": "Esprit d'équipe et collaboration avec les autres agents de restauration"
          },
          {
            "id": "c22",
            "label": "Discrétion et respect de la confidentialité dans les espaces médicaux traversés"
          },
          {
            "id": "c23",
            "label": "Entretien et signalement des pannes du matériel de cuisine"
          },
          {
            "id": "c24",
            "label": "Respect du règlement intérieur et des consignes de la hiérarchie"
          }
        ]
      }
    ],
    "scoreMax": 120,
    "scoreMaxDocument": 135,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 48
      },
      {
        "label": "Satisfaisant",
        "min": 49,
        "max": 72
      },
      {
        "label": "Bien",
        "min": 73,
        "max": 96
      },
      {
        "label": "Excellent",
        "min": 97,
        "max": 120
      }
    ],
    "signatures": [
      "Le/La Responsable Services Généraux",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "fc-infirmier-hospitalisation",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Infirmier(ère) Hospitalisation",
    "service": "Hospitalisation",
    "missions": [
      "Prise en charge globale des patients hospitalisés : accueil, installation, surveillance clinique continue",
      "Réalisation des soins infirmiers prescrits : injections IV/IM/SC, perfusions, pansements, sondages, prélèvements",
      "Administration des médicaments dans le strict respect des prescriptions médicales et de la règle des 5B",
      "Surveillance et suivi des paramètres vitaux (tension, pouls, température, saturation, glycémie) et transmission des résultats au médecin",
      "Rédaction rigoureuse des transmissions infirmières et des dossiers de soins des patients",
      "Préparation et participation aux visites médicales ; transmission des observations au médecin",
      "Gestion des urgences et des situations critiques au sein du service d'hospitalisation",
      "Application des protocoles d'hygiène et de prévention des infections associées aux soins (IAS)",
      "Éducation thérapeutique des patients et de leur entourage",
      "Participation aux transmissions orales et écrites lors des relèves de poste",
      "Gestion et traçabilité des stupéfiants et des médicaments à risque",
      "Participation aux gardes, astreintes et permanences de soins selon le planning établi"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Réalisation Des Soins Infirmiers",
        "criteres": [
          {
            "id": "c1",
            "label": "Maîtrise technique des soins : injections, perfusions, pansements, sondages"
          },
          {
            "id": "c2",
            "label": "Respect strict de la prescription médicale et de la règle des 5B"
          },
          {
            "id": "c3",
            "label": "Administration sécurisée des médicaments (dosage, voie, horaire, traçabilité)"
          },
          {
            "id": "c4",
            "label": "Précision et efficacité dans la réalisation des prélèvements"
          },
          {
            "id": "c5",
            "label": "Gestion et traçabilité des stupéfiants et médicaments à risque"
          },
          {
            "id": "c6",
            "label": "Réactivité et maîtrise dans la gestion des urgences au sein du service"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Surveillance & Suivi Clinique Des Patients",
        "criteres": [
          {
            "id": "c7",
            "label": "Rigueur dans la surveillance des paramètres vitaux et détection des anomalies"
          },
          {
            "id": "c8",
            "label": "Capacité à évaluer l'état clinique d'un patient et à alerter le médecin à temps"
          },
          {
            "id": "c9",
            "label": "Qualité des transmissions écrites dans le dossier de soins"
          },
          {
            "id": "c10",
            "label": "Qualité des transmissions orales lors des relèves de poste"
          },
          {
            "id": "c11",
            "label": "Participation active et préparation aux visites médicales"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Hygiène & Prévention Des Infections Associées Aux Soins",
        "criteres": [
          {
            "id": "c12",
            "label": "Respect rigoureux des règles d'hygiène des mains (SHA, lavage)"
          },
          {
            "id": "c13",
            "label": "Port correct des équipements de protection individuelle (gants, masque, surblouse)"
          },
          {
            "id": "c14",
            "label": "Application des précautions standard et complémentaires"
          },
          {
            "id": "c15",
            "label": "Entretien et désinfection du matériel et de l'environnement patient"
          },
          {
            "id": "c16",
            "label": "Respect des procédures de gestion des déchets à risque infectieux (DASRI)"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Relation Patient, Famille & Éducation Thérapeutique",
        "criteres": [
          {
            "id": "c17",
            "label": "Qualité de l'accueil et de la communication avec le patient hospitalisé"
          },
          {
            "id": "c18",
            "label": "Respect de la dignité, de la pudeur et de l'intimité du patient"
          },
          {
            "id": "c19",
            "label": "Accompagnement psychologique et soutien du patient et de sa famille"
          },
          {
            "id": "c20",
            "label": "Qualité de l'éducation thérapeutique dispensée au patient"
          },
          {
            "id": "c21",
            "label": "Gestion des situations conflictuelles avec les patients ou les familles"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Travail En Équipe & Organisation Du Service",
        "criteres": [
          {
            "id": "c22",
            "label": "Collaboration efficace avec les médecins, aides-soignants et autres infirmiers"
          },
          {
            "id": "c23",
            "label": "Organisation rigoureuse du poste de travail et gestion des priorités"
          },
          {
            "id": "c24",
            "label": "Participation active aux projets de service et aux réunions d'équipe"
          },
          {
            "id": "c25",
            "label": "Encadrement et soutien des stagiaires et nouveaux agents si applicable"
          }
        ]
      },
      {
        "code": "F",
        "titre": "Compétences Transversales",
        "criteres": [
          {
            "id": "c26",
            "label": "Ponctualité et assiduité (gardes, nuits, week-ends, astreintes)"
          },
          {
            "id": "c27",
            "label": "Respect du secret professionnel et de la confidentialité patient"
          },
          {
            "id": "c28",
            "label": "Autonomie, sens des responsabilités et initiative"
          },
          {
            "id": "c29",
            "label": "Capacité d'adaptation face aux situations imprévues et aux urgences"
          },
          {
            "id": "c30",
            "label": "Respect du règlement intérieur et des protocoles de l'établissement"
          }
        ]
      }
    ],
    "scoreMax": 150,
    "scoreMaxDocument": 155,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 60
      },
      {
        "label": "Satisfaisant",
        "min": 61,
        "max": 90
      },
      {
        "label": "Bien",
        "min": 91,
        "max": 120
      },
      {
        "label": "Excellent",
        "min": 121,
        "max": 150
      }
    ],
    "signatures": [
      "Le Médecin du Service",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "fc-infirmier-urgences",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Infirmier(ère) des Urgences",
    "service": "Service des Urgences",
    "missions": [
      "Accueil, tri et évaluation de l'état clinique des patients à leur arrivée aux urgences (triage infirmier)",
      "Prise en charge rapide des détresses vitales : détresses respiratoires, états de choc, arrêts cardio-respiratoires",
      "Réalisation des soins infirmiers d'urgence : voie veineuse périphérique, injections, pansements d'urgence, sondages",
      "Administration des traitements prescrits en situation d'urgence dans le respect des protocoles",
      "Surveillance continue des patients au box, en salle de déchoquage et en soins continus",
      "Réalisation des examens paracliniques de première intention : ECG, glycémie capillaire, prélèvements",
      "Participation aux gestes d'urgence en binôme avec le médecin (réanimation, intubation, drainage)",
      "Rédaction des transmissions infirmières et tenue du dossier patient aux urgences",
      "Coordination avec les services d'aval pour les transferts et hospitalisations",
      "Gestion du matériel d'urgence : vérification quotidienne du chariot d'urgence et du défibrillateur",
      "Application des précautions d'hygiène et de prévention des infections en contexte d'urgence",
      "Participation aux gardes, nuits, week-ends et jours fériés selon le planning"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Triage & Évaluation Initiale Des Patients",
        "criteres": [
          {
            "id": "c1",
            "label": "Rapidité et pertinence du triage à l'accueil des urgences"
          },
          {
            "id": "c2",
            "label": "Capacité à identifier et prioriser les urgences vitales"
          },
          {
            "id": "c3",
            "label": "Qualité de l'évaluation clinique initiale (paramètres vitaux, signes d'alerte)"
          },
          {
            "id": "c4",
            "label": "Pertinence des décisions de triage (box, déchoquage, soins continus)"
          },
          {
            "id": "c5",
            "label": "Communication claire avec le patient et la famille lors du triage"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Gestion Des Urgences Vitales & Détresses",
        "criteres": [
          {
            "id": "c6",
            "label": "Maîtrise des gestes d'urgence : RCP, défibrillation, gestion des voies aériennes"
          },
          {
            "id": "c7",
            "label": "Réactivité et efficacité en salle de déchoquage"
          },
          {
            "id": "c8",
            "label": "Gestion des détresses respiratoires (oxygénothérapie, ventilation au masque)"
          },
          {
            "id": "c9",
            "label": "Prise en charge des états de choc (voie veineuse, remplissage, surveillance)"
          },
          {
            "id": "c10",
            "label": "Participation active et efficace aux gestes en binôme avec le médecin"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Soins Infirmiers D'Urgence",
        "criteres": [
          {
            "id": "c11",
            "label": "Maîtrise et rapidité de la pose de voie veineuse périphérique"
          },
          {
            "id": "c12",
            "label": "Administration sécurisée et rapide des traitements prescrits"
          },
          {
            "id": "c13",
            "label": "Réalisation correcte des ECG, prélèvements et examens paracliniques d'urgence"
          },
          {
            "id": "c14",
            "label": "Réalisation des pansements d'urgence et sutures assistées"
          },
          {
            "id": "c15",
            "label": "Vérification quotidienne et réapprovisionnement du chariot d'urgence"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Surveillance Continue & Transmissions",
        "criteres": [
          {
            "id": "c16",
            "label": "Surveillance rigoureuse des patients (box, soins continus, déchoquage)"
          },
          {
            "id": "c17",
            "label": "Détection rapide des aggravations et alerte immédiate du médecin"
          },
          {
            "id": "c18",
            "label": "Qualité et exhaustivité des transmissions écrites dans le dossier patient"
          },
          {
            "id": "c19",
            "label": "Qualité des transmissions orales lors des relèves de poste"
          },
          {
            "id": "c20",
            "label": "Coordination efficace avec les services d'aval pour les transferts"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Hygiène & Prévention Des Infections En Urgence",
        "criteres": [
          {
            "id": "c21",
            "label": "Respect de l'hygiène des mains malgré le rythme soutenu des urgences"
          },
          {
            "id": "c22",
            "label": "Port correct des EPI selon le type de prise en charge"
          },
          {
            "id": "c23",
            "label": "Désinfection du matériel et des espaces entre chaque patient"
          },
          {
            "id": "c24",
            "label": "Gestion correcte des DASRI et des déchets à risque"
          }
        ]
      },
      {
        "code": "F",
        "titre": "Compétences Transversales",
        "criteres": [
          {
            "id": "c25",
            "label": "Gestion du stress et maîtrise de soi en situation d'urgence"
          },
          {
            "id": "c26",
            "label": "Ponctualité et assiduité (gardes, nuits, week-ends, jours fériés)"
          },
          {
            "id": "c27",
            "label": "Esprit d'équipe et coordination avec les collègues et le médecin urgentiste"
          },
          {
            "id": "c28",
            "label": "Autonomie et prise d'initiative dans les situations critiques"
          },
          {
            "id": "c29",
            "label": "Respect du secret professionnel et de la dignité du patient"
          },
          {
            "id": "c30",
            "label": "Capacité d'adaptation face aux pics d'activité et aux situations imprévues"
          }
        ]
      }
    ],
    "scoreMax": 150,
    "scoreMaxDocument": 155,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 60
      },
      {
        "label": "Satisfaisant",
        "min": 61,
        "max": 90
      },
      {
        "label": "Bien",
        "min": 91,
        "max": 120
      },
      {
        "label": "Excellent",
        "min": 121,
        "max": 150
      }
    ],
    "signatures": [
      "Le/La Médecin Urgentiste Responsable",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "fc-responsable-achats-stock",
    "categorie": "fin-contrat",
    "titre": "Évaluation de fin de contrat",
    "poste": "Responsable Achats & Stock",
    "service": "Achats & Logistique",
    "missions": [
      "Planification et exécution des achats de fournitures médicales, consommables, médicaments et équipements selon les besoins exprimés par les services",
      "Prospection, évaluation et sélection des fournisseurs ; négociation des prix, délais et conditions de paiement",
      "Gestion des bons de commande, suivi des livraisons et contrôle de la conformité des produits réceptionnés",
      "Tenue et mise à jour rigoureuse des stocks (entrées, sorties, inventaires périodiques)",
      "Suivi des niveaux de stock et déclenchement des commandes en fonction des seuils d'alerte",
      "Prévention des ruptures de stock critiques pouvant impacter la continuité des soins",
      "Gestion et archivage des documents d'achat (bons de commande, factures, bons de livraison, contrats fournisseurs)",
      "Suivi du budget achats et reporting mensuel à la direction financière",
      "Mise en place et amélioration des procédures d'achat et de gestion des stocks",
      "Coordination avec les services utilisateurs pour anticiper les besoins et optimiser les délais d'approvisionnement"
    ],
    "sections": [
      {
        "code": "A",
        "titre": "Achats & Approvisionnement",
        "criteres": [
          {
            "id": "c1",
            "label": "Anticipation des besoins et planification rigoureuse des commandes"
          },
          {
            "id": "c2",
            "label": "Qualité de la prospection et de l'évaluation des fournisseurs"
          },
          {
            "id": "c3",
            "label": "Capacité à négocier les meilleures conditions (prix, délais, qualité)"
          },
          {
            "id": "c4",
            "label": "Exactitude et rigueur dans la rédaction des bons de commande"
          },
          {
            "id": "c5",
            "label": "Suivi efficace des livraisons et gestion des litiges fournisseurs"
          },
          {
            "id": "c6",
            "label": "Contrôle de conformité des produits réceptionnés (quantité, qualité)"
          }
        ]
      },
      {
        "code": "B",
        "titre": "Gestion Des Stocks & Inventaires",
        "criteres": [
          {
            "id": "c7",
            "label": "Tenue rigoureuse et à jour des registres de stock (entrées/sorties)"
          },
          {
            "id": "c8",
            "label": "Mise en place et respect des seuils d'alerte et de réapprovisionnement"
          },
          {
            "id": "c9",
            "label": "Prévention des ruptures de stock sur les produits critiques"
          },
          {
            "id": "c10",
            "label": "Prévention des surstocks et des produits périmés"
          },
          {
            "id": "c11",
            "label": "Réalisation régulière des inventaires physiques"
          },
          {
            "id": "c12",
            "label": "Fiabilité et exactitude des données de stock"
          }
        ]
      },
      {
        "code": "C",
        "titre": "Gestion Budgétaire & Reporting",
        "criteres": [
          {
            "id": "c13",
            "label": "Respect du budget achats alloué sur la période"
          },
          {
            "id": "c14",
            "label": "Qualité et régularité du reporting mensuel des achats à la direction"
          },
          {
            "id": "c15",
            "label": "Capacité à identifier et proposer des pistes d'économies"
          },
          {
            "id": "c16",
            "label": "Archivage rigoureux des documents d'achat (factures, BL, contrats)"
          },
          {
            "id": "c17",
            "label": "Traçabilité complète des opérations d'achat et de stock"
          }
        ]
      },
      {
        "code": "D",
        "titre": "Coordination & Communication Interne",
        "criteres": [
          {
            "id": "c18",
            "label": "Qualité de la coordination avec les services utilisateurs pour anticiper les besoins"
          },
          {
            "id": "c19",
            "label": "Réactivité face aux demandes urgentes des services"
          },
          {
            "id": "c20",
            "label": "Communication claire et proactive avec la direction et les fournisseurs"
          },
          {
            "id": "c21",
            "label": "Capacité à alerter la hiérarchie en cas de risque de rupture ou de dépassement budgétaire"
          }
        ]
      },
      {
        "code": "E",
        "titre": "Compétences Managériales & Transversales",
        "criteres": [
          {
            "id": "c22",
            "label": "Organisation personnelle et gestion des priorités"
          },
          {
            "id": "c23",
            "label": "Rigueur, fiabilité et sens du détail dans l'exécution des tâches"
          },
          {
            "id": "c24",
            "label": "Force de proposition et sens de l'amélioration continue"
          },
          {
            "id": "c25",
            "label": "Maîtrise des outils informatiques (Excel, logiciels de gestion des stocks)"
          },
          {
            "id": "c26",
            "label": "Respect des procédures internes et de la réglementation applicable"
          },
          {
            "id": "c27",
            "label": "Discrétion et respect de la confidentialité des informations financières"
          }
        ]
      }
    ],
    "scoreMax": 135,
    "scoreMaxDocument": 145,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 54
      },
      {
        "label": "Satisfaisant",
        "min": 55,
        "max": 81
      },
      {
        "label": "Bien",
        "min": 82,
        "max": 108
      },
      {
        "label": "Excellent",
        "min": 109,
        "max": 135
      }
    ],
    "signatures": [
      "La Direction Financière / Direction Générale",
      "L'Agent Évalué(e)",
      "Le/La Responsable RH"
    ]
  },
  {
    "key": "q-agent-entretien",
    "categorie": "questionnaire",
    "titre": "Questionnaire d'évaluation",
    "poste": "Agent d'Entretien / Agent de Nettoyage",
    "service": "Services Généraux",
    "instructions": "Répondez clairement à chaque question en vous appuyant sur des exemples concrets. Durée indicative : 30 minutes.",
    "questions": [
      {
        "id": "q1",
        "num": 1,
        "texte": "Décrivez l'ordre et la méthode que vous suivez pour nettoyer une salle de consultation médicale entre deux patients. Quels produits utilisez-vous et pourquoi ?",
        "bareme": 10
      },
      {
        "id": "q2",
        "num": 2,
        "texte": "Quelle est la différence entre nettoyer et désinfecter une surface ? Dans quels cas faut-il impérativement désinfecter en plus de nettoyer ?",
        "bareme": 10
      },
      {
        "id": "q3",
        "num": 3,
        "texte": "Comment nettoyez-vous et désinfectez-vous les sanitaires (toilettes, lavabos, sols) ? À quelle fréquence et avec quels produits ?",
        "bareme": 10
      },
      {
        "id": "q4",
        "num": 4,
        "texte": "Quelles précautions portez-vous obligatoirement lors de vos interventions de nettoyage (tenue, équipements de protection) et pourquoi sont-ils importants dans un établissement médical ?",
        "bareme": 10
      },
      {
        "id": "q5",
        "num": 5,
        "texte": "Comment gérez-vous les déchets au Centre Diagnostic ? Expliquez la différence entre les déchets ménagers ordinaires et les déchets médicaux à risque infectieux (DASRI).",
        "bareme": 10
      },
      {
        "id": "q6",
        "num": 6,
        "texte": "Vous constatez qu'un produit d'entretien est presque épuisé. Quelle est votre démarche ? À qui le signalez-vous et comment ?",
        "bareme": 10
      },
      {
        "id": "q7",
        "num": 7,
        "texte": "Vous nettoyez un couloir et vous trouvez du sang sur le sol suite à un soin. Quelle est votre procédure de nettoyage et de désinfection spécifique à cette situation ?",
        "bareme": 10
      },
      {
        "id": "q8",
        "num": 8,
        "texte": "Comment organisez-vous votre travail pour respecter le planning de nettoyage de tous les espaces qui vous sont confiés dans la journée ?",
        "bareme": 10
      },
      {
        "id": "q9",
        "num": 9,
        "texte": "Vous constatez une fuite d'eau dans une salle de soins, une ampoule grillée dans un couloir et une poignée de porte cassée. Que faites-vous ?",
        "bareme": 10
      },
      {
        "id": "q10",
        "num": 10,
        "texte": "Quelles règles de discrétion et de comportement appliquez-vous lorsque vous nettoyez des espaces où se trouvent des patients ou du personnel médical ?",
        "bareme": 10
      }
    ],
    "casPratique": {
      "situation": [
        "Il est 07h00. Vous prenez votre poste. Votre responsable vous remet le planning du matin. En arrivant, vous constatez les situations suivantes :",
        "La salle de consultation 3 a été utilisée toute la nuit pour une urgence. Il y a du matériel médical usagé sur le plan de travail, des gants et compresses souillés dans la poubelle ordinaire, et des taches de sang sur le sol.",
        "Les toilettes du hall d'accueil sont dans un état très dégradé : sol mouillé, papier hygiénique épuisé, lavabo encrassé. Des patients attendent déjà dans la salle d'attente.",
        "Votre collègue habituel est absent ce matin. Vous devez donc couvrir ses zones en plus des vôtres.",
        "En nettoyant le couloir du 1er étage, vous glissez sur une flaque d'eau non signalée et vous manquez de tomber. Vous constatez que la signalétique de sol mouillé a disparu."
      ],
      "questions": [
        {
          "id": "cp1",
          "num": 1,
          "texte": "Établissez votre ordre de priorité pour gérer ces 4 situations ce matin. Justifiez vos choix."
        },
        {
          "id": "cp2",
          "num": 2,
          "texte": "Décrivez précisément la procédure que vous appliquez pour nettoyer et désinfecter la salle de consultation 3. Que faites-vous des compresses et gants souillés dans la poubelle ordinaire ?"
        },
        {
          "id": "cp3",
          "num": 3,
          "texte": "Comment intervenez-vous sur les toilettes du hall d'accueil en présence de patients dans la salle d'attente ? Quelles précautions prenez-vous ?"
        },
        {
          "id": "cp4",
          "num": 4,
          "texte": "Comment organisez-vous votre planning pour couvrir les zones de votre collègue absent en plus des vôtres, sans négliger la qualité du nettoyage ?"
        },
        {
          "id": "cp5",
          "num": 5,
          "texte": "Concernant la flaque d'eau et la signalétique manquante, quelles actions immédiates prenez-vous et à qui signalez-vous l'incident ?"
        }
      ],
      "bareme": 40
    },
    "scoreMax": 140,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 56
      },
      {
        "label": "Satisfaisant",
        "min": 57,
        "max": 84
      },
      {
        "label": "Bien",
        "min": 85,
        "max": 112
      },
      {
        "label": "Excellent",
        "min": 113,
        "max": 140
      }
    ],
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  },
  {
    "key": "q-brancardier",
    "categorie": "questionnaire",
    "titre": "Questionnaire d'évaluation",
    "poste": "Brancardier / Aide-soignant",
    "service": "Soins / Brancardage",
    "instructions": "Répondez clairement à chaque question en vous appuyant sur des exemples concrets. Durée indicative : 30 minutes.",
    "questions": [
      {
        "id": "q1",
        "num": 1,
        "texte": "Décrivez les étapes que vous suivez systématiquement avant de transporter un patient d'un service à un autre.",
        "bareme": 10
      },
      {
        "id": "q2",
        "num": 2,
        "texte": "Comment procédez-vous pour installer un patient à mobilité réduite sur un brancard ou un fauteuil roulant en toute sécurité ?",
        "bareme": 10
      },
      {
        "id": "q3",
        "num": 3,
        "texte": "Quelles sont les règles de sécurité que vous respectez lors du transport d'un patient dans les couloirs ou les ascenseurs ?",
        "bareme": 10
      },
      {
        "id": "q4",
        "num": 4,
        "texte": "Que faites-vous si, lors d'un transport, le patient présente un changement d'état (malaise, perte de connaissance) ?",
        "bareme": 10
      },
      {
        "id": "q5",
        "num": 5,
        "texte": "Comment nettoyez-vous et désinfectez-vous votre matériel de brancardage après chaque utilisation ?",
        "bareme": 10
      },
      {
        "id": "q6",
        "num": 6,
        "texte": "Quels signes vous alertent sur la nécessité de signaler une panne ou dégradation du matériel, et à qui le signalez-vous ?",
        "bareme": 10
      },
      {
        "id": "q7",
        "num": 7,
        "texte": "Comment rassurez-vous un patient anxieux ou agité lors de son transport ?",
        "bareme": 10
      },
      {
        "id": "q8",
        "num": 8,
        "texte": "Décrivez une situation difficile vécue avec un patient ou un soignant et comment vous l'avez gérée.",
        "bareme": 10
      },
      {
        "id": "q9",
        "num": 9,
        "texte": "Comment priorisez-vous lorsque plusieurs demandes de transport arrivent en même temps ?",
        "bareme": 10
      },
      {
        "id": "q10",
        "num": 10,
        "texte": "Que faites-vous si le patient transporté ne correspond pas au bon de transport reçu ?",
        "bareme": 10
      }
    ],
    "casPratique": {
      "situation": [
        "Il est 9h00. Vous venez de prendre votre poste. Votre responsable vous remet les demandes suivantes :",
        "Madame A, 78 ans, doit être transportée en fauteuil roulant vers l'imagerie pour un scanner. Elle est sous perfusion.",
        "Monsieur B vient d'arriver à l'accueil, doit être conduit en consultation, mais refuse le fauteuil et devient agité.",
        "Une infirmière signale en urgence qu'un patient au 2ème étage doit descendre immédiatement au bloc opératoire.",
        "En arrivant chercher Madame A, vous constatez que le brancard n'a pas été nettoyé par l'équipe précédente."
      ],
      "questions": [
        {
          "id": "cp1",
          "num": 1,
          "texte": "Établissez votre ordre de priorité pour les 4 situations et justifiez vos choix."
        },
        {
          "id": "cp2",
          "num": 2,
          "texte": "Comment gérez-vous le transport de Madame A sous perfusion ? Quelles précautions prenez-vous ?"
        },
        {
          "id": "cp3",
          "num": 3,
          "texte": "Comment réagissez-vous face à Monsieur B qui refuse le fauteuil et devient agité ?"
        },
        {
          "id": "cp4",
          "num": 4,
          "texte": "Que faites-vous concernant le brancard non nettoyé avant de transporter Madame A ?"
        }
      ],
      "bareme": 40
    },
    "scoreMax": 140,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 56
      },
      {
        "label": "Satisfaisant",
        "min": 57,
        "max": 84
      },
      {
        "label": "Bien",
        "min": 85,
        "max": 112
      },
      {
        "label": "Excellent",
        "min": 113,
        "max": 140
      }
    ],
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  },
  {
    "key": "q-infirmier-hospitalisation",
    "categorie": "questionnaire",
    "titre": "Questionnaire d'évaluation",
    "poste": "Infirmier(ère) — Service Hospitalisation",
    "service": "Hospitalisation",
    "instructions": "Répondez clairement à chaque question en vous appuyant sur des exemples concrets. Durée indicative : 30 minutes.",
    "questions": [
      {
        "id": "q1",
        "num": 1,
        "texte": "Décrivez votre prise en charge à l'arrivée d'un nouveau patient hospitalisé. Quelles informations recueillez-vous et quels soins initiaux réalisez-vous en priorité ?",
        "bareme": 10
      },
      {
        "id": "q2",
        "num": 2,
        "texte": "Comment vérifiez-vous et administrez-vous un traitement médicamenteux prescrit ? Décrivez la règle des 5B et comment vous l'appliquez concrètement.",
        "bareme": 10
      },
      {
        "id": "q3",
        "num": 3,
        "texte": "Un patient hospitalisé présente une tension artérielle à 80/50 mmHg, une fréquence cardiaque à 120/min et se plaint de vertiges. Quelle est votre conduite à tenir avant l'arrivée du médecin ?",
        "bareme": 10
      },
      {
        "id": "q4",
        "num": 4,
        "texte": "Comment rédigez-vous une transmission infirmière dans le dossier de soins ? Quels éléments sont indispensables à y faire figurer ?",
        "bareme": 10
      },
      {
        "id": "q5",
        "num": 5,
        "texte": "Quelles sont vos responsabilités concernant la gestion et la traçabilité des stupéfiants et des médicaments à risque dans le service d'hospitalisation ?",
        "bareme": 10
      },
      {
        "id": "q6",
        "num": 6,
        "texte": "Comment organisez-vous et animez-vous une relève de poste efficace ? Quelles informations transmettez-vous systématiquement à l'équipe suivante ?",
        "bareme": 10
      },
      {
        "id": "q7",
        "num": 7,
        "texte": "Un patient hospitalisé refuse catégoriquement les soins prescrits par le médecin. Comment gérez-vous cette situation sur le plan infirmier et éthique ?",
        "bareme": 10
      },
      {
        "id": "q8",
        "num": 8,
        "texte": "Décrivez les précautions que vous appliquez pour prévenir les infections associées aux soins (IAS) lors de la réalisation d'une perfusion intraveineuse.",
        "bareme": 10
      },
      {
        "id": "q9",
        "num": 9,
        "texte": "Comment accompagnez-vous un patient et sa famille face à l'annonce d'un diagnostic grave ou d'une situation difficile ?",
        "bareme": 10
      },
      {
        "id": "q10",
        "num": 10,
        "texte": "Un patient hospitalisé chute de son lit durant votre garde. Décrivez toutes les étapes de votre prise en charge et la procédure de signalement à suivre.",
        "bareme": 10
      }
    ],
    "casPratique": {
      "situation": [
        "Il est 06h00 du matin. Vous prenez votre poste de garde au service d'hospitalisation. Lors de la relève, vous héritez des situations suivantes :",
        "Monsieur A, 68 ans, hospitalisé pour insuffisance cardiaque décompensée. Il est sous perfusion de furosémide IV. Son bilan de la nuit indique une diurèse de 200 ml en 8 heures (objectif fixé : 500 ml minimum). Sa saturation est à 91% et il se dit essoufflé.",
        "Madame B, 45 ans, post-opératoire J1 d'une appendicectomie. Elle se plaint d'une douleur à 8/10 malgré l'antalgique administré à 04h00. Vous constatez que son pansement présente un suintement brunâtre.",
        "Monsieur C, 30 ans, hospitalisé pour crise drépanocytaire. Il est très agité, réclame de la morphine en dehors des horaires prévus et menace de partir contre avis médical.",
        "La distribution des médicaments du matin doit être faite pour 8 patients d'ici 07h30."
      ],
      "questions": [
        {
          "id": "cp1",
          "num": 1,
          "texte": "Établissez votre ordre de priorité pour gérer ces situations simultanément. Justifiez clairement votre raisonnement clinique."
        },
        {
          "id": "cp2",
          "num": 2,
          "texte": "Concernant Monsieur A, quelles actions infirmières réalisez-vous immédiatement et quelles informations transmettez-vous en urgence au médecin ?"
        },
        {
          "id": "cp3",
          "num": 3,
          "texte": "Comment prenez-vous en charge Madame B ? Que signifie cliniquement ce suintement et quelle est votre démarche concernant la douleur non soulagée ?"
        },
        {
          "id": "cp4",
          "num": 4,
          "texte": "Comment gérez-vous la situation de Monsieur C qui réclame de la morphine hors protocole et menace de partir contre avis médical ?"
        },
        {
          "id": "cp5",
          "num": 5,
          "texte": "Comment organisez-vous la distribution des médicaments des 8 patients en parallèle des urgences décrites ci-dessus ? Quelles précautions prenez-vous ?"
        }
      ],
      "bareme": 40
    },
    "scoreMax": 140,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 56
      },
      {
        "label": "Satisfaisant",
        "min": 57,
        "max": 84
      },
      {
        "label": "Bien",
        "min": 85,
        "max": 112
      },
      {
        "label": "Excellent",
        "min": 113,
        "max": 140
      }
    ],
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  },
  {
    "key": "q-infographe",
    "categorie": "questionnaire",
    "titre": "Questionnaire d'évaluation",
    "poste": "Infographe / Chargé(e) de Communication Visuelle",
    "service": "Communication",
    "instructions": "Répondez clairement à chaque question en vous appuyant sur des exemples concrets. Durée indicative : 30 minutes.",
    "questions": [
      {
        "id": "q1",
        "num": 1,
        "texte": "Quels logiciels de création graphique maîtrisez-vous ? Pour chacun, précisez le niveau de maîtrise et le type de travaux que vous réalisez avec.",
        "bareme": 10
      },
      {
        "id": "q2",
        "num": 2,
        "texte": "Comment concevez-vous un visuel de communication pour le Centre Diagnostic ? Décrivez votre processus de création de l'idée jusqu'au rendu final.",
        "bareme": 10
      },
      {
        "id": "q3",
        "num": 3,
        "texte": "Qu'est-ce qu'une charte graphique et comment veillez-vous à la respecter dans tous vos créations ? Donnez des exemples concrets.",
        "bareme": 10
      },
      {
        "id": "q4",
        "num": 4,
        "texte": "Comment adaptez-vous un même visuel pour différents supports et formats (affiche A4, publication Instagram, story, bannière Facebook, écran d'affichage) ?",
        "bareme": 10
      },
      {
        "id": "q5",
        "num": 5,
        "texte": "Comment gérez-vous les écrans d'affichage dynamique au sein du Centre ? Quelle est votre méthode pour planifier les contenus et assurer leur mise à jour régulière ?",
        "bareme": 10
      },
      {
        "id": "q6",
        "num": 6,
        "texte": "Comment sélectionnez-vous un prestataire pour une impression (affiche, flyer, kakémono) ? Quels critères retenez-vous et comment négociez-vous les devis ?",
        "bareme": 10
      },
      {
        "id": "q7",
        "num": 7,
        "texte": "Vous devez créer un visuel pour annoncer une nouvelle spécialité médicale au CDL. Décrivez les étapes de votre travail, du brief à la livraison.",
        "bareme": 10
      },
      {
        "id": "q8",
        "num": 8,
        "texte": "Comment organisez-vous et archivez-vous vos fichiers de création graphique pour en faciliter l'accès et la réutilisation ultérieure ?",
        "bareme": 10
      },
      {
        "id": "q9",
        "num": 9,
        "texte": "Un responsable vous demande de modifier en urgence un visuel déjà imprimé et en cours de diffusion sur les réseaux sociaux. Comment réagissez-vous et gérez-vous cette situation ?",
        "bareme": 10
      },
      {
        "id": "q10",
        "num": 10,
        "texte": "Comment mesurez-vous l'impact d'un visuel publié sur les réseaux sociaux du Centre Diagnostic ? Quels indicateurs suivez-vous ?",
        "bareme": 10
      }
    ],
    "casPratique": {
      "situation": [
        "Nous sommes lundi matin. La Direction vous convoque pour vous confier les missions suivantes, toutes urgentes :",
        "Mission 1 — La Direction souhaite lancer une campagne de communication sur les réseaux sociaux pour promouvoir le nouveau service de Pédiatrie. Elle veut une publication pour ce soir et une story pour demain matin. Elle n'a pas de brief précis, seulement l'idée générale.",
        "Mission 2 — Les écrans du hall d'accueil affichent toujours les tarifs de 2025. La Direction demande une mise à jour urgente avec les nouveaux tarifs 2026 qu'elle vous transmet par message vocal.",
        "Mission 3 — Le prestataire habituel d'impression vient de vous informer qu'il ne peut pas honorer la commande de 500 flyers pour la journée portes ouvertes de vendredi. Il vous reste 3 jours.",
        "Mission 4 — Un médecin vous contacte directement pour vous demander de créer une affiche personnelle pour son cabinet privé, en utilisant le logo du Centre Diagnostic."
      ],
      "questions": [
        {
          "id": "cp1",
          "num": 1,
          "texte": "Comment organisez-vous votre journée pour gérer ces 4 missions en même temps ? Établissez votre ordre de priorité et justifiez vos choix."
        },
        {
          "id": "cp2",
          "num": 2,
          "texte": "Pour la campagne Pédiatrie (Mission 1), comment obtenez-vous les informations nécessaires auprès de la Direction avant de commencer ? Décrivez le brief que vous construisez."
        },
        {
          "id": "cp3",
          "num": 3,
          "texte": "Concernant la mise à jour des écrans (Mission 2), comment vous assurez-vous de l'exactitude des nouveaux tarifs avant de les afficher ? Quelle procédure de validation mettez-vous en place ?"
        },
        {
          "id": "cp4",
          "num": 4,
          "texte": "Pour les flyers de la portes ouvertes (Mission 3), quelle est votre démarche pour trouver un prestataire de remplacement en 3 jours ? Quels critères prioritaires retenez-vous ?"
        },
        {
          "id": "cp5",
          "num": 5,
          "texte": "Comment répondez-vous à la demande du médecin qui souhaite utiliser le logo du CDL pour son usage personnel (Mission 4) ? Justifiez votre réponse."
        }
      ],
      "bareme": 40
    },
    "scoreMax": 140,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 56
      },
      {
        "label": "Satisfaisant",
        "min": 57,
        "max": 84
      },
      {
        "label": "Bien",
        "min": 85,
        "max": 112
      },
      {
        "label": "Excellent",
        "min": 113,
        "max": 140
      }
    ],
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  },
  {
    "key": "q-technicien-imagerie",
    "categorie": "questionnaire",
    "titre": "Questionnaire d'évaluation",
    "poste": "Technicien(ne) en Imagerie Médicale",
    "service": "Imagerie Médicale",
    "instructions": "Répondez clairement à chaque question en vous appuyant sur des exemples concrets. Durée indicative : 30 minutes.",
    "questions": [
      {
        "id": "q1",
        "num": 1,
        "texte": "Quelles sont les incidences radiologiques standard que vous réalisez pour une radiographie du thorax, de l'abdomen et du genou ? Précisez le positionnement du patient pour chacune.",
        "bareme": 10
      },
      {
        "id": "q2",
        "num": 2,
        "texte": "Comment réglez-vous les paramètres techniques (kV, mAs, distance foyer-film) pour une radiographie du thorax chez un adulte ? Qu'est-ce qui vous amène à les modifier ?",
        "bareme": 10
      },
      {
        "id": "q3",
        "num": 3,
        "texte": "Avant de préparer un patient pour un scanner avec injection de produit de contraste, quelles informations devez-vous vérifier obligatoirement et pourquoi ?",
        "bareme": 10
      },
      {
        "id": "q4",
        "num": 4,
        "texte": "Quelles sont les contre-indications absolues à un examen IRM ? Comment les vérifiez-vous en pratique avant d'installer le patient ?",
        "bareme": 10
      },
      {
        "id": "q5",
        "num": 5,
        "texte": "Décrivez les étapes de nettoyage et de désinfection de votre sonde d'échographie après chaque utilisation. Quels produits utilisez-vous et pourquoi ?",
        "bareme": 10
      },
      {
        "id": "q6",
        "num": 6,
        "texte": "Qu'est-ce que le principe ALARA en radioprotection ? Comment l'appliquez-vous concrètement dans votre pratique quotidienne ?",
        "bareme": 10
      },
      {
        "id": "q7",
        "num": 7,
        "texte": "Comment identifiez-vous formellement un patient avant de réaliser un examen d'imagerie ? Que faites-vous si les informations du bon de demande ne correspondent pas au patient présent ?",
        "bareme": 10
      },
      {
        "id": "q8",
        "num": 8,
        "texte": "Un patient sous perfusion intraveineuse doit passer une radiographie. Comment procédez-vous pour l'installer et réaliser l'examen en toute sécurité ?",
        "bareme": 10
      },
      {
        "id": "q9",
        "num": 9,
        "texte": "Comment archivez-vous les clichés radiologiques dans le PACS ? Que faites-vous en cas de panne du système informatique d'imagerie ?",
        "bareme": 10
      },
      {
        "id": "q10",
        "num": 10,
        "texte": "Lors d'un examen, vous constatez une anomalie technique sur vos clichés (flou, sous-exposition, artefact). Quelle est votre démarche pour corriger et ne pas retarder la prise en charge du patient ?",
        "bareme": 10
      }
    ],
    "casPratique": {
      "situation": [
        "Il est 8h30. Vous venez de prendre votre poste au service Imagerie. Votre radiologue n'est pas encore arrivé. Vous avez les situations suivantes à gérer simultanément :",
        "Monsieur A, 65 ans, diabétique insuffisant rénal, se présente avec un bon de scanner abdomino-pelvien avec injection de produit de contraste. Il a pris sa metformine ce matin.",
        "Madame B arrive pour une IRM du genou. En remplissant le questionnaire, elle mentionne avoir un stérilet posé il y a 3 ans dont elle ne connaît pas la marque.",
        "Une infirmière vous apporte en urgence une radio thoracique pour un patient hospitalisé en soins intensifs qui ne peut pas se déplacer.",
        "Le PACS est en maintenance depuis 20 minutes et vous ne pouvez pas enregistrer les examens informatiquement."
      ],
      "questions": [
        {
          "id": "cp1",
          "num": 1,
          "texte": "Pour Monsieur A, l'examen peut-il être réalisé tel quel ? Justifiez et décrivez la démarche à suivre avant toute réalisation."
        },
        {
          "id": "cp2",
          "num": 2,
          "texte": "Comment gérez-vous la situation de Madame B concernant son stérilet ? Quelle est la procédure à respecter avant de l'installer dans l'IRM ?"
        },
        {
          "id": "cp3",
          "num": 3,
          "texte": "Comment organisez-vous la radiographie thoracique au lit du patient en soins intensifs ? Quelles précautions particulières prenez-vous ?"
        },
        {
          "id": "cp4",
          "num": 4,
          "texte": "Face à la panne du PACS, quelle solution de secours mettez-vous en place pour assurer la traçabilité et la continuité des examens ?"
        }
      ],
      "bareme": 40
    },
    "scoreMax": 140,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 56
      },
      {
        "label": "Satisfaisant",
        "min": 57,
        "max": 84
      },
      {
        "label": "Bien",
        "min": 85,
        "max": 112
      },
      {
        "label": "Excellent",
        "min": 113,
        "max": 140
      }
    ],
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  },
  {
    "key": "ent-agent-accueil",
    "categorie": "entretien",
    "titre": "Grille d'entretien",
    "poste": "Agent d'Accueil et de Facturation",
    "service": "Accueil et facturation",
    "instructions": "Les questions sont posées une à une à l'agent, dans l'ordre. Retranscrivez la réponse de l'agent sous chaque question.",
    "themes": [
      {
        "titre": "Accueil Physique Et Orientation Des Patients",
        "questions": [
          {
            "id": "q1",
            "num": 1,
            "texte": "Décrire l’accueil d’un patient se présentant pour la première fois, de son arrivée à son orientation vers le bon service.",
            "bareme": 10
          },
          {
            "id": "q2",
            "num": 2,
            "texte": "Comment adapter l’accueil face à un patient âgé, en situation de handicap, ou ne maîtrisant pas bien le français ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Qualité De Communication Et Gestion Des Conflits",
        "questions": [
          {
            "id": "q3",
            "num": 3,
            "texte": "Comment annoncer un délai d’attente important sans créer de tension ?",
            "bareme": 10
          },
          {
            "id": "q4",
            "num": 4,
            "texte": "Décrire une situation de gestion d’un patient en colère ou agressif verbalement.",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Facturation Et Maîtrise Des Assurances",
        "questions": [
          {
            "id": "q5",
            "num": 5,
            "texte": "Quelles étapes suivre pour vérifier qu’une prise en charge assurance est valide avant un acte médical ?",
            "bareme": 10
          },
          {
            "id": "q6",
            "num": 6,
            "texte": "Comment vérifier l’exactitude d’une facture avant encaissement ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Gestion Administrative Des Dossiers Patients",
        "questions": [
          {
            "id": "q7",
            "num": 7,
            "texte": "Quelles informations vérifier systématiquement lors de la création ou mise à jour d’un dossier patient ?",
            "bareme": 10
          },
          {
            "id": "q8",
            "num": 8,
            "texte": "Comment garantir la confidentialité et la conformité RGPD dans la gestion des dossiers ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Maîtrise Du Logiciel Métier (Santymed)",
        "questions": [
          {
            "id": "q9",
            "num": 9,
            "texte": "Quelles fonctionnalités de Santymed sont utilisées au quotidien ? Comment gérer un blocage ou bug en pleine activité ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Gestion Du Flux De Patients Et Des Priorités",
        "questions": [
          {
            "id": "q10",
            "num": 10,
            "texte": "Comment organiser sa journée lors d’une forte affluence avec plusieurs patients en attente simultanée ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Respect Des Procédures Internes",
        "questions": [
          {
            "id": "q11",
            "num": 11,
            "texte": "Citer une procédure interne (identitovigilance, encaissement, archivage…) appliquée systématiquement, et son importance.",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Compétences Comportementales (Ponctualité, Rigueur, Discrétion, Autonomie)",
        "questions": [
          {
            "id": "q12",
            "num": 12,
            "texte": "Donner un exemple récent d’initiative prise sans attendre d’instruction, et son résultat.",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Réactivité Face Aux Situations Urgentes",
        "questions": [
          {
            "id": "q13",
            "num": 13,
            "texte": "Quelle réaction si un patient présent des signes de malaise à l’accueil ?",
            "bareme": 10
          }
        ]
      },
      {
        "titre": "Capacité D’Adaptation Sous Pression",
        "questions": [
          {
            "id": "q14",
            "num": 14,
            "texte": "Décrire une journée particulièrement difficile vécue au poste, et ce qui a permis de tenir le rythme.",
            "bareme": 10
          }
        ]
      }
    ],
    "cas": [
      {
        "id": "cas1",
        "num": 1,
        "titre": "Patient mécontent après longue attente",
        "enonce": "Un patient attend depuis 45 minutes au-delà de l’heure de son rendez-vous. Il se présente à l’accueil, visiblement agacé, et hausse le ton en réclamant des explications. Comment gérez-vous cette situation, étape par étape ?",
        "bareme": 10
      },
      {
        "id": "cas2",
        "num": 2,
        "titre": "Erreur de facturation découverte après paiement",
        "enonce": "Une erreur de facturation est découverte après le départ du patient, entraînant un trop-perçu de 35 €. Quelles sont vos actions immédiates et dans les jours qui suivent ?",
        "bareme": 10
      },
      {
        "id": "cas3",
        "num": 3,
        "titre": "Refus de prise en charge par assurance",
        "enonce": "Au moment de l’encaissement, le système indique que l’assurance du patient refuse la prise en charge prévue. Le patient n’a pas les moyens de payer la totalité immédiatement. Comment gérez-vous l’échange et la suite administrative du dossier ?",
        "bareme": 10
      },
      {
        "id": "cas4",
        "num": 4,
        "titre": "Urgence médicale à l’accueil",
        "enonce": "Un patient présent en salle d’attente s’effondre soudainement. Quelle est votre réaction immédiate, dans l’ordre des priorités ?",
        "bareme": 10
      }
    ],
    "scoreMax": 180,
    "paliers": [
      {
        "label": "Insuffisant",
        "min": 0,
        "max": 72
      },
      {
        "label": "Satisfaisant",
        "min": 73,
        "max": 108
      },
      {
        "label": "Bien",
        "min": 109,
        "max": 144
      },
      {
        "label": "Excellent",
        "min": 145,
        "max": 180
      }
    ],
    "notationOptionnelle": true,
    "signatures": [
      "L'Agent Évalué(e)",
      "L'Évaluateur / Évaluatrice"
    ]
  }
];

export const getTemplate = (key) => TEMPLATES.find((t) => t.key === key);

export const templatesByCategorie = () =>
  Object.keys(CATEGORIES).map((c) => ({
    categorie: c,
    ...CATEGORIES[c],
    templates: TEMPLATES.filter((t) => t.categorie === c),
  }));
