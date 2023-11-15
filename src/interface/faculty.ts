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
    Gst = "GST"
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
    [FieldOfStudy.Gst]: any
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
    [FieldOfStudy.SocialScience] :  [
        
            "Geography",
            "Economics",
            "Political Science",
            "Sociology"
          
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
    ],
    [FieldOfStudy.Gst] : [
        
    ]
 
};

export { FieldOfStudy, FieldOptions, fieldsOfStudy };