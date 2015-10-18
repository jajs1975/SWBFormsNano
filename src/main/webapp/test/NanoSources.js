/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
eng.dataSources["Gene"] = {
    scls: "Gene",/*Equivale al nombre de la tabla*/
    modelid: "NanoPharmacy",/*Es equivalente al nombre de la BD*/
    dataStore: "mongodb",    
    displayField: "symbol",
    fields: [
        {name: "symbol", title: "Simbolo Oficial", required: true, type: "string"},
        {name: "officialName", title: "Nombre oficial", type: "string"},
        {name: "mimId", title: "Número identificador", type: "int"},
        {name: "organism", title: "Organismo", type: "string"},
        {name: "aliases", title: "Nombres alternos", type: "string" },
        {name: "mapLocation", title: "Localización", type: "string"},
        {name: "summary", title: "Resumen", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["AlterationMolecular"] = {
    scls: "AlterationMolecular",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "name",
    fields: [
        {name: "name", title: "Nombre de la alteración molecular", type: "string"},
        {name: "aliases", title: "Nombres alternos", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["CancerType"] = {
    scls: "CancerType",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "name",
    fields: [
        {name: "name", title: "Nombre del tipo de cáncer", type: "string"},
        {name: "summary", title: "Definición del cáncer", type: "string"},
        {name: "conceptId", title: "Id", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["Article"] = {
    scls: "Article",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "title",
    fields: [
        {name: "title", title: "Título del artículo", type: "string"},
        {name: "abstract", title: "Resumen del artículo", type: "string"},
        {name: "link", title: "Liga", type: "string"},
        {name: "reference", title: "Referencia", type: "string"},
        {name: "pmid", title: "Id PubMed", type: "int"},
        {name: "pmcid", title: "Id PMC", type: "int"},
        {name: "autor", title: "Autores", type: "string"},
        {name: "prognosis", title: "Pronóstico", type: "int"},
        {name: "prediction", title: "Predicción", type: "int"},
        {name: "treatment", title: "Tratamiento", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["Search"] = {
    scls: "Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "gene",
    fields: [
        {name: "gene", title: "Gen", stype: "select", dataSource:"Gene"},
        {name: "altMolecular", title: "Alteración Molecular", stype: "select", dataSource:"AlterationMolecular"},
        {name: "artYearsOld", title: "Longevidad de pulicaciones", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "notificaction", title: "Número de notificaciones", type: "int"}
    ]
};

eng.dataSources["Art_Search"] = {
    scls: "Art_Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "search",
    fields: [
        {name: "search", title: "Búsqueda", stype: "select", dataSource:"Search"},
        {name: "article", title: "Artículo", stype: "select", dataSource:"Article"},
        {name: "ranking", title: "Clasificación", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "status", title: "Estatus", type: "int"}/*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado*/
    ]
};