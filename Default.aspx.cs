using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebLibrary.CorporateDirectory.ServiceLayer;
using WebLibrary.CorporateDirectory.ServiceLayer.DictionaryService;

public partial class _Default : System.Web.UI.Page
{
    // Private Members
    private bool _intraDirectory = false;  // Should we limit the directory functionality for external access?
    // private member variables.
    private IDictionaryService _dictionaryService;

    protected void Page_Load(object sender, EventArgs e)
    {
        //_dictionaryService = _dictionaryService = ServiceFactory.getDictionaryService();

        //foreach (var c in _dictionaryService.GetAllCompanies())
        //    SelectCompany.Items.Add(c);

        //foreach (var c in _dictionaryService.GetAllContries())
        //    SelectCountry.Items.Add(c);

        //foreach (var c in _dictionaryService.GetAllOffices())
        //    SelectOffice.Items.Add(c);
    }
}