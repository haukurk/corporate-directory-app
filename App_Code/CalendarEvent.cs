using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Exchange.WebServices.Data;

/// <summary>
/// Summary description for Availability
/// </summary>
public class CalendarEventTest
{
    public CalendarEventTest()
	{
        
	}

    public LegacyFreeBusyStatus FreeBusyStatus { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public CalendarEventDetails Details { get; set; }

}