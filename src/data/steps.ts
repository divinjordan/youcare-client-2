import {
  Calendar,
  FormFill,
  Search,
  SecurePayment,
  Users,
} from "../components/ui/icons";
export const steps = [
  {
    title: "Votre demande",
    icon: FormFill,
    description:
      "Vous faites une demande sur notre site, Une fois que votre demande est reçue, nous l'analysons pour bien comprendre. Ensuite un de nos professionnel vous contactera pour en discuter et mieux comprendre votre besoin. Vous pouvez vous connecter à votre espace pour apporter des modifications à votre demande.",
  },
  {
    title: "Rechercher de l'aidant",
    icon: Search,
    description:
      "Après la prise de contact, une fois que vos besoins sont clarifiés et que les termes de l’accompagnement sont définis, nous démarrons la recherche du profil le plus adapté à votre besoin. ",
  },
  {
    title: "Engagement",
    icon: SecurePayment,
    description:
      "Une fois le profil sélectionné, des engagements sont signés et vous effectuez le versement ( ou le virement ). Après cela vous entrerez en contact avec l’aidant.",
  },
  {
    title: "Debut de l'accompagnement: première rencontre",
    icon: Users,
    description:
      "Cette première rencontre se déroule toujours au domicile de l'accompagné et avec la présence du proche aidant. C’est l'occasion pour vous de vous familiariser avec le jeune assistant, de l’expliquer le fonctionnement de la maison ainsi que vos routines journalières. c’est surtout l’occasion d'établir un premier contact social entre les deux parties, chose des plus importantes.",
  },
  {
    title: "Fin de l'accompagnement",
    icon: Calendar,
    description:
      "A la fin du moins entre le 27 et 30 du moins, vous vous connectez à votre espace membre pour consulter les horaires questions de s'assurer que tout est bien en réglé. Vous pouvez aussi faire un compte rendu sur l'accompagnement, cela nous permet d'ameliorer nos services.",
  },
];
