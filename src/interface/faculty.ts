enum FieldOfStudy {
    Agriculture = "AGRICULTURE",
    Arts = "ARTS",
    ArabicAndIslamicStudies = "ARABIC AND ISLAMIC STUDIES",
    EducationAndExtensionServices = "EDUCATION AND EXTENSION SERVICES",
    EngineeringAndEnvironmentalDesign = "ENGINEERING AND ENVIRONMENTAL DESIGN",
    Law = "LAW",
    LifeScience = "LIFE SCIENCE",
    SocialScience = "SOCIAL SCIENCE",
    PhysicalAndComputingScience = "PHYSICAL AND COMPUTING SCIENCE",
    VeterinaryMedicine = "VETERINARY MEDICINE",
    ManagementScience = "MANAGEMENT SCIENCE",
    ChemicalAndLifeScience = "CHEMICAL AND LIFE SCIENCE",
    ClinicalPharmacyAndPharmacyPractice = "CLINICAL PHARMACY AND PHARMACY PRACTICE",
    PharmaceuticalAndMedicinalChemistry = "PHARMACEUTICAL AND MEDICINAL CHEMISTRY",
    PharmaceuticsAndPharmaceuticalMicrobiology = "PHARMACEUTICS AND PHARMACEUTICAL MICROBIOLOGY",
    PharmacognosyAndEthnoPharmacy = "PHARMACOGNOSY AND ETHNO PHARMACY",
    PharmacologyAndToxicology = "PHARMACOLOGY AND TOXICOLOGY",
    MedicineAndSurgery = "MEDICINE AND SURGERY",
    CommunityHealth = "COMMUNITY HEALTH",
    NursingSciences = "NURSING SCIENCES",
    ObstetricsAndGynaecology = "OBSTETRICS AND GYNAECOLOGY",
    Paediatrics = "PAEDIATRICS",
    Psychiatry = "PSYCHIATRY",
    Radiology = "RADIOLOGY",
    Radiography = "RADIOGRAPHY",
    HumanNutritionAndDietetics = "HUMAN NUTRITION AND DIETETICS",
    Optometry = "OPTOMETRY",
    Physiotherapy = "PHYSIOTHERAPY",
    DentalScience = "DENTAL SCIENCE",
    OralAndMaxillofacialSurgery = "ORAL AND MAXILLOFACIAL SURGERY",
    OralAndMaxillofacialPathologySurgery = "ORAL AND MAXILLOFACIAL PATHOLOGY/SURGERY",
    ChildDentalHealth = "CHILD DENTAL HEALTH",
    PreventiveDentistry = "PREVENTIVE DENTISTRY",
    RestorativeDentistry = "RESTORATIVE DENTISTRY",
    Anatomy = "ANATOMY",
    MedicalBiochemistry = "MEDICAL BIOCHEMISTRY",
    Physiology = "PHYSIOLOGY",
    MedicalLaboratoryScience = "MEDICAL LABORATORY SCIENCE",
    ChemicalPathology = "CHEMICAL PATHOLOGY",
    Haematology = "HAEMATOLOGY",
    Histopathology = "HISTOPATHOLOGY",
    MedicalMicrobiologyImmunology = "MEDICAL MICROBIOLOGY IMMUNOLOGY",
    Gst = "GST",
  }
  
  interface FieldOptions {
    [FieldOfStudy.Agriculture]: string[];
    [FieldOfStudy.Arts]: string[];
    [FieldOfStudy.ArabicAndIslamicStudies]: string[];
    [FieldOfStudy.EducationAndExtensionServices]: string[];
    [FieldOfStudy.EngineeringAndEnvironmentalDesign]: string[];
    [FieldOfStudy.Law]: string[];
    [FieldOfStudy.LifeScience]: string[];
    [FieldOfStudy.SocialScience]: string[];
    [FieldOfStudy.PhysicalAndComputingScience]: string[];
    [FieldOfStudy.VeterinaryMedicine]: string[];
    [FieldOfStudy.ManagementScience]: string[];
    [FieldOfStudy.ChemicalAndLifeScience]: string[];
    [FieldOfStudy.ClinicalPharmacyAndPharmacyPractice]: string[];
    [FieldOfStudy.PharmaceuticalAndMedicinalChemistry]: string[];
    [FieldOfStudy.PharmaceuticsAndPharmaceuticalMicrobiology]: string[];
    [FieldOfStudy.PharmacognosyAndEthnoPharmacy]: string[];
    [FieldOfStudy.PharmacologyAndToxicology]: string[];
    [FieldOfStudy.MedicineAndSurgery]: string[];
    [FieldOfStudy.CommunityHealth]: string[];
    [FieldOfStudy.NursingSciences]: string[];
    [FieldOfStudy.ObstetricsAndGynaecology]: string[];
    [FieldOfStudy.Paediatrics]: string[];
    [FieldOfStudy.Psychiatry]: string[];
    [FieldOfStudy.Radiology]: string[];
    [FieldOfStudy.Radiography]: string[];
    [FieldOfStudy.HumanNutritionAndDietetics]: string[];
    [FieldOfStudy.Optometry]: string[];
    [FieldOfStudy.Physiotherapy]: string[];
    [FieldOfStudy.DentalScience]: string[];
    [FieldOfStudy.OralAndMaxillofacialSurgery]: string[];
    [FieldOfStudy.OralAndMaxillofacialPathologySurgery]: string[];
    [FieldOfStudy.ChildDentalHealth]: string[];
    [FieldOfStudy.PreventiveDentistry]: string[];
    [FieldOfStudy.RestorativeDentistry]: string[];
    [FieldOfStudy.Anatomy]: string[];
    [FieldOfStudy.MedicalBiochemistry]: string[];
    [FieldOfStudy.Physiology]: string[];
    [FieldOfStudy.MedicalLaboratoryScience]: string[];
    [FieldOfStudy.ChemicalPathology]: string[];
    [FieldOfStudy.Haematology]: string[];
    [FieldOfStudy.Histopathology]: string[];
    [FieldOfStudy.MedicalMicrobiologyImmunology]: string[];
    [FieldOfStudy.Gst]: any;
  }
  
  const fieldsOfStudy: FieldOptions = {
    [FieldOfStudy.Agriculture]: [
      "Agricultural Economics",
      "Agricultural Extension & Rural Development",
      "Animal Science",
      "Crop Science",
      "Fisheries and Aquaculture",
      "Forestry and Environment",
      "Soil Science and Agricultural Engineering",
    ],
    [FieldOfStudy.Arts]: [
      "English and Literary Studies",
      "French",
      "History and International Studies",
      "Linguistics",
      "Mass Communication",
      "Nigerian Languages",
    ],
    [FieldOfStudy.ArabicAndIslamicStudies]: [
      "Arabic",
      "Arabic Literary Studies",
      "Islamic Studies",
      "Quran and Hadith Studies",
    ],
    [FieldOfStudy.EducationAndExtensionServices]: [
      "Adult Education and Extension Services",
      "Curriculum Studies & Educational Tech.",
      "Educational Foundations",
      "Library and Information Science",
      "Science and Vocational Education",
    ],
    [FieldOfStudy.EngineeringAndEnvironmentalDesign]: [
      "Civil Engineering",
      "Electrical/Electronics",
      "Environmental and Resources Management",
      "Information and Computer Technology (ICT)",
      "Mechanical Engineering",
    ],
    [FieldOfStudy.Law]: ["Islamic Law"],
    [FieldOfStudy.LifeScience]: [],
    [FieldOfStudy.SocialScience]: [
      "Geography",
      "Economics",
      "Political Science",
      "Sociology",
    ],
    [FieldOfStudy.PhysicalAndComputingScience]: [
      "Computer Science",
      "Geology",
      "Mathematics",
      "Physics",
      "Statistics",
      "Cybersecurity",
    ],
    [FieldOfStudy.VeterinaryMedicine]: ["Vet Medicine"],
    [FieldOfStudy.ManagementScience]: [
      "Accounting",
      "Business Administration",
      "Public Administration",
    ],
    [FieldOfStudy.ChemicalAndLifeScience]: [
      "Biochemistry and Molecular Biology",
      "Biology",
      "Applied Chemistry",
      "Microbiology",
      "Plant Science",
      "Pure and Environmental Chemistry",
      "Zoology",
    ],
    [FieldOfStudy.ClinicalPharmacyAndPharmacyPractice]: [
        "Clinical Pharmacy",
        "Pharmacy Practice",
      ],
      [FieldOfStudy.PharmaceuticalAndMedicinalChemistry]: [
        "Pharmaceutical Chemistry",
        "Medicinal Chemistry",
      ],
      [FieldOfStudy.PharmaceuticsAndPharmaceuticalMicrobiology]: [
        "Pharmaceutics",
        "Pharmaceutical Microbiology",
      ],
      [FieldOfStudy.PharmacognosyAndEthnoPharmacy]: [
        "Pharmacognosy",
        "Ethno Pharmacy",
      ],
      [FieldOfStudy.PharmacologyAndToxicology]: [
        "Pharmacology",
        "Toxicology",
      ],
      [FieldOfStudy.MedicineAndSurgery]: [
        "Community Health",
        "Medicine",
        "Nursing Sciences",
        "Obstetrics and Gynaecology",
        "Paediatrics",
        "Psychiatry",
        "Radiology",
        "Radiography",
        "Surgery",
      ],
      [FieldOfStudy.CommunityHealth]: ["Community Health"],
      [FieldOfStudy.NursingSciences]: ["Nursing Sciences"],
      [FieldOfStudy.ObstetricsAndGynaecology]: ["Obstetrics and Gynaecology"],
      [FieldOfStudy.Paediatrics]: ["Paediatrics"],
      [FieldOfStudy.Psychiatry]: ["Psychiatry"],
      [FieldOfStudy.Radiology]: ["Radiology"],
      [FieldOfStudy.Radiography]: ["Radiography"],
      [FieldOfStudy.HumanNutritionAndDietetics]: ["Human Nutrition and Dietetics"],
      [FieldOfStudy.Optometry]: ["Optometry"],
      [FieldOfStudy.Physiotherapy]: ["Physiotherapy"],
      [FieldOfStudy.DentalScience]: ["Dentistry"],
      [FieldOfStudy.OralAndMaxillofacialSurgery]: ["Oral and Maxillofacial Surgery"],
      [FieldOfStudy.OralAndMaxillofacialPathologySurgery]: [
        "Oral and Maxillofacial Pathology/Surgery",
      ],
      [FieldOfStudy.ChildDentalHealth]: ["Child Dental Health"],
      [FieldOfStudy.PreventiveDentistry]: ["Preventive Dentistry"],
      [FieldOfStudy.RestorativeDentistry]: ["Restorative Dentistry"],
      [FieldOfStudy.Anatomy]: ["Anatomy"],
      [FieldOfStudy.MedicalBiochemistry]: ["Medical Biochemistry"],
      [FieldOfStudy.Physiology]: ["Physiology"],
      [FieldOfStudy.MedicalLaboratoryScience]: ["Medical Laboratory Science"],
      [FieldOfStudy.ChemicalPathology]: ["Chemical Pathology"],
      [FieldOfStudy.Haematology]: ["Haematology"],
      [FieldOfStudy.Histopathology]: ["Histopathology"],
      [FieldOfStudy.MedicalMicrobiologyImmunology]: [
        "Medical Microbiology",
        "Immunology",
      ],
       [FieldOfStudy.Gst]: [],
  };
  
  export { FieldOfStudy, FieldOptions, fieldsOfStudy };
  