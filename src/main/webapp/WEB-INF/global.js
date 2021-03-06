//******* DataStores ***************

eng.config={
    baseDatasource:"/WEB-INF/global.js"
};

//******* DataStores ***************
eng.dataStores["mongodb"]={
    host:"localhost",
    port:27017,
    class: "org.semanticwb.datamanager.datastore.DataStoreMongo",
};

//******* DataSorices ************
eng.dataSources["User"]={
    scls: "User",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",   
    fields:[
        {name:"fullname",title:"Nombre",type:"string"},
        //{name:"username",title:"Usuario",type:"string"},
        {name:"password",title:"Contraseña",type:"password"},
        {name:"email",title:"Correo electrónico",type:"string"},
        {name: "role", title: "Rol", stype: "select", dataSource:"Role"}
    ],
};

/******* DataProcessors ************/
eng.dataProcessors["UserProcessor"]={
    dataSources: ["User"],
    actions:["fetch","add","update"],
    request: function(request, dataSource, action)
    {
        if(request.data.password)
        {
            request.data.password=this.encodeSHA(request.data.password);
        }
        return request;
    }          
};

eng.routes["global"]={
    loginFallback: "login",
    routeList:[
        { routePath: "login", forwardTo: "/login.jsp", isRestricted: "false", zindex:1 },
        { routePath: "admin", forwardTo:"/admin.jsp", isRestricted:"true", hasRole:"admin"},
        /*{ routePath: "register", forwardTo: "/work/config/register.jsp", isRestricted: "false" },*/
        { routePath: "work", isRestricted: "true"},
        { routePath: "work/*", jspMapTo: "/work/jsp/", isRestricted: "true" },
        { routePath: "public/libs/*", jspMapTo: "/public/libs/", isRestricted: "false" },
        { routePath: "/swbforms/js/*", jspMapTo: "/swbforms/js/", isRestricted: "false" },
        { routePath: "public/*", jspMapTo: "/public/", isRestricted: "true" },
        { routePath: "ds", forwardTo: "/swbforms/jsp/datasource.jsp", isRestricted: "true" },
        { routePath: "dslogin", forwardTo: "/swbforms/jsp/dataSourceLogin.jsp", isRestricted: "false" },
        { routePath:"nanoDs/*", jspMapTo:"/nanoPharmacia/jsp/", isRestricted:"false"},
        { routePath: "search/*", forwardTo: "/index.jsp", isRestricted: "true"},
        { routePath: "search/results/*", forwardTo: "/index.jsp", isRestricted: "true"},
        { routePath: "search/report/*", forwardTo: "/index.jsp", isRestricted: "true"},
        { routePath: "config", forwardTo: "/index.jsp", isRestricted: "true"},
        { routePath: "config-time", forwardTo: "/index.jsp", isRestricted: "true"},
        { routePath: "", forwardTo: "/index.jsp", isRestricted: "true"}
    ],
};

