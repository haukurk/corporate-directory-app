# Corporate Directory
Corporate directory is a web application created in C#.

# Prerequisites

Some prerequisites should be considered before deploying thing application, this chapter include them.

## IIS configuration
Add JSON mimetype support to IIS (IIS Express) by adding the following lines to ```applicationhost.config```.
Under ```<dynamicTypes>```, add the line:
```
<add mimeType="application/json" />
```
Under ```<staticContent>```, add the line:
```
<mimeMap fileExtension=".json" mimeType="application/json" />
```