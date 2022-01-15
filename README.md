# Passwords

## API Documentation

> password generator and strength checker


![f03c15](https://img.shields.io/badge/Code-JQuery-informational?style=flat&logo=jquery&color=61DAFB)
![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=JavaScript&color=F7DF1E)
![](https://img.shields.io/badge/Code-HTML5-informational?style=flat&logo=HTML5&color=E34F26)
![](https://img.shields.io/badge/Style-CSS3-informational?style=flat&logo=CSS3&color=1572B6)
<br>
![](https://img.shields.io/badge/code-Node.js-informational?style=flat&logo=node.js&color=016013)
![](https://img.shields.io/badge/framework-Express-informational?style=flat&logo=express&color=016013)
![](https://img.shields.io/badge/code-NPM-informational?style=flat&logo=npm&color=820000)
<br>
![](https://img.shields.io/badge/Tools-Git-informational?style=flat&logo=Git&color=F05032)
![](https://img.shields.io/badge/Tools-GitHub-informational?style=flat&logo=GitHub&color=181717)
![](https://img.shields.io/badge/Tools-GitLab-informational?style=flat&logo=GitLab&color=181717)

## password generator APi

- Link " URL: 'http://localhost:3000/api/generator/{length}/{options}' "

  > > - Length:  must be numeric, and it indicates the length of the password (min: 8, max: 40).
  >>- Options: must be a string (which contains at least one of the letters indicated below), the order does not matter .
  >- L => Lowercase. "abcdefghijklmnopqrstuvwxyzäöü"
  >- U => Uppercase. "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ"
  >- N => Numbers. "0123456789"
  >- S => Symbols. "$%^&(){}[]=+-/_.,;><?!'\"@ß"

- RETURN: an array and the 1st value is a string and that is the generated password and the 2nd value is a number that
  tells us the strength of the generated password.
  > - string: the generated password.
  >- number: 1 => Very Weak, 2 => Weak, 3 => Medium, 4 => Strong, 5 => Very Strong.

## password checker APi

- Link "URL: 'http://localhost:3000/api/checker/{password}' "
  > - Password: string whatever you want

- RETURN: a number that tells us the strength of the generated password.
  > - number: 1 => Very Weak, 2 => Weak, 3 => Medium, 4 => Strong, 5 => Very Strong.