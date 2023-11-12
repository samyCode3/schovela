enum FieldOfStudy {
    Agriculture = "Agriculture",
    Arts = "Arts",
    ArabicAndIslamicStudies = "Arabic and Islamic Studies",
    EducationAndExtensionServices = "Education and Extension Services",
    EngineeringAndEnvironmentalDesign = "Engineering and Environmental Design",
    Law = "Law",
    LifeScience = "Life Science",
    SocialScience = "Social Science",
    PhysicalAndComputingScience = "Physical and Computing Science",
    VeterinaryMedicine = "Veterinary Medicine",
    ManagementScience = "Management Science",
    ChemicalAndLifeScience = "Chemical and Life Science"
}

interface FieldOptions {
    [FieldOfStudy.Agriculture]: string[];
    [FieldOfStudy.Arts]: string[];
    [FieldOfStudy.ArabicAndIslamicStudies]: string[];
    [FieldOfStudy.EducationAndExtensionServices]: string[];
    [FieldOfStudy.EngineeringAndEnvironmentalDesign]: string[];
    [FieldOfStudy.Law]: string[];
    [FieldOfStudy.LifeScience]: string[];
    [FieldOfStudy.LifeScience]: string[];
    [FieldOfStudy.PhysicalAndComputingScience]: string[];
    [FieldOfStudy.VeterinaryMedicine]: string[];
    [FieldOfStudy.ManagementScience]: string[];
    [FieldOfStudy.ChemicalAndLifeScience]: string[];
}

const fieldsOfStudy: FieldOptions = {
    [FieldOfStudy.Agriculture]: [
        "Agricultural Economics",
        "Agricultural Extension & Rural Development",
        "Animal Science",
        "Crop Science",
        "Fisheries and Aquaculture",
        "Forestry and Environment",
        "Soil Science and Agricultural Engineering"
    ],
    [FieldOfStudy.Arts]: [
        "English and Literary Studies",
        "French",
        "History and International Studies", 
        "Linguistics",
        "Mass Communication",
        "Nigerian Languages"
    ],
    [FieldOfStudy.ArabicAndIslamicStudies]: [
        "Arabic",
      "Arabic Literary Studies",
      "Islamic Studies",
      "Quran and Hadith Studies"
    ],
    [FieldOfStudy.EducationAndExtensionServices] : [
        "Adult Education and Extension Services",
        "Curriculum Studies & Educational Tech.",
        "Educational Foundations",
        "Library and Information Science",
        "Science and Vocational Education"
    ],
    [FieldOfStudy.EngineeringAndEnvironmentalDesign] : [
        "Civil Engineering",
        "Electrical/Electronics",
        "Environmental and Resources Management",
        "Information and Computer Technology (ICT)",
        "Mechanical Engineering"
    ],
    [FieldOfStudy.Law] : [
        "Islamic Law"
    ],
    [FieldOfStudy.LifeScience]: [
    
    ],
    [FieldOfStudy.PhysicalAndComputingScience]: [
        "Computer Science",
        "Geology",
        "Mathematics",
        "Physics",
        "Statistics",
        "Cybersecurity"
    ],
    [FieldOfStudy.VeterinaryMedicine]: [
        "Vet Medicine"
    ],
    [FieldOfStudy.ManagementScience] : [
        "Accounting",
        "Business Administration",
        "Public Administration"
    ],
    [FieldOfStudy.ChemicalAndLifeScience]: [
        "Biochemistry and Molecular Biology",
        "Biology",
        "Applied Chemistry",
        "Microbiology",
        "Plant Science",
        "Pure and Environmental Chemistry",
        "Zoology"
    ]

};

export { FieldOfStudy, FieldOptions, fieldsOfStudy };