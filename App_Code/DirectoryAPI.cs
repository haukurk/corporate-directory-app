using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Microsoft.Exchange.WebServices.Data;
using WebLibrary.CorporateDirectory.DataTransferObjects;
using WebLibrary.CorporateDirectory.ServiceLayer.DictionaryService;
using WebLibrary.CorporateDirectory.ServiceLayer;

/// <summary>
/// Summary description for DirectoryService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class DirectoryAPI : System.Web.Services.WebService
{

    // private member variables.
    private IDictionaryService _dictionaryService;

    public DirectoryAPI()
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Autocomplete> AutocompleteHelp(String query = "*")
    {
        // Build Autocomplete from Company, Countries and Office.
        var autoCompleteHelp = _dictionaryService.GetAllCompanies().Select(c => new Autocomplete("Company",c)).ToList();
        autoCompleteHelp.AddRange(_dictionaryService.GetAllContries().Select(c => new Autocomplete("Country", c)).ToList());
        autoCompleteHelp.AddRange(_dictionaryService.GetAllOffices().Select(c => new Autocomplete("Office", c)).ToList());

        // Add Name, Departments and phone number to the list.
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Name", x.FULLNAME)));
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Department", x.DEPARTMENT)));
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Department", x.DEPARTMENT_EN)));
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Mobile", x.MOBILEPHONE)));
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Phone", x.WORKPHONE)));
        autoCompleteHelp.AddRange(_dictionaryService.GetAllEmployees(false).Distinct().Select(x => new Autocomplete("Phone", x.INTERNALPHONE)));

        return query != "*" ? (from o in autoCompleteHelp where o.Value.Contains(query) select o).ToList() : autoCompleteHelp.GroupBy(x => x.Value).Select(g => g.First()).ToList();
    }

    /// <summary>
    /// Get A
    /// </summary>
    /// <param name="reduceForExternalAccess"> </param>
    /// <returns>Generic list of PhoneBookEntry objects</returns>
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<PhoneBookEntry> GetAllEmployees()
    {
        var reduceForExternalAccess = true;  // TODO: Check Source IP.
        if(reduceForExternalAccess)
            return Reduce.ReducePhoneEntries(_dictionaryService.GetAllEmployees(false));
        return _dictionaryService.GetAllEmployees(false);
    }


    /// <summary>
    /// Search method for corporate directory database.
    /// </summary>
    /// <param name="name">Name</param>
    /// <param name="country">Country</param>
    /// <param name="company">Company</param>
    /// <param name="office">Office</param>
    /// <param name="email">Email address</param>
    /// <param name="department">Department name</param>
    /// <param name="internalNumber">Internal phone number</param>
    /// <param name="mobileNumber">Mobile phone number</param>
    /// <param name="pageNum">Page number for paginator</param>
    /// <returns>Generic list of PhoneBookEntry objects</returns>
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<PhoneBookEntry> Search(String name, String country,
        String company, String office, String email, String department, String internalNumber, String mobileNumber = "", int pageNum = 0)
    {
        // Go through all the incoming parameters. If they are empty, we pass empty string to lower levels.

        if (String.IsNullOrEmpty(name))
            name = "";

        if (String.IsNullOrEmpty(country))
            country = "";

        if (String.IsNullOrEmpty(company))
            company = "";

        if (String.IsNullOrEmpty(office))
            office = "";

        if (String.IsNullOrEmpty(email))
            email = "";

        if (String.IsNullOrEmpty(department))
            department = "";

        if (String.IsNullOrEmpty(internalNumber))
            internalNumber = "";

        if (String.IsNullOrEmpty(mobileNumber))
            mobileNumber = "";

        var result = _dictionaryService.SearchInternal(name, country, company, office, email, department, internalNumber, mobileNumber, pageNum);

        return result;
    }

    /// <summary>
    /// Get distinct list of countries from the database.
    /// </summary>
    /// <param name="company">Filter by company name</param>
    /// <param name="office">Filter by office name</param>
    /// <returns>List of strings</returns>
    [WebMethod]
    public List<String> GetCountries(String company, String office)
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetContries(company, office);
    }

    /// <summary>
    /// Get distinct list of companies from the database.
    /// </summary>
    /// <param name="country">Filter by country name</param>
    /// <param name="office">Filter by office name</param>
    /// <returns>List of strings</returns>
    [WebMethod]
    public List<String> GetCompanies(String country, String office)
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetCompanies(country, office);
    }

    /// <summary>
    /// Get distinct list of offices from the database
    /// </summary>
    /// <param name="country">Filter by country</param>
    /// <param name="company">Filter by company</param>
    /// <returns></returns>
    [WebMethod]
    public List<String> GetOffices(String country, String company)
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetOffices(country, company);
    }

    /// <summary>
    /// Get list of all countries
    /// </summary>
    /// <returns></returns>
    [WebMethod]
    public List<String> GetAllCountries()
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetAllContries();
    }

    /// <summary>
    /// Get list of all companies
    /// </summary>
    /// <returns></returns>
    [WebMethod]
    public List<String> GetAllCompanies()
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetAllCompanies();
    }

    /// <summary>
    /// Get list of all officess
    /// </summary>
    /// <returns></returns>
    [WebMethod]
    public List<String> GetAllOffices()
    {
        _dictionaryService = ServiceFactory.getDictionaryService();
        return _dictionaryService.GetAllOffices();
    }


    /// <summary>
    /// Get list of availability for an employee
    /// </summary>
    /// <param name="email">Email address that identifies the employee</param>
    /// <returns></returns>
    [WebMethod]
    public List<CalendarEvent> GetAvailability(string email)
    {

        var service = new ExchangeService(ExchangeVersion.Exchange2010_SP2) { Credentials = new WebCredentials("haukur.kristinsson@samskip.com", "12Bassi34l33tl33t") };

        service.Url = new Uri("https://outlook.office365.com/ews/exchange.asmx");

        var attendees = new List<AttendeeInfo>();
        attendees.Add(new AttendeeInfo(email));

        var results =
            service.GetUserAvailability(attendees,
                new TimeWindow(DateTime.Now, DateTime.Now.AddHours(82)),
                AvailabilityData.FreeBusy);

        var myAvailablity =
            results.AttendeesAvailability.FirstOrDefault();

        var calendarEvents = new List<CalendarEvent>();

        foreach (var attendeeAvailability in results.AttendeesAvailability.ToList())
        {
            if(attendeeAvailability.ErrorCode == ServiceError.NoError)
            {
                foreach (var evnt in attendeeAvailability.CalendarEvents)
                {
                    var tmp = new CalendarEventTest();
                    tmp.FreeBusyStatus = evnt.FreeBusyStatus;
                    tmp.StartTime = evnt.StartTime;
                    tmp.EndTime = evnt.EndTime;
                    tmp.Details = evnt.Details;
                    calendarEvents.Add(evnt);
                }
            }
            else
            {
                throw new Exception("Error querying events for attendee.");
            }
        }

        return calendarEvents;

        if (myAvailablity != null)
        {
            Console.WriteLine(String.Format(
                "You have {0} appointments/meetings in the next 12 hours",
                myAvailablity.CalendarEvents.Count));
        }

        return null;

    }

}
