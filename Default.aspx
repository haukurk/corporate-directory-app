<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
    
<head runat="server">
    
    <title data-i18n="_HomeTitle_">Samskip Corporate Directory</title>
        
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1"/>
    <meta name="description" content="Samskip - Corporate Directory"/>
    <meta name="author" content="Haukur Kristinsson"/>
    <link rel="shortcut icon" href="corpdirapplication/ico/favicon.ico"/>
    
    <!-- Vendor CSS -->
    <link href="corpdirapplication/css/vendor.css" rel="stylesheet"/>

    <!-- Custom styles for this template -->
    <link href="corpdirapplication/css/general.css" rel="stylesheet"/>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="corpdirapplication/dist/js/html5shiv.min.js"></script>
      <script src="corpdirapplication/dist/js/respond.min.js"></script>
    <![endif]-->

    <!-- Security stuff -->
    <!-- <meta name="csrf-token" content="{ csrf_token() }"> -->

</head>

<body ng-cloak ng-app="corpdir">
    
    <form role="form" id="mainFrm" runat="server">
        
    <div class="container" ng-controller="MainCtrl">
            
         <h3 data-i18n="_ContainerTitle_" class="pull-left">Leit í fyrirtækisskrá</h3>
         <span class="pull-right">
            <a href="#" ng-click="toggleLanguage()"><i class="fa fa-language"></i> <small data-i18n="_SwitchLang_">Switch to english</small></a>
         </span>

     <div class="row">
         <div class="col-md-12 form-group">
             <input ng-model="searchEmp" type="text" class="form-control span12" 
                 placeholder="{{'_SearchPlaceHolder_' | i18n}}" 
                 typeahead="help for help in HelpList | filter:$viewValue | limitTo:8"
                 typeahead-min-length="2"
                 typeahead-wait-ms="50"
                 ng-keyup="searchDirectory(500)" />
         </div>
     </div>
      <p><i class="fa fa-filter"></i><strong>{{'_Filter_' | i18n}}</strong>. {{'_FilterPreText_' | i18n}} <strong>{{'_CompanyLowerCaseDative_' | i18n}}</strong>, <strong>{{'_CountryLowerCaseDative_' | i18n}}</strong> {{ '_OrLowerCase_' | i18n }} <strong>{{'_OfficeLowerCaseDative_' | i18n}}</strong></p>
      <div class="row form-group">
        <div class="col-md-4">
            <select id="SelectCountry" ng-model="CountryFilter" 
                ng-options="item.value as item.name for item in CountryItems" 
                class="span4 form-control" tabindex="1" runat="server">
                <option value="*">Land (Öll lönd)</option>
            </select>
        </div>
        <div class="col-md-4">
            <select id="SelectCompany" ng-model="CompanyFilter" 
                ng-options="item.value as item.name for item in CompanyItems" 
                class="span4 form-control">
                <option value="*">Fyrirtæki (Öll fyrirtæki)</option>
            </select>
        </div>
        <div class="col-md-4">
            <select id="SelectOffice" ng-model="OfficeFilter" 
                ng-options="item.value as item.name for item in OfficeItems" 
                class="span4 form-control" tabindex="1" runat="server">
                <option value="*">Skrifstofa (Allar skrifstofur)</option>
            </select>
        </div>
      </div>
        

        <div class="row">
          
            <pre>
Model: {{CountryFilter}}
</pre>

        </div>
       

    </div>

    </form>
    
     <!-- Core JavaScripts
    ================================================== -->
	<script src="corpdirapplication/dist/js/vendor.js" type="text/javascript" ></script>
    <script src="corpdirapplication/dist/js/app.js" type="text/javascript" ></script>

</body>

</html>
