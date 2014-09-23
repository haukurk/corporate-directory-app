using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebLibrary.CorporateDirectory.DataTransferObjects;

/// <summary>
/// Summary description for Reduce
/// </summary>
public static class Reduce
{
    public static List<PhoneBookEntry> ReducePhoneEntries(List<PhoneBookEntry> reduceObject)
    {
        var reducedPhoneEntries = new List<PhoneBookEntry>();

        foreach (var reducedPhoneEntry in reduceObject)
        {
            var tReduce = new PhoneBookEntry();
            tReduce.pID = -1;
            tReduce.FULLNAME = reducedPhoneEntry.FULLNAME;
            tReduce.UPDATED = reducedPhoneEntry.UPDATED;
            tReduce.EMPLOYEENUMBER = reducedPhoneEntry.EMPLOYEENUMBER;
            tReduce.INTERNALPHONE = reducedPhoneEntry.INTERNALPHONE;
            tReduce.INTERNAL_PREFIX = reducedPhoneEntry.INTERNAL_PREFIX;
            tReduce.MOBILEPHONE = reducedPhoneEntry.MOBILEPHONE;
            tReduce.SAPID = reducedPhoneEntry.SAPID;
            tReduce.JOBTITLE = reducedPhoneEntry.JOBTITLE;
            tReduce.JOBTITLE_EN = reducedPhoneEntry.JOBTITLE_EN;
            tReduce.WORKPHONE = reducedPhoneEntry.WORKPHONE;
            tReduce.EMAIL = reducedPhoneEntry.EMAIL;
            tReduce.DEPARTMENT = reducedPhoneEntry.DEPARTMENT;
            tReduce.DEPARTMENT_EN = reducedPhoneEntry.DEPARTMENT_EN;
            tReduce.DEPARTMENTNR = reducedPhoneEntry.DEPARTMENTNR;
            tReduce.COUNTRY = reducedPhoneEntry.COUNTRY;
            tReduce.OFFICE = reducedPhoneEntry.OFFICE;
            tReduce.PHOTOURL = reducedPhoneEntry.PHOTOURL;
            tReduce.COMPANY = reducedPhoneEntry.COMPANY;
            tReduce.DIVISIONNR = reducedPhoneEntry.DIVISIONNR;
            tReduce.DIVISION = reducedPhoneEntry.DIVISION;
            tReduce.DIVISION_EN = reducedPhoneEntry.DIVISION_EN;
            reducedPhoneEntries.Add(tReduce);
        }

        return reducedPhoneEntries;
    }
}