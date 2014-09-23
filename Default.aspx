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
    
    <form role="form" id="mainFrm" runat="server" onsubmit="return false">
        
    <div class="container" ng-controller="MainCtrl">
    <div class="row">
        <div class="col-md-11">
         <h3 data-i18n="_ContainerTitle_">Leit í fyrirtækisskrá</h3>
        </div>
        <div class="col-md-1">
            <a href="#" ng-click="toggleLanguage()"><i class="fa fa-language"></i> <small data-i18n="_SwitchLang_">Switch to english</small></a>
         </div>
    </div>
     <div class="row">
         <div class="col-md-12 form-group">
             <div class="input-group">
                 <input ng-model="searchEmp" type="text" class="form-control" 
                     placeholder="{{'_SearchPlaceHolder_' | i18n}}" 
                     ng-keyup="searchDirectory(1500)" ng-model-options="{debounce: 1500}" />
                 <span class="input-group-btn">
                     <button type="button" class="btn btn-default" ng-click="searchEmp = ''"><i class="fa fa-times"></i></button>
                     <button type="button" 
                         class="btn btn-default dropdown-toggle"
                         data-toggle="dropdown">
                         <i class="fa fa-filter"></i>
                         <strong>{{'_Filter_' | i18n}}</strong>
                         <span class="caret"></span>
                     </button>

                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownCountry">
                            <li ng-repeat="item in CountryItems">
                                <a>{{item.value}}</a>
                            </li>
                        </ul>


                 </span>
             </div>
         </div>
     </div>
        
        <div class="row fadein fadeout hidden-xs" ng-show="ShowAutocomplete">
            
            <div class="btn-group">
                
                <button class="btn btn-default btn-breadcrumb disabled">
                    <i class="ion-help-circled icon-blue"></i>
                </button>
                
                <button ng-repeat="item in HelpListFiltered | limitTo:8" 
                    type="button" 
                    ng-click="changeSearchModel(item.value)" 
                    tooltip-placement="bottom" 
                    class="btn btn-default"
                    tooltip="{{'_AreYouLookingForString_'|i18n}} {{item.type | lowercase}} {{item.value}}">
                    {{item.value | limitTo : 20}} 
               </button>

            </div>
        </div>
        
        <div class="row">
            
        </div>

      <div id="FilterBox" class="row" ng-show="filterShow == true">
            <div class="form-group">
                <p ng-show="filterShow == true">{{'_FilterPreText_' | i18n}}</p>
            <div class="col-md-4">
                <strong>{{'_CountryLowerCaseDative_' | i18n}}</strong>
                <select id="SelectCountry" ng-model="CountryFilter" ng-init="CountryFilter=CountryItems[0].value" style="font-family:'FontAwesome', Arial;"
                    ng-options="item.value as item.name for item in CountryItems" 
                    ng-change="updateSearchData()"
                    class="span4 form-control" tabindex="1">
                    <option value="*">Land (Öll lönd)</option>
                </select>
            </div>
            <div class="col-md-4">
                <strong>{{'_CompanyLowerCaseDative_' | i18n}}</strong>
                <select id="SelectCompany" ng-model="CompanyFilter" ng-init="CompanyFilter=CompanyItems[0].value"
                    ng-options="item.value as item.name for item in CompanyItems" 
                    ng-change="updateSearchData()"
                    class="span4 form-control">
                    <option value="*">Fyrirtæki (Öll fyrirtæki)</option>
                </select>
            </div>
            <div class="col-md-4">
                <strong>{{'_OfficeLowerCaseDative_' | i18n}}</strong>
                <select id="SelectOffice" ng-model="OfficeFilter" 
                    ng-options="item.value as item.name for item in OfficeItems" 
                    ng-change="updateSearchData()"
                    class="span4 form-control" tabindex="1" ng-init="OfficeFilter=OfficeItems[0].value">
                    <option value="*">Skrifstofa (Allar skrifstofur)</option>
                </select>
            </div>
            </div>
        </div>

        <div class="row fadein fadeout" id="Results" ng-show="ResultVisible">
                    
            <div id="users-management" class="col-md-12">

                <div class="panel-group" id="accordion{{$index}}" ng-repeat="employee in FilteredSearchData | startFrom:(currentPage-1)*numPerPage | limitTo:numPerPage">
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            <h4 class="panel-title">
                              <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion{{$index}}"
                                href="#collapse-{{$index}}">
                                  <img src="http://emplservice.samskip.com/EmployeeImage.aspx?p={{employee.EMPLOYEENUMBER}}&gs=1" style="overflow-x: hidden; height: 35px;" class="img-rounded img-responsive pull-left">
                              <p>{{employee.FULLNAME}} <small>{{employee.WORKPHONE}}</small></p>
                              </a>
   
                            </h4>
                          </div>
                          <div id="collapse-{{$index}}"  class="panel-collapse collapse">
                            <div class="panel-body">

                                <div class="col-sm-12">
                                <div class="col-xs-12 col-sm-8">
                                    <h2>{{employee.FULLNAME}}</h2> 
                                    <p><strong>{{'_EmployeeCardTitle_'|i18n}}: </strong> {{employee.JOBTITLE_EN}} ({{employee.JOBTITLE}})</p>
                                    <p><strong>{{'_EmployeeCardCompany_'|i18n}}: </strong> {{employee.COMPANY}}</p>
                                    <p><strong>{{'_EmployeeCardEmail_'|i18n}}: </strong> {{employee.EMAIL}}</p>
                                    <p><strong>{{'_EmployeeCardDepartment_'|i18n}}: </strong> {{employee.DEPARTMENT_EN}} ({{employee.DEPARTMENT}}) </p>
                                    <p><strong>{{'_EmployeeCardDivision_'|i18n}}: </strong> {{employee.DIVISION_EN}} ({{employee.DIVISION}}) </p>
                                    <p><strong>{{'_EmployeeCardInternalPhone_'|i18n}}: </strong> ({{employee.INTERNAL_PREFIX}}) {{employee.INTERNALPHONE}} </p>
                                    <p><strong>{{'_EmployeeCardWorkPhone_'|i18n}}: </strong> {{employee.WORKPHONE}} </p>
                                    <p><strong>{{'_EmployeeCardMobilePhone_'|i18n}}: </strong> {{employee.MOBILE}} </p>
                                    <p><strong>{{'_EmployeeCardEmployeeNumber_'|i18n}}: </strong> {{employee.EMPLOYEENUMBER}} </p>
                                    <p><strong>{{'_EmployeeCardCountry_'|i18n}}: </strong> {{employee.COUNTRY}} </p>   
                                    <p><strong>{{'_EmployeeCardOffice_'|i18n}}: </strong> {{employee.OFFICE}} </p>                                 
                                    <p><strong>{{'_EmployeeCardSchedule_'|i18n}}: </strong> {{'_EmployeeCardScheduleUnknown_'|i18n}} </p>
                                </div>             
                                <div class="col-xs-12 col-sm-4 text-center">
                                    <figure>
                                        <img src="http://emplservice.samskip.com/EmployeeImage.aspx?p={{employee.EMPLOYEENUMBER}}&gs=1" style="width: 150px;" class="pull-right img-thumbnail img-responsive">
                                    </figure>
                                </div>
                            </div>            

                            </div>
                            <div class="panel-footer">
                              <div class="btn-group btn-group-xs"><span class="btn">Send Email</span></div>
                            </div>
                          </div>
                        </div>
                      </div>

            </div>

            <div class="text-center">
                <pagination 
                    total-items="getFilteredDataLength()" 
                    ng-model="currentPage" 
                    max-size="maxSize" 
                    class="pagination-sm" 
                    boundary-links="true" 
                    rotate="false">
                </pagination>
            </div>
        </div>
       

    </div>

    </form>
    
     <!-- Core JavaScripts
    ================================================== -->
	<script src="corpdirapplication/dist/js/vendor.js" type="text/javascript" ></script>
    <script src="corpdirapplication/dist/js/app.js" type="text/javascript" ></script>

</body>

</html>
