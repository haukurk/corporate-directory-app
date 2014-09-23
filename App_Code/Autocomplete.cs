using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Autocomplete
/// </summary>
public class Autocomplete
{
    public Autocomplete()
    {
        
    }

    public Autocomplete(string type,string value)
    {
        this.Type = type;
        this.Value = value;
    }

    public string Type { get; set; }
    public string Value { get; set; }

}